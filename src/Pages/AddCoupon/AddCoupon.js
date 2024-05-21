import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./AddCoupon.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { AddShippingButton,  CreateCouponsButton,  UpdateCouponsButton } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";
import { DeleteCoupon, DeleteShipping, getAllCoupon } from "../../Api/Api";

function AddCoupon() {
  const [shippingData, setShippingData] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));


  // useEffect(() => {
  //   if (!authToken) {
  //     window.location.href = "/";
  //   } else {
  //     handleGetAllShipping();
  //   }
  // }, [authToken]);
  useEffect(()=>{
    handleGetAllShipping()
  },[])

  const handleGetAllShipping = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCoupon()
      if (response.status) {
        // Map over the data and add an 'id' property to each object
        const formattedData = response.data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setShippingData(formattedData);
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
      await DeleteCoupon(id);
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
      field: "promoCode",
      headerName: "Promo Code",
      width: 200,
    },
    { field: "expiry", headerName: "Expiry", width: 200 },
    { field: "discount", headerName: "discount", width: 200 },
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
      renderCell: (params) => <UpdateCouponsButton id={params.row._id} />,
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
          <h2>All Coupons</h2>
          <div>
            <CreateCouponsButton />
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={shippingData}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(row) => row.id} // Specify the getRowId prop to use the 'id' property as row id
          />
        </div>
      </div>
    </div>
  );
}

export default AddCoupon;
