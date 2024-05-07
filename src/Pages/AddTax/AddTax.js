import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./AddTax.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { AddShippingButton, UpdateShippingButton, UpdateTaxButton } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";
import { DeleteShipping, DeleteTax } from "../../Api/Api";

function AddTax() {
  const [shippingData, setShippingData] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));

  console.log(shippingData,"data")
  useEffect(() => {
    // Redirect to login if authToken is not available
    if (!authToken) {
      window.location.href = "/";
    } else {
      handleGetAllShipping();
    }
  }, [authToken]);

  const handleGetAllShipping = async () => {
    setIsLoading(true);
    try {
      const headers = {
        "x-admin-token": authToken,
      };
      const response = await axios.get(
        "https://wine-rnlq.onrender.com/admin/tax/get",
        { headers }
      );
      if (response.data.status) {
        setShippingData([response.data.data].map((item) => ({ ...item, id: item._id })));
      } else {
        console.error("Error fetching shipping:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching shipping:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteShipping = async (id) => {
    setIsLoading(true);
    try {
      await DeleteTax(id);
      // Refresh the shipping after successful deletion
      handleGetAllShipping();
      alert("Shipping deleted successfully");
    } catch (error) {
      console.error("Error deleting shipping:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [

    {
      field: "taxPercent",
      headerName: "Tax Percent",
      width: 200,
    },
    { field: "updatedAt", headerName: "Updated At", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <button
          className={style.btn}
          onClick={() => handleDeleteShipping(params.row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      field: "_id",
      headerName: "Update",
      width: 150,
      renderCell: (params) => <UpdateTaxButton id={params.row._id} />,
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
          <h2>All Tax</h2>
          <div>
            <AddShippingButton />
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={shippingData}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}

export default AddTax;
