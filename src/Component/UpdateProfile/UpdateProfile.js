import React, { useEffect, useState } from "react";
import styles from "./UpdateProfile.module.css";
import { useNavigate } from "react-router-dom";
import { UpdateAdminProfile, loginAdmin } from "../../Api/Api";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from "axios";
import logo from "../Images/logo.jpg";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);

  const navigate = useNavigate();
  const authToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    handleAdminProfile();
  }, []);

  const handleAdminProfile = async () => {
    setLoading(true);
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "application/json", // Set content type to JSON
    };
    try {
      const response = await axios.get(
        `https://www.backend.luxurybubblebasket.com/admin/auth/profile`,
        { headers }
      );
      const { name, email, password } = response?.data?.data;
      setName(name);
      setEmail(email);
      setPassword(password);
      setAdminProfile(response?.data?.data);
    } catch (error) {
      console.error("Error getting admin profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await UpdateAdminProfile(name, email, password);
      // Update the profile information
      setAdminProfile(response.data.data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setLoading(false);
      setIsEditMode(false);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  };

  return (
    <div className={styles.main}>
      {loading && <LoadingScreen />}
      <div className={styles.head}>
        <img src={logo} alt="logo" />
      </div>
      <br />
      {adminProfile && (
        <form className={styles.loginForm}>
          <h1 className={styles.heading}>Admin Profile</h1>
          <div className={styles.container}>
            <label htmlFor="name">
              <strong>Name:</strong>{" "}
            </label>
            {isEditMode ? (
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{adminProfile.name}</p>
            )}
          </div>
          <div className={styles.container}>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            {isEditMode ? (
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p>{adminProfile.email}</p>
            )}
          </div>
          <div className={styles.container}>
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            {isEditMode && (
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <div>
            {isEditMode ? (
              <button
                type="submit"
                className={styles.loginButton}
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            ) : (
              <button onClick={handleEditClick} className={styles.loginButton}>
                Edit Profile
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
