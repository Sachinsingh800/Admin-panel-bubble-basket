import React from 'react'
import style from "./OptionBar.module.css"
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from '@mui/icons-material/People';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CategoryIcon from '@mui/icons-material/Category';
import KeyIcon from '@mui/icons-material/Key';

function OptionBar() {
  const handleListItemClick = (text) => {
    localStorage.setItem('PageName', JSON.stringify(text));
  
  };

  return (
    <div className={style.main}>
  

      <div className={style.leftBar}>
      <ul>
        <Link className={style.link} to={"/DashBoard"}> <li onClick={()=>handleListItemClick("DashBoard")}><DashboardIcon/>DashBoard</li></Link>   
        <Link  className={style.link}  to={"/Product"}><li onClick={()=>handleListItemClick("Product")}><ProductionQuantityLimitsIcon /> Product</li></Link>  
        <Link  className={style.link}  to={"/Orders"}> <li onClick={()=>handleListItemClick("Orders")}><BorderAllIcon  />Orders</li></Link>  
        {/* <Link  className={style.link}  to={"/Payment"}><li onClick={()=>handleListItemClick("Payments")}><PaymentIcon  />Payments</li></Link>    */}
        {/* <Link  className={style.link}  to={"/Sales"}><li onClick={()=>handleListItemClick("Sales")}><MonetizationOnIcon />Sales</li></Link>    */}
        <Link  className={style.link}  to={"/AddShipping"}><li onClick={()=>handleListItemClick("Shpping")}><AccountBoxIcon  />Shpping</li></Link>   
        {/* <Link  className={style.link}  to={"/PeopleOnline"}><li onClick={()=>handleListItemClick("People Online")}><PeopleIcon  />People Online</li></Link>    */}
        {/* <Link  className={style.link}  to={"/Pincode"}><li onClick={()=>handleListItemClick("Pincode")}><FmdGoodIcon  />Pincode</li></Link>    */}
        {/* <Link  className={style.link}  to={"/TimeSlot"}><li onClick={()=>handleListItemClick("TimeSlot")}><MoreTimeIcon />TimeSlot</li></Link>    */}
        <Link  className={style.link}  to={"/Banner"}><li onClick={()=>handleListItemClick("Banner")}><AdsClickIcon />Banner</li></Link>   
        <Link  className={style.link}  to={"/AddCategory"}><li onClick={()=>handleListItemClick("Category")}><CategoryIcon />Add Category</li></Link>   
        {/* <Link  className={style.link}  to={"/AddSubCategory"}><li onClick={()=>handleListItemClick("Sub Category")}><CategoryIcon />Sub Category</li></Link>    */}
        {/* <Link  className={style.link}  to={"/Access"}><li onClick={()=>handleListItemClick("Access")}><KeyIcon />Access</li></Link>    */}
        <Link  className={style.link}  to={"/Review"}><li onClick={()=>handleListItemClick("Review")}><KeyIcon />Review</li></Link>   
        <Link  className={style.link}  to={"/AddTax"}><li onClick={()=>handleListItemClick("Tax")}><KeyIcon />Tax</li></Link>   
        <Link  className={style.link}  to={"/AddCoupon"}><li onClick={()=>handleListItemClick("Coupon")}><KeyIcon />Coupon</li></Link>   
       </ul>
      </div>
    </div>
  )
}

export default OptionBar

