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

  const handleImageInsert = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "your_image_upload_api_url",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = response.data.url;

        const quill = ReactQuillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
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
      const response = await axios.post("your_api_url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // Handle successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageInsert,
      },
    },
  };

  return (
    <div className={style.main}>
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <Header />
        <br />

        <div className={style.infobox}>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="authorName">Author Name:</label>
                <input
                  type="text"
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="authorTitle">Author Title:</label>
                <input
                  type="text"
                  id="authorTitle"
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="authorTitle">Author Image:</label>
                <input
                  type="file"
                  multiple
                  onChange={handleAuthorImageChange}
                  accept="image/*"
                />
              </div>
              <div>
                <label htmlFor="authorTitle">Poster Image:</label>
                <input
                  type="file"
                  multiple
                  onChange={handlePosterImageChange}
                  accept="image/*"
                />
              </div>
              <div>
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
                    <Editor placeholder={'Write something...'} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
