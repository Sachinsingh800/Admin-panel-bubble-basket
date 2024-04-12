import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./PinCode.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus, pinCodeStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { deletePincode } from "../../Api/Api";
import Header from "../../Component/Header/Header";
import { CreateButton } from "../../Component/CreateButton/CreateButton";

function Pincode() {
  const [pincode, setPincode] = useState([]);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [isPincode, SetIsPincode] = useRecoilState(pinCodeStatus);

  const authToken = JSON.parse(localStorage.getItem("token"));

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  useEffect(() => {
    handlegetAllpincode();
  }, [isPincode]);

  const handlegetAllpincode = async () => {
    try {
      const response = await axios.get(`https://zuluresh.onrender.com/admin/pincodeLocation/getAllPincode`);
      setPincode(response?.data?.data.map((item) => ({ ...item, id: item._id }))); // Add id property
    } catch (error) {
      console.error('Error getting services:', error.message);
    } finally {
      SetIsPincode(false);
    }
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // You can pass locale options here if needed
  };

  const DeletePincode = async (Id) => {
    SetIsloading(true);
    try {
      const response = await deletePincode(Id);
      console.log(response.data, "response");
      // Refresh the products after successful deletion
      handlegetAllpincode();
      alert("Pincode deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const columns = [
    { field: 'pincode', headerName: 'Pincode', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150, valueGetter: (params) => formatCreatedAt(params.value) },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: '_id', headerName: 'Action', width: 150, renderCell: (params) => (
      <button className={style.btn} onClick={() => DeletePincode(params.value)}>Delete</button>
    )},
  ];

  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
      <Header />
        <div className={style.header}>
        <h2>All Pincode</h2>
          <div>
            <CreateButton />
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={pincode}
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

export default Pincode;
