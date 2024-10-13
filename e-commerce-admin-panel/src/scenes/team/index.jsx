import { Box, Typography, useTheme, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Team = () => {
  const [allUserz, setAllUserz] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch users from the backend
  const fetchUserz = async () => {
    try {
      const response = await fetch("http://localhost:5000/alluserz");
      const data = await response.json();
      setAllUserz(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUserz();
  }, []);

  // Delete a user by their _id
  const remove_user = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/removeuser", { id });
      if (response.data.success) {
        // Update the state to remove the user from the list
        setAllUserz((prevUserz) => prevUserz.filter((user) => user._id !== id));
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error occurred while deleting the user.");
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 }, // Use MongoDB's _id
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "remove",
      headerName: "Remove",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => remove_user(params.row._id)} // Use _id for deletion
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // Map the users from the backend to the DataGrid format
  const dataTeam = allUserz.map((user) => ({
    _id: user._id, // Use MongoDB's _id as unique identifier
    name: user.name,
    email: user.email,
    password: user.password,
    age: user.age,
    phone: user.phone,
    access: user.access,
  }));

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={dataTeam}
          columns={columns}
          getRowId={(row) => row._id} // Use _id as unique row ID
        />
      </Box>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Team;
