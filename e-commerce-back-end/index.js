require('dotenv').config();
const port = process.env.PORTNUMBER;
const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Db connection
mongoose.connect(process.env.MONGOOSE_URL);

// API creation
app.get("/", (req, res) => {
  res.send("Express is Running");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  prodName: { type: String, required: true },
  prodImage: { type: String, required: true },
  prodCategory: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }, // New field for featured products
  new: { type: Boolean, default: false }, // New field for new products
});

// CREATE Product
app.post("/products", async (req, res) => {
  try {
    const product = new Product({
      prodName: req.body.prodName,
      prodImage: req.body.prodImage,
      prodCategory: req.body.prodCategory,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      featured: req.body.featured || false, // Optional field
      new: req.body.new || false, // Optional field
    });
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).send("Error creating product");
  }
});

// READ All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

// READ Featured Products
app.get("/products/featured", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).send("Error fetching featured products");
  }
});

// READ New Products
app.get("/products/new", async (req, res) => {
  try {
    const newProducts = await Product.find({ new: true });
    res.json(newProducts);
  } catch (error) {
    res.status(500).send("Error fetching new products");
  }
});

// READ Product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching product");
  }
});

// UPDATE Product
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      res.json({ success: true, product: updatedProduct });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Error updating product");
  }
});

// DELETE Product
app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ success: true, message: `Product with ID ${req.params.id} removed` });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Error removing product");
  }
});

// Schema for creating users
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  logs: [{
    action: { type: String },
    timestamp: { type: Date, default: Date.now }
  }] // New field for user logs
});

// CREATE - User signup
app.post("/signup", async (req, res) => {
  let checkEmail = await Users.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email-id",
    });
  }

  let checkPhone = await Users.findOne({ phone: req.body.phone });
  if (checkPhone) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same phone number",
    });
  }

  // Hash the password using bcryptjs
  const saltRounds = 10; // Define the number of salt rounds
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword, // Store hashed password
    phone: req.body.phone,
    role: req.body.access,
    cartData: req.body.cartData || {}, // Use provided cartData or empty object if not provided
  });

  await user.save();
  
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secrete_ecom");
  res.json({ success: true, token });
});

// LOGIN - User login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    // Compare hashed password using bcryptjs
    const passCompare = await bcrypt.compare(req.body.password, user.password);

    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secrete_ecom");
      res.json({ success: true, token });

      // Log user login action
      user.logs.push({ action: "Login", timestamp: new Date() });
      await user.save();
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong email ID" });
  }
});

// READ - Get all users
app.get("/users", async (req, res) => {
  let users = await Users.find({});
  console.log("All users fetched");
  res.send(users);
});

// READ - Get user logs
app.get("/users/:id/logs", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (user) {
      res.json(user.logs);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user logs:", error);
    res.status(500).send("Server error");
  }
});

// UPDATE - Update a user by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run
    });

    if (updatedUser) {
      console.log("User updated:", updatedUser);
      res.json({
        success: true,
        user: updatedUser,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  }
});

// DELETE - Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Users.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({
        success: true,
        message: `User with ID ${id} removed`,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).send("Server error");
  }
});

// Starting server
app.listen(port, () => {
  console.log(`Server running on port ${port | 5000}`);
});
