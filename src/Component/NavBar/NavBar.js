import React from 'react';
import style from "./NavBar.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HamburgerBtn from '../HamburgerBtn/HamburgerBtn';
import logo from "../Images/logo.jpg";
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className={style.header}>
            <div className={style.hamburgerBtn}>
                <HamburgerBtn />
            </div>
            <div className={style.title}>
                <img src={logo} alt='logo' />
            </div>
            <div className={style.rightSection}>
                <Typography variant="h6" className={style.icon}>
                    <AccountCircleIcon /> {userData?.email}
                </Typography>
                <IconButton onClick={handleLogout} className={style.logoutButton}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default NavBar;
