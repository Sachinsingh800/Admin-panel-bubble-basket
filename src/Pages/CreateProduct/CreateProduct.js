import React, { useEffect, useState } from "react";
import style from "./CreateProduct.module.css"; // Replace with your actual styles
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import { addProduct, getAllCategory, getAllSubCategory } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadingStatus } from "../../Recoil";
import { useRecoilState } from "recoil";
import {
  AddCategoryButton,
} from "../../Component/CreateButton/CreateButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

function CreateProduct() {
  const navigate = useNavigate();
  const [productImgs, setProductImgs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, SetIsloading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState("");
  const [singleProduct, setSingleProduct] = useState({
    title: "",
    Stock: "",
    measureUnit: "",
    category: "",
    unit: "",
    price: "",
    sub_category: "",
    description: "",
    sku: "",
    productStatus: "",
    tag: "",
    dimension: "",
    intro:"",
    detailedOverview:"",
    experienceOfTesting:"",
    comparison:"",
    winery:"",
    country:"",
    region:"",
    year:"",
    grapeVarietal:"",
    size:"",
    aBV:"",
    wineStyle:"",
    brand:"",
    
  });

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleAllCategory = async () => {
    SetIsloading(true);
    try {
      const response = await getAllCategory();
      setCategories(response.data); // Set the categories data
      SetIsloading(false);
    } catch (error) {
      SetIsloading(false);
      console.error("Error getting products:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const handleSelectCategory = (e) => {
    setCategoriesId(e.target.value);
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
    SetIsloading(true);
    const formdata = new FormData();
    formdata.append("title", singleProduct.title);
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
    formdata.append("unit", singleProduct.unit);
    formdata.append("price", singleProduct.price);
    formdata.append("description", singleProduct.description);
    formdata.append("sku", singleProduct.sku);
    formdata.append("productStatus", singleProduct.productStatus);
    formdata.append("tag", singleProduct.tag);
    formdata.append("dimension", singleProduct.dimension);
    formdata.append("intro", singleProduct.intro);
    formdata.append("detailedOverview", singleProduct.detailedOverview);
    formdata.append("experienceOfTesting", singleProduct.experienceOfTesting);
    formdata.append("comparison", singleProduct.comparison);
    formdata.append("winery", singleProduct.winery);
    formdata.append("country", singleProduct.country);
    formdata.append("region", singleProduct.region);
    formdata.append("year", singleProduct.year);
    formdata.append("grapeVarietal", singleProduct.grapeVarietal);
    formdata.append("size", singleProduct.size);
    formdata.append("aBV", singleProduct.aBV);
    formdata.append("wineStyle", singleProduct.wineStyle);
    formdata.append("brand", singleProduct.brand);

    productImgs.forEach((img, index) => {
      formdata.append(`productImg`, img);
    });

    try {
      const response = await addProduct(formdata);
      const { status, message } = response;
      if (status) {
        SetIsloading(false);
        alert("Product created successfully");
        navigate("/Product");
      } else {
        console.error(response);
        SetIsloading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        const errorMessage = response?.data?.message;
        setErrorMessage(errorMessage);
        console.log("Error Message:", errorMessage);
        SetIsloading(false);
      } else {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.log("Network Error:", errorMessage);
        alert("Something went wrong");
        SetIsloading(false);
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
            <span>Winery:</span>
            <input
              type="text"
              name="winery"
              value={singleProduct.winery}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Country:</span>
            <input
              type="text"
              name="country"
              value={singleProduct.country}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Region:</span>
            <input
              type="text"
              name="region"
              value={singleProduct.region}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Year:</span>
            <input
              type="text"
              name="year"
              value={singleProduct.year}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Grape Varietal:</span>
            <input
              type="text"
              name="grapeVarietal"
              value={singleProduct.grapeVarietal}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Size:</span>
            <input
              type="text"
              name="size"
              value={singleProduct.size}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>ABV:</span>
            <input
              type="text"
              name="aBV"
              value={singleProduct.aBV}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Wine Style:</span>
            <input
              type="text"
              name="wineStyle"
              value={singleProduct.wineStyle}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Brand:</span>
            <input
              type="text"
              name="brand"
              value={singleProduct.brand}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Introduction:</span>
            <textarea
              type="text"
              name="intro"
              value={singleProduct.intro}
              onChange={handleInputChange}
            />
          </li>

          <li>
            <span>Detailed Overview:</span>
            <textarea
              type="text"
              name="detailedOverview"
              value={singleProduct.detailedOverview}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span> Experience Of Testing:</span>
            <textarea
              type="text"
              name="experienceOfTesting"
              value={singleProduct.experienceOfTesting}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span> Comparison:</span>
            <textarea
              type="text"
              name="comparison"
              value={singleProduct.comparison}
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
          <br />
          <br />
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
            <span>sku:</span>
            <input
              type="sku"
              name="sku"
              value={singleProduct.sku}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Tag:</span>
            <input
              type="tag"
              name="tag"
              value={singleProduct.tag}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Dimension:</span>
            <input
              type="dimension"
              name="dimension"
              value={singleProduct.dimension}
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
            <span htmlFor="productStatus">product Status:</span>
            <select
              id="productStatus"
              name="productStatust"
              type="text"
              value={singleProduct.productStatus}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </li>
        </ul>
        <button onClick={handleUpdateClick}>{isLoading ? "loading..." : "Add Product"}</button>
      </div>
    </div>
  );
}

export default CreateProduct;
