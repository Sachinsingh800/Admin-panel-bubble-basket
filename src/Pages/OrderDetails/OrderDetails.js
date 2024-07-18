import React, { useEffect, useState } from "react";
import style from "./OrderDetails.module.css";
import OderCard from "./OderCard";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import Header from "../../Component/Header/Header";

function OrderDetails() {
  return (
    <div className={style.main}>
    <NavBar/>
    <OptionBar/>
    <div className={style.body}>
    <Header/>
    <br/>
    <div>
    <br/>
    </div>
    <div className={style.infobox}>
       <OderCard />
    </div>
    </div>
  </div>
  );
}

export default OrderDetails;
