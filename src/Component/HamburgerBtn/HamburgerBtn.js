import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import style from './HamburgerBtn.module.css';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RedeemIcon from "@mui/icons-material/Redeem";
import NewspaperIcon from "@mui/icons-material/Newspaper";

import {
  MdDashboard,
  MdPeople,
  MdWork,
  MdLibraryBooks,
  MdExitToApp,
} from "react-icons/md";

import {Link} from "react-router-dom"

import { useNavigate } from 'react-router-dom';


export default function HamburgerBtn() {
  const navigate=useNavigate()

  const handleRemoveData=()=>{
    localStorage.clear()
    navigate("/")
  }
  const handleListItemClick = (text) => {
    localStorage.setItem('PageName', JSON.stringify(text));
  
  };

  const [state, setState] = React.useState({
    left: false,
  });



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      <List
        className={style.opt}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background:"linear-gradient(170deg, rgba(12,5,71,1) 0%, rgba(2,21,88,1) 47%, rgba(27,41,163,1) 100%)",
        }}
      >
       
        <h1>
          Menu
          <button className={style.closeButton} onClick={toggleDrawer(anchor, false)}>
          <RxCross2 />
          </button>
        </h1>
        <div className={style.sideBox}>
        <ul className={style.option}>
   
        <Link className={style.link} to={"/DashBoard"}>
            {" "}
            <li onClick={() => handleListItemClick("DashBoard")}>
              <DashboardIcon />
              DashBoard
            </li>
          </Link>
          <Link className={style.link} to={"/Product"}>
            <li onClick={() => handleListItemClick("Product")}>
              <ProductionQuantityLimitsIcon /> Product
            </li>
          </Link>
          <Link className={style.link} to={"/Orders"}>
            {" "}
            <li onClick={() => handleListItemClick("Orders")}>
              <BorderAllIcon />
              Orders
            </li>
          </Link>
          <Link className={style.link} to={"/AddShipping"}>
            <li onClick={() => handleListItemClick("Shpping")}>
              <LocalShippingIcon />
              Shpping
            </li>
          </Link>
          <Link className={style.link} to={"/Banner"}>
            <li onClick={() => handleListItemClick("Banner")}>
              <ViewCarouselIcon />
              Banner
            </li>
          </Link>
          <Link className={style.link} to={"/AddCategory"}>
            <li onClick={() => handleListItemClick("Category")}>
              <CategoryIcon />
              Add Category
            </li>
          </Link>
          <Link className={style.link} to={"/Review"}>
            <li onClick={() => handleListItemClick("Review")}>
              <ReviewsIcon />
              Review
            </li>
          </Link>
          <Link className={style.link} to={"/AddTax"}>
            <li onClick={() => handleListItemClick("Tax")}>
              <AttachMoneyIcon />
              Tax
            </li>
          </Link>
          <Link className={style.link} to={"/AddCoupon"}>
            <li onClick={() => handleListItemClick("Coupon")}>
              <RedeemIcon />
              Coupon
            </li>
          </Link>
          <Link className={style.link} to={"/Blog"}>
            <li onClick={() => handleListItemClick("Blog")}>
              <NewspaperIcon />
              Blog
            </li>
          </Link> 


     <li onClick={handleRemoveData}>
       <MdExitToApp />
       Log out
     </li>
   </ul>
        </div>
   
       
   
      </List>
    </Box>
  );

  return (
    <div className={style.main}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} style={{color:"white",fontSize:"20px"}}><GiHamburgerMenu className={style.icon_btn}/></Button>

          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
