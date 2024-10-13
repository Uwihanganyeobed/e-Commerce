import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const AddProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    prodName: "",
    prodImage: "",
    prodCategory: "women",
    new_price: "",
    old_price: "",
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.prodImage = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:5000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success
            ? toast.success("Product Added Successfully😃!", {
                position: "top-right",
              })
            : 
            toast.fail("Adding Product Failed 😥!", {
              position: "top-right",
            })
        });
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title="Adding New Products" />
      <ToastContainer /> 
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Title"
                onBlur={handleBlur}
                onChange={changeHandler}
                value={productDetails.prodName}
                name="prodName"
                error={!!touched.productTitle && !!errors.productTitle}
                helperText={touched.productTitle && errors.productTitle}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={changeHandler}
                value={productDetails.old_price}
                name="old_price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Offer Price"
                onBlur={handleBlur}
                onChange={changeHandler}
                value={productDetails.new_price}
                name="new_price"
                error={!!touched.offerPrice && !!errors.offerPrice}
                helperText={touched.offerPrice && errors.offerPrice}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel>Product Category</InputLabel>
                <Select
                  value={productDetails.prodCategory}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  name="prodCategory"
                  error={!!touched.productCategory && !!errors.productCategory}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="peopleFashion">People's Fashion</MenuItem>
                  <MenuItem value="equipHome">Equip-Home</MenuItem>
                  <MenuItem value="newDeals">New Deals</MenuItem>
                </Select>
              </FormControl>
              <Box
                sx={{
                  gridColumn: "span 1",
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                  objectFit: "contain",
                }}
              >
                <FormLabel htmlFor="file-input">
                  <img
                    src={image ? URL.createObjectURL(image) : PermMediaIcon}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </FormLabel>
                <Input
                  onChange={imageHandler}
                  type="file"
                  name="image"
                  id="image"
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={Add_Product}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  prodName: yup.string().required("Required"),
  old_price: yup.number().required("Required"),
  new_price: yup.number().required("Required"),
  prodCategory: yup.string().required("Required"),
});

const initialValues = {
  prodName: "",
  old_price: "",
  new_price: "",
  prodCategory: "",
};

export default AddProduct;
