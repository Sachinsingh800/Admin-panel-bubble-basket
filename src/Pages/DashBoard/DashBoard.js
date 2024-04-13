import React, { useEffect } from 'react'
import BasicCard from '../../Component/Card/Card'
import DataGridDemo from '../../Component/DataGrid/DataGrid'
import style from "./DashBoard.module.css"
import { FaShoppingCart} from 'react-icons/fa';

import Header from '../../Component/Header/Header';
import Combining from '../../Component/Chart/Chart';
import PieArcLabel from '../../Component/Chart/Chart2';
import NavBar from '../../Component/NavBar/NavBar';
import OptionBar from '../../Component/OptionBar/OptionBar';
import { useRecoilState } from 'recoil';
import { loadingStatus } from '../../Recoil';
import LoadingScreen from '../../Component/LoadingScreen/LoadingScreen';
import OrderTable from '../../Component/OrderTable/OrderTable';
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,CategoryScale ,LinearScale,PointElement,LineElement} from "chart.js";
import { Doughnut,Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement);

function DashBoard() {
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  // Sample sales data
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [100, 600, 200, 800, 500, 100], // Example sales data for each month
        fill: true,
        borderColor: "#5ba6a2", // Line color
        tension: 0.4 // Smoothing of the line
      }
    ]
  };

  return (
    <div className={style.main}>
         {isLoading && <LoadingScreen />}
    <NavBar/>
      <OptionBar/>
      
      <div className={style.body}>
      <Header/>
      <BasicCard/>
      <div className={style.chart}>
      <Line data={salesData} />
        {/* <PieArcLabel/> */}
        </div>
 
      <br/>
      <h2 className={style.h2}><FaShoppingCart/>Latest Orders</h2>
      <OrderTable />
      </div>
    </div>
  )
}

export default DashBoard
