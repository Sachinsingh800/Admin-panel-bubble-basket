import React from "react";
import style from "./OptionBar.module.css";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleIcon from "@mui/icons-material/People";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import CategoryIcon from "@mui/icons-material/Category";
import KeyIcon from "@mui/icons-material/Key";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RedeemIcon from "@mui/icons-material/Redeem";
import NewspaperIcon from "@mui/icons-material/Newspaper";

function OptionBar() {
  const handleListItemClick = (text) => {
    localStorage.setItem("PageName", JSON.stringify(text));
  };

  return (
    <div className={style.main}>
      <div className={style.leftBar}>
        <ul>
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
        </ul>
      </div>
    </div>
  );
}

export default OptionBar;
