import React, { useEffect, useState } from "react";
import style from "./UpdateProduct.module.css"; // Replace with your actual styles
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import { getAllCategory, updateProduct } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AddCategoryButton } from "../../Component/CreateButton/CreateButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productImgs, setProductImgs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [singleProduct, setSingleProduct] = useState({
    title: "",
    Stock: "",
    measureUnit: "",
    category: "",
    unit: "",
    price: "",
    description: "",
    sku: "",
    productStatus: "",
    tag: "",
    dimension: "",
    intro: "",
    detailedOverview: "",
    experienceOfTesting: "",
    comparison: "",
    winery: "",
    country: "",
    region: "",
    year: "",
    grapeVarietal: "",
    size: "",
    aBV: "",
    wineStyle: "",
    brand: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getUpdatedProduct();
    handleAllCategory();
  }, []);

  const getUpdatedProduct = async () => {
    try {
      const response = await axios.get(
        `https://bubblebasketbackendapp.onrender.com/admin/product/getSingle/${id}`
      );
      const productData = response.data.data;
      setSingleProduct({
        ...productData,
        ...productData.productExtra,
        ...productData.productBlog,
      });
      setSelectedCategory(productData.category);
      setProductImage(productData.productImg);
    } catch (error) {
      console.error("Error fetching product data:", error.message);
    }
  };

  const handleAllCategory = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCategory();
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting categories:", error.message);
      setIsLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSingleProduct((prevProduct) => ({
      ...prevProduct,
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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", singleProduct.title);
    formData.append("Stock", singleProduct.Stock);
    formData.append("measureUnit", singleProduct.measureUnit);
    formData.append("unit", singleProduct.unit);
    formData.append("price", singleProduct.price);
    formData.append("description", singleProduct.description);
    formData.append("sku", singleProduct.sku);
    formData.append("productStatus", singleProduct.productStatus);
    formData.append("tag", singleProduct.tag);
    formData.append("dimension", singleProduct.dimension);
    formData.append("intro", singleProduct.intro);
    formData.append("detailedOverview", singleProduct.detailedOverview);
    formData.append("experienceOfTesting", singleProduct.experienceOfTesting);
    formData.append("comparison", singleProduct.comparison);
    formData.append("winery", singleProduct.winery);
    formData.append("country", singleProduct.country);
    formData.append("region", singleProduct.region);
    formData.append("year", singleProduct.year);
    formData.append("grapeVarietal", singleProduct.grapeVarietal);
    formData.append("size", singleProduct.size);
    formData.append("aBV", singleProduct.aBV);
    formData.append("wineStyle", singleProduct.wineStyle);
    formData.append("brand", singleProduct.brand);
    formData.append("category", selectedCategory);
    productImgs.forEach((img) => {
      formData.append("productImg", img);
    });

    try {
      const response = await updateProduct(id, formData);
      setIsLoading(false);
      alert("Updated successfully");
      window.location.href = "/Product";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        setErrorMessage(errorMessage);
        console.error("Error Message:", errorMessage);
        setIsLoading(false);
      } else {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.error("Network Error:", errorMessage);
        alert("Something went wrong");
        setIsLoading(false);
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
          <div className={style.product_image}>
            <img src={productImage[0]?.url} alt="product" />
          </div>
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
            <span>Experience Of Testing:</span>
            <textarea
              type="text"
              name="experienceOfTesting"
              value={singleProduct.experienceOfTesting}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Comparison:</span>
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
                value={selectedCategory}
                onChange={handleSelectCategory}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
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
            <span>SKU:</span>
            <input
              type="text"
              name="sku"
              value={singleProduct.sku}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Tag:</span>
            <input
              type="text"
              name="tag"
              value={singleProduct.tag}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <span>Dimension:</span>
            <input
              type="text"
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
            <span htmlFor="productStatus">Product Status:</span>
            <select
              id="productStatus"
              name="productStatus"
              value={singleProduct.productStatus}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </li>
        </ul>
        <button onClick={handleUpdateClick}>
          {isLoading ? "loading..." : "Update Product"}
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
