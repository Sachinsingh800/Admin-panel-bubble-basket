import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./Approval.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { AddCategoryButton, UpdateCategory } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";
import { DeleteCategory } from "../../Api/Api";
import { useParams } from "react-router-dom";

function Approval() {
  const [category, setCategory] = useState([]);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  useEffect(() => {
    handleGetAllCategory();
  }, []);

  const handleGetAllCategory = async () => {
    SetIsloading(true);
    try {
        const headers = {
            "x-admin-token": authToken, // Ensure authToken is defined
            "Content-Type": "multipart/form-data", // Set content type to JSON
          };
      const response = await axios.get(`https://www.backend.luxurybubblebasket.com/admin/reviews/getAll/${id}?adminApproval=false`,{headers });
      setCategory(response?.data?.reviews.map(item => ({...item, id: item._id})));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response.data.message
  
           alert(errorMessage)
        // Log the error message as a string
      } else {
        // Network error (e.g., no internet connection)
        // alert("Something went wrong");
      }
    } finally {
      SetIsloading(false);
    }
  };



 const handleApprovedReview= async(ID)=>{
    SetIsloading(true);
    try {
        const headers = {
            "x-admin-token": authToken, // Ensure authToken is defined
            "Content-Type": "application/json",
          };
          const response = await axios.put(`https://www.backend.luxurybubblebasket.com/admin/reviews/approve/${ID}`, {}, { headers });
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response.data.message
  
           alert(errorMessage)
        // Log the error message as a string
      } else {
        // Network error (e.g., no internet connection)
        // alert("Something went wrong");
      }
    } finally {
      SetIsloading(false);
      handleGetAllCategory()
    }
 }


  const columns = [
      
    { field: '_id', headerName: 'ID', width: 150 },
    { field:   'name', headerName: 'Name', width: 150 },
    { field:   'email', headerName: 'Email', width: 150 },
    { field:   'rating', headerName: 'Rating', width: 150 },
    { field:   'reviewText', headerName: 'Review', width: 150 },
    { field:   'adminApproval', headerName: 'Admin Approval', width: 150 },
    {
      field: "Approved", // Corrected field name to match the ID field
      headerName: "Approved",
      width: 150,
      renderCell: (params) => <button onClick={()=>handleApprovedReview(params.id)}>Approved</button>,
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
          <h2>All Reviews</h2>
          <div>
            <AddCategoryButton />
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
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

export default Approval;

