import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./AddSubCategory.module.css";
import Header from "../../Component/Header/Header";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AddSubCategoryButton } from "../../Component/CreateButton/CreateButton";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import { getAllCategory, getAllSubCategory, DeleteSubCategory } from "../../Api/Api";
import { DataGrid } from '@mui/x-data-grid';

function AddSubCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const authToken = JSON.parse(localStorage.getItem("token"));

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  useEffect(() => {
    handleAllCategory();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      handleAllSubCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAllCategory = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCategory();
      setCategories(response.data); // Set the categories data
    } catch (error) {
      console.error("Error getting categories:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllSubCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await getAllSubCategory(categoryId);
      // Add an id property to each subcategory
      const subCategoriesWithId = response.data.map((subcategory, index) => ({
        ...subcategory,
        id: index + 1 // You can generate a unique id based on your data or use index
      }));
      setSubCategories(subCategoriesWithId); // Set the subcategories data
    } catch (error) {
      console.error("Error getting subcategories:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubCategory = async (id) => {
    setIsLoading(true);
    try {
      const response = await DeleteSubCategory(id);
      console.log(response.data, "response");
      // Refresh the subcategories after successful deletion
      alert("Subcategory deleted successfully");
      handleAllSubCategory(selectedCategory);
    } catch (error) {
      console.error("Error deleting subcategory:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { field: 'subCategoryName', headerName: 'Subcategory', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <button
          className={style.btn}
          onClick={() => handleDeleteSubCategory(params.row._id)}
        >
          Delete <RiDeleteBin6Fill />
        </button>
      ),
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
          <h2>All Subcategories</h2>
          <div>
            <AddSubCategoryButton selectedCategory={selectedCategory} />
          </div>
        </div>
        <div className={style.categoriesContainer}>
          <span>Category:</span>
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <br/>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={subCategories}
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

export default AddSubCategory;
