import React, { useState, useRef } from "react";
import style from "./Blog.module.css";
import Header from "../../Component/Header/Header";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Editor from './EditorWithUseQuill';
import { useRecoilState } from "recoil";
import { blogDescription } from "../../Recoil";

function Blog() {
  const [authorName, setAuthorName] = useState("");
  const [authorTitle, setAuthorTitle] = useState("");
  const ReactQuillRef = useRef(null); // Initialize with null
  const [authorImage, setAuthorImage] = useState([]);
  const [posterImage, setPosterImage] = useState([]);
  const [blogImage, setBlogImage] = useState([]);
  const [description, setDescription] = useRecoilState(blogDescription);
  const authToken = JSON.parse(localStorage.getItem("token"));


  const handleAuthorImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAuthorImage(files);
  };

  const handleBlogImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPosterImage(files);
  };

  const handlePosterImageChange = (e) => {
    const files = Array.from(e.target.files);
    setBlogImage(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("authorTitle", authorTitle);
    formData.append("description", description);
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
            "x-admin-token": authToken, // Ensure authToken is defined
            'Content-Type': 'multipart/form-data',// Set content type to JSON
          };
      const response = await axios.post("https://wine-rnlq.onrender.com/admin/blog/create", formData, {headers},
      );
      console.log(response.data.status);
      if (response.data.status){
        alert("Blog Created Successfull")
        setAuthorName("");
        setAuthorTitle("");
        setDescription("");
        setAuthorImage([])
        setPosterImage([])
        setBlogImage([])
      }
      // Handle successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error
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
   
            <form onSubmit={handleSubmit} className={style.form}>
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
                <label htmlFor="authorTitle">Author Image:</label>
                <input
                  type="file"
                  multiple
                  onChange={handleAuthorImageChange}
                  accept="image/*"
                />
              </div>
              <div className={style.input_box}>
                <label htmlFor="authorTitle">Poster Image:</label>
                <input
                  type="file"
                  multiple
                  onChange={handlePosterImageChange}
                  accept="image/*"
                />
              </div>
              <div className={style.input_box}>
                <label htmlFor="authorTitle">Blog Image:</label>
                <input
                  type="file"
                  multiple
                  onChange={handleBlogImageChange}
                  accept="image/*"
                />
              </div>
              <div>
                <label>Description:</label>
                <br/>
                <br/>
                <Editor placeholder={'Write something...'} />
              </div>
              <button className={style.btn} type="submit">Submit</button>
            </form>
    
        </div>
      </div>
    </div>
  );
}

export default Blog;
