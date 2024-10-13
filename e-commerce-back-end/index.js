

const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Db connection
mongoose.connect(
  "mongodb+srv://UwihanganyeObed:Sun123@cluster0.gvdipjg.mongodb.net/Commercial-web-Db?retryWrites=true&w=majority&appName=Cluster0"
);
//API creation

app.get("/", (req, res) => {
  res.send("Express is Running");
});
//Image storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Video Storage Engine
// const storageVid=multer.diskStorage({
//    destination: './uploads/videos',
//    filename: (req,file,cb)=>{
//       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//    }
// });
// const uploadVid=multer({storage: storageVid});
//upload video
// app.post('/uploads', uploadVid.single('video'), async(req,res)=>{
//    res.json({
//       success: 1,
//       video_url: `http://localhost:${port}/videos/${req.file.filename}`
//    })
// })

//Schema for creating products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  prodName: {
    type: String,
    required: true,
  },
  prodImage: {
    type: String,
    required: true,
  },
  prodCategory: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    prodName: req.body.prodName,
    prodImage: req.body.prodImage,
    prodCategory: req.body.prodCategory,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    prodName: req.body.prodName,
  });
});

 //creating deleting product's API
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    prodName: req.body.prodName,
  });
});

//Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});

// New route to get a product by ID
app.get("/products/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    // Fetch the product by ID using Mongoose
    const product = await Product.findById(id);
    
    if (product) {
      console.log("Product fetched:", product);
      res.json(product); // Send the found product as a JSON response
    } else {
      // If no product is found with the given ID
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send('Server error'); // Handle any server errors
  }
});

//Schema creating for User  Model
const Users = mongoose.model("Users", {
  id: {
    type: Number,
    required: true,
  },
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
  age: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  access: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating end-point for registering the user
app.post("/signup", async (req, res) => {
  let checkEmail = await Users.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email-id",
    });
  }
  let checkPhone = await Users.findOne({ phone: req.body.phone });
  if (checkPhone) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same phone number",
    });
  }

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    phone: req.body.phone,
    access: req.body.access,
    cartData: req.body.cartData || {}, // use provided cartData or empty object if not provided
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

//creating endpoint for user-login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secrete_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong email Id" });
  }
});

//Creating API for getting all Team
app.get("/alluserz", async (req, res) => {
  let userz = await Users.find({});
  console.log("All Users Fetched");
  res.send(userz);
});

// creating deleting User's API
app.post("/removeuser", async (req, res) => {
  try {
    // Query based on `_id` instead of `id`
    const result = await Users.findByIdAndDelete(req.body.id); 
    if (result) {
      console.log("Removed:", result);
      res.json({
        success: true,
        message: "User removed successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({
      success: false,
      message: "Error removing user",
    });
  }
});



//      //creating endpoint for newCollection
// app.get('/newcollections', async(req,res)=>{
//    let products= await Product.find({});
//    let newCollection=products.slice(1).slice(-8);
//    console.log("New Collections fetched")
//    res.send(newCollection);
// })

// //creating an endpoint for popular in wome section
// app.get('/popularinwomen', async(req,res)=>{
//    let products= await Product.find({category: "women"});
//    let popular_in_women= products.slice(0,4);
//    console.log("Poluar in women fetched");
//    res.send(popular_in_women);
// })

//       //creating middleware to fetch user
      // const fetchUser= async(req,res,next)=>{
      //    const token= req.header('auth-token');
      //    if(!token){
      //       res.status(401).send({errors: "Please authenticate using valid token"})
      //    }
      //    else{
      //       try{
      //          const data=jwt.verify(token,'secrete_ecom');
      //          req.user=data.user;
      //          next();
      //       }
      //       catch(err){
      //          res.status(401).send({errors: "Please authenticate using a valid token"})
      //       }
      //    }
      // }
//       //creating endpoint for adding product in cartData DB
// app.post('/addtocart', fetchUser, async(req,res)=>{
//    console.log("Added", req.body.itemId);
//          let userData= await Users.findOne({_id: req.user.id});
//          userData.cartData[req.body.itemId] += 1;
//          await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
//          res.send("Added")
//       })

//       //creating endpoint to remove product from cartdata
// app.post('/removefromcart', fetchUser, async(req,res)=>{
//    console.log("Removed", req.body.itemId);
//    let userData= await Users.findOne({_id: req.user.id});
//    if(userData.cartData[req.body.itemId]>0)
//    userData.cartData[req.body.itemId] -= 1;
//    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
//    res.send("Removed")
// })

// //creating endpoint to get cartdata
// app.post('/getcart', fetchUser, async(req,res)=>{
//    console.log('Get cart');
//    let userData= await Users.findOne({_id: req.user.id});
//    res.json(userData.cartData);
// })

app.listen(port, (err) => {
  if (!err) {
    console.log("Server Running on port " + port);
  } else {
    console.log("Error: " + err);
  }
})

