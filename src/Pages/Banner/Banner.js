// src/pages/Banner/Banner.js
import React, { useEffect, useState } from "react";
import style from "./Banner.module.css";
import Header from "../../Component/Header/Header";
import DataGridDemo from "../../Component/DataGrid/DataGrid";
import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import { DeleteBanner, addBanner, getAllBanner } from "../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

function Banner() {
  const [bannerImg, setBannerImg] = useState([]);
  const [allBanner, setAllBanner] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));

  const handleAddBanner = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("setFor", category);
    for (let i = 0; i < bannerImg.length; i++) {
      formData.append("bannerImg", bannerImg[i]);
    }

    try {
      const response = await addBanner(formData);
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Add successfully");
        handleGetAllBanner();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllBanner();
  }, []);

  const handleGetAllBanner = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBanner();
      console.log(response.data, "response");
      setAllBanner(response.data);
    } catch (error) {
      console.error("Error getting products:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBanner = async (id) => {
    setIsLoading(true);
    try {
      const response = await DeleteBanner(id);
      console.log(response.data, "response");
      alert("Delete successfully");
      handleGetAllBanner();
    } catch (error) {
      console.error("Error deleting banner:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <Header />
        <br />
        <div></div>
        <div className={style.infobox}>
          <h1>Add Banner</h1>
          <br />
          <div className={style.imgbox}>
            {bannerImg.length > 0 ? (
              <img src={URL.createObjectURL(bannerImg[0])} alt="img" />
            ) : (
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzSOrIHIncvVwcn86Yj1lG2no3rymRPhF1AQ&usqp=CAU"
                }
                alt="img"
              />
            )}
          </div>
          <br />
          <div className={style.Bannerbtn}>
            <input
              type="file"
              multiple
              onChange={(e) => setBannerImg(e.target.files)}
              accept="image/*"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={style.categorySelect}
            >
              <option value="">Select Category</option>
              <option value="Desktop">Desktop</option>
              <option value="Phone">Phone</option>
              <option value="None">None</option>
            </select>
            <button onClick={handleAddBanner}>Add Banner</button>
          </div>

          <h1>All Banners</h1>
          <br />
          <div className={style.bannerContainer}>
            {allBanner.map((banner) => (
              <div className={style.bannerImgBox} key={banner._id}>
                <p
                  className={style.DeleteBanner}
                  onClick={() => handleDeleteBanner(banner._id)}
                >
                  <DeleteIcon style={{ fontSize: 15 }} />
                </p>
                <img src={banner.bannerImg.url} alt=" " />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
