import React from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const AddMarket = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:4000/markets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add market");
      }

      toast.success("Market added successfully!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      toast.error("Failed to add market: " + error.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="Add New Market" />
      <Formik
        initialValues={initialMarketValues}
        validationSchema={marketSchema}
        onSubmit={handleSubmit}
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
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Market Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="District"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.district}
                name="district"
                error={!!touched.district && !!errors.district}
                helperText={touched.district && errors.district}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation schema for markets
const marketSchema = yup.object().shape({
  name: yup.string().required("Market name is required"),
  district: yup.string().required("District is required"),
});

// Initial market form values
const initialMarketValues = {
  name: "",
  district: "",
};

export default AddMarket;
