import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./AddShpping.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { AddShppingButton, UpdateShippingButton } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";
import { DeleteShipping } from "../../Api/Api";

function AddShpping() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    // Redirect to login if authToken is not available
    if (!authToken) {
      window.location.href = "/";
    } else {
      handleGetAllCategory();
    }
  }, [authToken]);

  const handleGetAllCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.zuluresh.com/admin/shipping/getShipping`
      );
      // Assuming your API returns an array of shipping objects
      //   setCategory(response?.data?.message); // Update state with response data
      setCategory(
        response.data.message.map((item) => ({ ...item, id: item._id }))
      );
      console.log(
        response.data.message,

        "response"
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response.data.message;
        alert(errorMessage);
        // Log the error message as a string
      } else {
        // Network error (e.g., no internet connection)
        alert("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    setIsLoading(true);
    try {
      await DeleteShipping(id);
      // Refresh the categories after successful deletion
      handleGetAllCategory();
      alert("Shipping deleted successfully");
    } catch (error) {
      console.error("Error deleting shipping:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      field: "freeShipingLimit",
      headerName: "Free Shipping Limit",
      width: 200,
    },
    { field: "shippingCharge", headerName: "Shipping Charge", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <button
          className={style.btn}
          onClick={() => handleDeleteCategory(params.row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      field: "_id", // Corrected field name to match the ID field
      headerName: "Update",
      width: 150,
      renderCell: (params) => <UpdateShippingButton id={params.formattedValue} />,
      
    },
  ];

  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <Header />
        <div className={style.header}>
          <h2>All Shipping</h2>
          <div>
            <AddShppingButton />
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={category}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}

export default AddShpping;
