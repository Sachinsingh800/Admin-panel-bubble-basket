import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../Api/Api";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from 'axios';
import  logo from "../Images/logo.jpg"

const LoginForm = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    window.location.href="/DashBoard"
    try {
      // const response = await loginAdmin(email, password);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response?.data?.message;
      
        // Log the error message as a string
        console.log("Error Message:", errorMessage);
      } else {
        // Network error (e.g., no internet connection)
        const errorMessage = error.message;
     
        console.log("Network Error:", errorMessage);
        alert("Something went wrong");
      }
        } finally {
      setUsername("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      {loading && <LoadingScreen />}
      <div className={styles.head}>
        <img src={logo} alt="logo" />
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Admin Login</h1>
        <div>
          <label htmlFor="username"><strong>Username:</strong></label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password"><strong>Password:</strong></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
