import React, { useEffect, useState } from "react";
import style from "./Review.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit, AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "../../Component/Header/Header";
import OptionBar from "../../Component/OptionBar/OptionBar";
import NavBar from "../../Component/NavBar/NavBar";
import { getAllProduct, deleteProduct, getAllCategory } from "../../Api/Api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function Review() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [input, setInput] = useState("");
  const { id } = useParams();
  const [categories, setCategory] = useState([]);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  console.log(categories, "cate");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const pop_id = open ? "simple-popover" : undefined;

  const authToken = JSON.parse(localStorage.getItem("token"));

  // useEffect(()=>{
  //   if(!authToken){
  //     window.location.href="/"
  //   }
  // },[])

  useEffect(() => {
    FetchProduct();
  }, []);

  const FetchProduct = async () => {
    SetIsloading(true);
    try {
      const response = await getAllProduct();
      console.log(response.data, "response");
      setOriginalProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error getting products:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const handleReverse = () => {
    // Reverse the order of the filtered products array
    setFilteredProducts([...filteredProducts].reverse());
  };

  const handleFilterData = (e) => {
    const category = e.target.value;
    if (category === "") {
      setFilteredProducts(originalProducts);
    } else {
      const filterData = originalProducts.filter(
        (item) => item.category === category
      );
      setFilteredProducts(filterData);
    }
  };

  useEffect(() => {
    handleGetAllCategory();
  }, []);

  const handleGetAllCategory = async () => {
    SetIsloading(true);
    try {
      const response = await getAllCategory()
      setCategory(response.data);
    } catch (error) {
      console.error("Error getting categories:", error.message);
    } finally {
      SetIsloading(false);
    }
  };
  function convertToJSX(htmlString) {
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlString },
    });
  }

  return (
    <div className={style.main}>
      <NavBar />
      <OptionBar />
      {isLoading && <LoadingScreen />}
      <div className={style.body}>
        <Header />
        <div className={style.header}>
          <div className={style.input_conatiner}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={style.input}
              placeholder="Search"
            />
            <select
              className={style.category}
              name="category"
              value={categories}
              onChange={handleFilterData}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <button onClick={handleReverse} className={style.btn}>
              ⇆ Last Added
            </button>
          </div>
          <div>
            <Link to="/CreateProduct">
              <button style={{ backgroundColor: "blue", color: "white" }}>
                <AiOutlinePlus />
                Create
              </button>
            </Link>
          </div>
        </div>
        <div className={style.container_box}>
          <br />
          <br />
          {filteredProducts
            .filter((elem) => {
              return elem.title.toLowerCase().includes(input.toLowerCase());
            })
            .map((item, id) => (
              <div key={id} className={style.container}>
                <div className={style.btnbox}>
                  <div>
                    <Button
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                      style={{ color: "black" }}
                    >
                      <AiOutlineEdit />
                    </Button>
                    <Popover
                      id={pop_id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Link to={`/Approval/${item._id}?adminApproval=true`}>
                        <Typography
                          sx={{ p: 2 }}
                        >
                          Approved
                        </Typography>
                      </Link>
                      <Link to={`/Approval/${item._id}?adminApproval=false`}>
                        <Typography
                          sx={{ p: 2 }}
                        >
                          Not Approved
                        </Typography>
                      </Link>
                    </Popover>
                  </div>
                </div>
                <div className={style.imgbox}>
                  {/* Check if productImg is not empty */}
                  {item.productImg && item.productImg.length > 0 && (
                    <img
                      className={style.img}
                      src={item.productImg[0].url}
                      alt="product"
                    />
                  )}
                  <p>next</p>
                </div>
                <ul className={style.list}>
                  <li>
                    <span>Title:</span>
                    {item.title}
                  </li>
                  <li>
                    <span>Price:</span>
                    {item.price}
                  </li>
                  <li>
                    <span>Stock:</span>
                    {item.Stock}
                  </li>
                  <li>
                    <span>Category:</span>
                    {item.category}
                  </li>
                  <li>
                    <span>Unit:</span>
                    {item.unit}
                  </li>
                  <li>
                    <span>Measure Unit:</span>
                    {item.measureUnit}
                  </li>
                  <li>
                    <span>Pieces:</span>
                    {item.unit}
                  </li>
                  <li>
                    <span>Set As:</span>
                    {item.setAs}
                  </li>
                  <li>
                    <span>Description:</span>
                  </li>
                  <li>{convertToJSX(item.description)}</li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
