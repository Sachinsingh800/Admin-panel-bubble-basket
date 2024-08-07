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
  const [metatitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const ReactQuillRef = useRef(null); // Initialize with null
  const [authorImage, setAuthorImage] = useState([]);
  const [posterImage, setPosterImage] = useState([]);
  const [blogImage, setBlogImage] = useState([]);
  const [description, setDescription] = useRecoilState(blogDescription);
  const [authorDescription, setAuthorDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
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
    setIsLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("Meta_Title", metatitle);
    formData.append("Meta_Description", metaDescription);
    formData.append("authorTitle", authorTitle);
    formData.append("description", description);
    formData.append("blogTitle", blogTitle);
    formData.append("shortDescription", shortDescription);
    formData.append("authorDescription", authorDescription);
    formData.append("isPublic", true);
    authorImage.forEach((img) => {
      formData.append(`authorImage`, img);
    });
    posterImage.forEach((img) => {
      formData.append(`posterImage`, img);
    });
    blogImage.forEach((img) => {
      formData.append(`blogImage`, img);
    });

    try {
      const headers = {
        "x-admin-token": authToken,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(
        "https://www.backend.luxurybubblebasket.com/admin/blog/create",
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
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        if (response?.status === 413) {
          alert("Request Entity Too Large: The data you're trying to upload is too large.");
        } else {
          const errorMessage = response?.data?.message || "Failed to create blog. Please try again.";
          alert(errorMessage);
        }
      } else {
        // Network error (e.g., no internet connection)
        alert("Something went wrong");
      }
    } finally {
      setIsLoading(false); // Set loading state to false
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
              <label htmlFor="MetaTitle">Meta Title:</label>
              <input
                type="text"
                id="MetaTitle"
                value={metatitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                required
              />
            </div>
            <div className={style.input_box}>
              <label htmlFor="MetaDescription">Meta Description:</label>
              <input
                type="text"
                id="MetaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
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

              <button className={style.btn} type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
