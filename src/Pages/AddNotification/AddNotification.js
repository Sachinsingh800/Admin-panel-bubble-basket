import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./AddNotification.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {  AddNotificationButton, UpdateCategory } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";
import styles from "./AddNotification.module.css"
import { addNotification } from "../../Api/Api";


function AddNotification() {
    const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
  
    const handleCreateClick = async () => {
      setIsLoading(true);
  
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", description);
  
        const response = await addNotification(formData);
        const { status, message } = response;
        if (status) {
          console.log(message);
          alert("Notification created successfully");
          setDescription("")
          setTitle("")
        } else {
          console.error(message);
          setIsLoading(false);
          alert("Error: " + message);
        }
      } catch (error) {
        console.error("Error creating category:", error.message);
        setIsLoading(false);
        alert("Error: " + error.message);
      } finally {
        // window.location.reload();
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
        <div className={style.header}>
          <h2>Send Notification</h2>
        </div>
        <div className={style.container}>
              <label>
                title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <div className={styles.text_area}>
                <label>Description:</label>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <br />
              <button className={styles.btn} onClick={handleCreateClick}>
                {isLoading ? "Create..." : "Create"}
              </button>
            </div>
      </div>
    </div>
  );
}

export default AddNotification;

