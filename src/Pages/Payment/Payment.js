import React from 'react'
import style from "./Payment.module.css"
import Header from '../../Component/Header/Header'
import { AiOutlineCloudUpload} from 'react-icons/ai';
import { AiOutlinePlus} from 'react-icons/ai';
import PaymentDataGridDemo from '../../Component/PaymentData/PaymentData'
import NavBar from '../../Component/NavBar/NavBar';
import OptionBar from '../../Component/OptionBar/OptionBar';

function Payment() {
  return (
    <div className={style.main}>
            <NavBar/>
      <OptionBar/>
      <div className={style.body}>
      <Header/>
      <br/>
      <div>
      <div className={style.header}>
        <div className={style.innerbox}>
          <div className={style.label}>
          <h6>From:</h6> 
          <input type='date' />
          </div>
       
          <div className={style.label}>
          <h6>To:</h6> 
          <input type='date' />
          </div>
        <button className={style.btn}>Clear</button>
        <button className={style.btn}>apply filter</button>
        </div>
        <div>
        <button><AiOutlineCloudUpload/>Export</button>
        <button style={{backgroundColor:"blue",color:"white"}}><AiOutlinePlus/>Create</button>
        </div>
      </div>
      <br/>
      </div>
      <div className={style.infobox}>
      <PaymentDataGridDemo/>
      </div>
      </div>
    </div>
  )
}

export default Payment
