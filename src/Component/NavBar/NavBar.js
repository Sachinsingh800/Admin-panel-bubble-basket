import React from 'react'
import style from "./NavBar.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HamburgerBtn from '../HamburgerBtn/HamburgerBtn';
import logo from "../Images/logo.jpg"

function NavBar() {
    const navigate=useNavigate()
    const userData= JSON.parse(localStorage.getItem("userData"))

  return (
      <div className={style.header}>
        <div className={style.hamburgerBtn}>
        <HamburgerBtn/>
        </div>
      
        <div className={style.title}>
              <img src={logo} alt='logo' />
          </div>
        <div>
          <h4 className={style.icon}><AccountCircleIcon/>{userData?.email}</h4>

        </div>
       </div> 
  )
}

export default NavBar
