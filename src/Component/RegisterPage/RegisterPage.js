import React, { useState } from "react";
import axios from "axios";
import style from "./RegisterPage.module.css";
import logo from "../Images/logo.jpg";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://wine-rnlq.onrender.com/admin/auth/register",
        formData
      );
      setSuccessMessage("Registration successful!");
      console.log(response.data); // You may handle the response data accordingly
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        setErrorMessage(response.data.message || "Registration failed!");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className={style.main}>
      {loading && <LoadingScreen />}
      <div className={style.head}>
        <img src={logo} alt="logo" />
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Register</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default RegisterPage;
