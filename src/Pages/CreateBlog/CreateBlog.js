import React, { useState, useRef } from "react";
import style from "./CreateBlog.module.css";
import Header from "../../Component/Header/Header";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Editor from "./EditorWithUseQuill";
import { useRecoilState } from "recoil";
import { blogDescription } from "../../Recoil";
import PreviewBlog from "../PreviewBlog/PreviewBlog";

function CreateBlog() {
  const [authorName, setAuthorName] = useState("");
  const [authorTitle, setAuthorTitle] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const ReactQuillRef = useRef(null); // Initialize with null
  const [authorImage, setAuthorImage] = useState([]);
  const [posterImage, setPosterImage] = useState([]);
  const [blogImage, setBlogImage] = useState([]);
  const [description, setDescription] = useRecoilState(blogDescription);
  const [authorDescription, setAuthorDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const authToken = JSON.parse(localStorage.getItem("token"));

  const handleAuthorImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAuthorImage(files);
  };

  const handleBlogImageChange = (e) => {
    const files = Array.from(e.target.files);
    setBlogImage(files);
  };

  const handlePosterImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPosterImage(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("authorTitle", authorTitle);
    formData.append("description", description);
    formData.append("blogTitle", blogTitle);
    formData.append("shortDescription", shortDescription);
    formData.append("authorDescription", authorDescription);
    formData.append("isPublic", true);
    authorImage.forEach((img, index) => {
      formData.append(`authorImage`, img);
    });
    posterImage.forEach((img, index) => {
      formData.append(`posterImage`, img);
    });
    blogImage.forEach((img, index) => {
      formData.append(`blogImage`, img);
    });

    try {
      const headers = {
        "x-admin-token": authToken,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(
        "https://bubblebasketbackendapp.onrender.com/admin/blog/create",
        formData,
        { headers }
      );
      console.log(response.data.status);
      if (response.data.status) {
        alert("Blog Created Successfully");
        setAuthorName("");
        setAuthorTitle("");
        setDescription("");
        setShortDescription("");
        setBlogTitle("");
        setAuthorDescription("");
        setAuthorImage([]);
        setPosterImage([]);
        setBlogImage([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.main}>
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <Header />
        <br />

        <div className={style.infobox}>
          <form onSubmit={(e)=>handleSubmit(e)} className={style.form}>
            <div className={style.input_box}>
              <label htmlFor="BlogTitle">Blog Title:</label>
              <input
                type="text"
                id="BlogTitle"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                required
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="ShortDescription">Short Description:</label>
              <textarea
                className={style.textarea}
                type="text"
                id="ShortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="BlogImage">Blog Image:</label>
              <input
                id="BlogImage"
                type="file"
                multiple
                onChange={handleBlogImageChange}
                accept="image/*"
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="authorName">Author Name:</label>
              <input
                type="text"
                id="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="authorTitle">Author Title:</label>
              <input
                type="text"
                id="authorTitle"
                value={authorTitle}
                onChange={(e) => setAuthorTitle(e.target.value)}
                required
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="authorDescription">Author Description:</label>
              <textarea
                className={style.textarea}
                type="text"
                id="authorDescription"
                value={authorDescription}
                onChange={(e) => setAuthorDescription(e.target.value)}
                required
              />
            </div>

            <div className={style.input_box}>
              <label htmlFor="AuthorImage">Author Image:</label>
              <input
                id="AuthorImage"
                type="file"
                multiple
                onChange={handleAuthorImageChange}
                accept="image/*"
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="PosterImage">Poster Image:</label>
              <input
                id="PosterImage"
                type="file"
                multiple
                onChange={handlePosterImageChange}
                accept="image/*"
              />
            </div>

            <div>
              <label>Description:</label>
              <br />
              <br />
              <Editor placeholder={"Write something..."} />
            </div>
            <div className={style.btn_box}>
              <PreviewBlog
                authorName={authorName}
                authorTitle={authorTitle}
                authorDescription={authorDescription}
                blogTitle={blogTitle}
                shortDescription={shortDescription}
                blogImage={blogImage}
                authorImage={authorImage}
                description={description}
              />

              <button className={style.btn} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
