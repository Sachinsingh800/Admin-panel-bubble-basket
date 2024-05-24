import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./AddCategory.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { AddCategoryButton, UpdateCategory } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";
import { DeleteCategory, getAllCategory } from "../../Api/Api";

function AddCategory() {
  const [category, setCategory] = useState([]);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));

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
      const response = await getAllCategory();
      setCategory(response?.data?.map(item => ({...item, id: item._id})));
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
        alert("Something went wrong");
      }
    } finally {
      SetIsloading(false);
    }
  };



  const handleDeleteCategory = async (Id) => {
    SetIsloading(true);
    try {
      const response = await DeleteCategory(Id);
      console.log(response.data, "response");
      // Refresh the products after successful deletion
      handleGetAllCategory();
      alert("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      SetIsloading(false);
    }
  };


  const columns = [
    { field: 'categoryImg', headerName: 'Image', width: 150, renderCell: (params) => (
      <img src={params.value.url} alt={params.row.categoryName} style={{ width: '50px', height: "50px" }} />
    )},
    { field: 'categoryName', headerName: 'Category', width: 150 },
    { field: 'content', headerName: 'Content', width: 150 },
    { field: 'catTypeUp', headerName: 'Cat Type Up', width: 150 },
    { field: 'catTypeDown', headerName: 'Cat Type Down', width: 150 },
    { field: '_id', headerName: 'Action', width: 150, renderCell: (params) => (
      <button className={style.btn} onClick={() => handleDeleteCategory(params.value)}>Delete</button>
    )},
    {
      field: "id", // Corrected field name to match the ID field
      headerName: "Update",
      width: 150,
      renderCell: (params) => <UpdateCategory id={params.formattedValue} name={params.value} />,
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
          <h2>All Category</h2>
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

export default AddCategory;

