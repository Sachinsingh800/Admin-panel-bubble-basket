import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../Api/Api";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from 'axios';
import logo from "../Images/logo.jpg";
import { TextField, Button, IconButton, InputAdornment, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await loginAdmin(email, password);
      // Handle successful login
      navigate("/dashboard"); // Redirect to another page (example: dashboard)
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
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email">Username</InputLabel>
          <TextField
            id="email"
            type="text"
            value={email}
            onChange={handleUsernameChange}
            variant="outlined"
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordToggle}
                    edge="end"
                    className={styles.icon}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          className={styles.loginButton}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
