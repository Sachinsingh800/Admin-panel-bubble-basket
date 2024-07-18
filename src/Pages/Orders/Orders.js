import React, { useEffect, useState } from 'react';
import style from "./Orders.module.css";
import Header from '../../Component/Header/Header';
import NavBar from '../../Component/NavBar/NavBar';
import OptionBar from '../../Component/OptionBar/OptionBar';
import OrderTable from '../../Component/OrderTable/OrderTable';
import LoadingScreen from '../../Component/LoadingScreen/LoadingScreen';
import { useRecoilState } from 'recoil';
import { applyFilter, filterOrder, loadingStatus } from '../../Recoil';
import { AiOutlineCloudUpload} from 'react-icons/ai';
import axios from 'axios';
import { saveAs } from 'file-saver';

function Orders() {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [filterDate, setFilterDate] = useRecoilState(filterOrder);
  const [filter, setFilter] = useRecoilState(applyFilter);

  const authToken = JSON.parse(localStorage.getItem("token"));

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  // Function to format date as "DD-MM-YYYY"
  const formatDate = (inputDate) => {
    const dateParts = inputDate.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  // Handler for date change
  const handleDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setFilterDate(formattedDate); // Update filterDate state with formatted date
  };

  const handleFilterData =()=>{
    setFilter(!filter);
    
  }

  const downloadExcel = async () => {
    setIsLoading(true)
    const authToken = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      'Content-Type': 'application/json', // Corrected content type to JSON
    };
    try {
      const response = await axios.get(`https://www.backend.luxurybubblebasket.com/admin/order/excel`,{
        responseType: 'blob',
        headers: headers // Corrected placement of headers
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'orders.xlsx'); // Trigger file download with FileSaver.js
    } catch (error) {
      console.error(error.message);
    }finally{
      setIsLoading(false)
    }
};


  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <Header />
        <br />
        <div>
          <div className={style.header}>
            <div>
              <button onClick={downloadExcel}><AiOutlineCloudUpload />Export</button>
            </div>
          </div>
          <br/>
        </div>
        <div className={style.infobox}>
          <OrderTable />
        </div>
      </div>
    </div>
  );
}

export default Orders;
