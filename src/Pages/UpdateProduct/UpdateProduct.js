import React, { useEffect, useState } from "react";
import style from "./UpdateProduct.module.css"; // Replace with your actual styles
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import {
  addProduct,
  getAllCategory,
  getAllSubCategory,
  updateProduct,
} from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadingStatus } from "../../Recoil";
import { useRecoilState } from "recoil";
import { AddCategoryButton, AddSubCategoryButton } from "../../Component/CreateButton/CreateButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const [productImgs, setProductImgs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [subcategories, setSubCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState("");
  const [singleProduct, setSingleProduct] = useState({
    title: "",
    MRP: "",
    Stock: "",
    measureUnit: "",
    category: "",
    unit: "",
    price: "",
    sub_category: "",
    description: "",
    setAs: "",
  });

  const authToken = JSON.parse(localStorage.getItem("token"));

  useEffect(()=>{
    getUpdatedProduct()
  },[])

  const getUpdatedProduct = async () => {
    try {
      const response = await axios.get(
        `https://zuluresh.onrender.com/admin/product/getProduct/${id}`
      );
      setSingleProduct(response.data.data); // Set the product data received from the API
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
    }
  };

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleAllCategory = async () => {
    SetIsloading(true);
    try {
      const response = await getAllCategory();
      setCategories(response.data); // Set the categories data
    } catch (error) {
      console.error("Error getting products:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const handleSelectCategory = (e) => {
    setCategoriesId(e.target.value);
    handleAllSubCategory(e.target.value);
  };

  const handleAllSubCategory = async (categoryId) => {
    SetIsloading(true);
    try {
      const response = await getAllSubCategory(categoryId);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error getting products:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSingleProduct((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setProductImgs(files);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...productImgs];
    newImages.splice(index, 1);
    setProductImgs(newImages);
  };

  const handleUpdateClick = async () => {
    const formdata = new FormData();
    formdata.append("title", singleProduct.title);
    formdata.append("MRP", singleProduct.MRP);
    formdata.append("Stock", singleProduct.Stock);
    formdata.append("measureUnit", singleProduct.measureUnit);
  
    // Get the category name based on the selected ID
    const selectedCategory = categories.find(
      (category) => category._id === categoriesId
    );
    if (selectedCategory) {
      formdata.append("category", selectedCategory.categoryName);
    } else {
      console.error("Selected category not found.");
      return;
    }
  
    // Get the subcategory name based on the selected ID
    const selectedSubcategory = subcategories.find(
      (subcategory) => subcategory._id === singleProduct.sub_category
    );
    if (selectedSubcategory) {
      formdata.append("Sub_category", selectedSubcategory.subCategoryName);
    } else {
      console.error("Selected subcategory not found.");
      return;
    }
    formdata.append("unit", singleProduct.unit);
    formdata.append("price", singleProduct.price);
    formdata.append("description", singleProduct.description);
    formdata.append("setAs", singleProduct.setAs);
  
    // Append each image with the key "productImgs[]"
    productImgs.forEach((img, index) => {
      formdata.append(`productImg`, img);
    });
  
    try {
      const response = await updateProduct(id,formdata);
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Updated successfully");
        navigate("/Product");
      } else {
        console.error(response);
        // Handle update error
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response?.data?.message;
        setErrorMessage(errorMessage);
        // Log the error message as a string
        console.log("Error Message:", errorMessage);
      } else {
        // Network error (e.g., no internet connection)
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.log("Network Error:", errorMessage);
        alert("Something went wrong");
      }
    }
  };
  

  return (
    <div className={style.main}>
      <NavBar />
      <OptionBar />
      {isLoading && <LoadingScreen />}
      <div className={style.body}>
        {productImgs.length > 0 ? (
          <div className={style.imgbox}>
            {productImgs.map((img, index) => (
              <div key={index} className={style.imageContainer}>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon style={{ fontSize: 14 }} />
                </button>
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Product ${index}`}
                  className={style.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Please Choose Images</p>
        )}

        <br />
        <input
          type="file"
          multiple
          onChange={handleAddImage}
          accept="image/*"
        />
        <ul className={style.list}>
          <li>
            <span>Title:</span>
            <input
              type="text"
              name="title"
              value={singleProduct.title}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Description:</span>
            <div className={style.quillContainer}>
            <ReactQuill
              theme="snow"
              value={singleProduct.description}
              onChange={(value) =>
                setSingleProduct((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
            />
            </div>
    
          </li>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <li>
            <span>Category:</span>
            <div className={style.categoryBox}>
            <select
            className={style.category}
              name="category"
              value={categoriesId}
              onChange={handleSelectCategory}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <AddCategoryButton />
            </div>
          
          </li>
          <li>
            <span>Sub Category:</span>
            <div className={style.categoryBox}>
            <select
               className={style.category}
              name="sub_category"
              value={singleProduct.sub_category}
              onChange={handleInputChange}
            >
              <option value="">Select sub category</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.subCategoryName}
                </option>
              ))}
            </select>
            <AddSubCategoryButton />
            </div>
          </li>
          <li>
            <span>MRP:</span>
            <input
              type="text"
              name="MRP"
              value={singleProduct.MRP}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Price:</span>
            <input
              type="text"
              name="price"
              value={singleProduct.price}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Stock:</span>
            <input
              type="text"
              name="Stock"
              value={singleProduct.Stock}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Unit:</span>
            <input
              type="text"
              name="unit"
              value={singleProduct.unit}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span htmlFor="measureUnit">Select a Measurement Unit:</span>
            <select
              id="measureUnit"
              name="measureUnit"
              type="text"
              value={singleProduct.measureUnit}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="L">Liter (L)</option>
              <option value="mL">Milliliter (mL)</option>
              <option value="g">Gram (g)</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="lb">Pound (lb)</option>
              <option value="oz">Ounce (oz)</option>
              <option value="t">Metric Ton (t)</option>
              <option value="ct">Carat (ct)</option>
              <option value="pts">Pieces (pts)</option>
            </select>
          </li>
          <li>
            <span>Set As:</span>
            <select
              type="text"
              name="setAs"
              value={singleProduct.setAs}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="None">None</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Best Deals">Best Deals</option>
              <option value="Combos">Combos</option>
              <option value="offers">offers</option>
            </select>
          </li>
        </ul>
        <button onClick={handleUpdateClick}>Update Product</button>
      </div>
    </div>
  );
}

export default UpdateProduct;
