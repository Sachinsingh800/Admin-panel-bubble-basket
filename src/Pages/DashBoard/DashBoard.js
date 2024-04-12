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


function DashBoard() {
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);

  return (
    <div className={style.main}>
         {isLoading && <LoadingScreen />}
    <NavBar/>
      <OptionBar/>
      
      <div className={style.body}>
      <Header/>
      <BasicCard/>
      <div className={style.chart}>
      <Combining/>
        <PieArcLabel/>
        </div>
 
      <br/>
      <h2 className={style.h2}><FaShoppingCart/>Latest Orders</h2>
      <OrderTable />
      </div>
    </div>
  )
}

export default DashBoard
