import React, { useEffect, useState } from "react";
import style from "./Blog.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "../../Component/Header/Header";
import OptionBar from "../../Component/OptionBar/OptionBar";
import NavBar from "../../Component/NavBar/NavBar";
import { getAllProduct, deleteProduct, getAllBlog, deleteBlog } from "../../Api/Api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

function Blog() {
  const [originalProducts, setOriginalProducts] = useState([]);

  const [input, setInput] = useState("");
  const { id } = useParams();
  const [categories, setCategory] = useState([]);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  console.log(categories, "cate");

  const authToken = JSON.parse(localStorage.getItem("token"));

  // useEffect(()=>{
  //   if(!authToken){
  //     window.location.href="/"
  //   }
  // },[])

  useEffect(() => {
    handleAllBlog();
  }, []);

  const handleAllBlog= async () => {
    SetIsloading(true);
    try {
      const response = await getAllBlog();
      console.log(response.data, "response");
      setOriginalProducts(response.data);
    } catch (error) {
      console.error("Error getting products:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const DeleteProduct = async (productId) => {
    SetIsloading(true);
    try {
      const response = await deleteBlog(productId);
      console.log(response.data, "response");
      // Refresh the products after successful deletion
      handleAllBlog();
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      SetIsloading(false);
    }
  };



const  convertDate=(dateString)=>{
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
        </div>
        <div>
            <Link to="/CreateBlog">
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
        {originalProducts
          .filter((elem) => {
            return elem?.description.toLowerCase().includes(input.toLowerCase());
          })
          .map((item, id) => (
            <div key={id} className={style.container}>
              <div className={style.btnbox}>
                <Link to={`/UpdateProduct/${item._id}`}>
                  <button>
                    <AiFillEdit />
                  </button>
                </Link>
                <button
                  style={{ color: "red" }}
                  onClick={() => DeleteProduct(item._id)}
                >
                  <RiDeleteBin6Fill />
                </button>
              </div>
              <div className={style.imgbox}>
                {item?.blogImage && (
                  <img
                    className={style.img}
                    src={item?.blogImage?.url}
                    alt="product"
                  />
                )}
              </div>
              <div >
              <span >{item?.authorName}</span>  -  <span>{convertDate(item?.createdAt) }</span>
              </div>
               <h2>{item?.blogTitle}</h2>
               <p>{item?.shortDescription}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Blog;
