import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import style from "./Card.module.css"
import { AiOutlineShoppingCart} from 'react-icons/ai';
import { BsFillCreditCardFill} from 'react-icons/bs';
import { BsFillPeopleFill} from 'react-icons/bs';
import { BsFillPersonLinesFill} from 'react-icons/bs';
import axios from 'axios';


import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loadingStatus } from '../../Recoil';



export default function BasicCard(props) {

  const authToken = JSON.parse(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);

function handlePageName(text){
  localStorage.setItem("PageName",JSON.stringify(text))
}

React.useEffect(()=>{
  getAlldata()
  getAllProduct()
},[])

const getAlldata = async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    "Content-Type": "application/json", // Set content type to JSON
  };
  setIsLoading(true);
  try {
    const response = await axios.get("https://www.backend.luxurybubblebasket.com/admin/order/dateWiseOrder",{headers});
    setOrders(response?.data?.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (HTTP error)
      const { response } = error;
      // Set the error message
      const errorMessage = response.data.message

         alert(errorMessage)
      // Log the error message as a string
    } else {
      // Network error (e.g., no internet connection)
      alert("Something went wrong");
    }
  } finally {
    setIsLoading(false);
  }
};

const getAllProduct = async () => {
  setIsLoading(true);
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    "Content-Type": "application/json", // Set content type to JSON
  };
  try {
    const response = await axios.get("https://www.backend.luxurybubblebasket.com/admin/product/getAll",{headers});
    setProducts(response?.data?.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (HTTP error)
      const { response } = error;
      // Set the error message
      const errorMessage = response.data.message

         alert(errorMessage)
      // Log the error message as a string
    } else {
      // Network error (e.g., no internet connection)
      alert("Something went wrong");
    }
  }finally{
    setIsLoading(false);
  }
};



  return (
    <div className={style.container}>
    <Card className={style.card} sx={{ height: 120 ,width:230,backgroundColor:"none",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"left" }}>
      <CardContent >
   <Link className={style.link} to={"/Orders"}>    
   <div className={style.contain}  onClick={()=>handlePageName("Total Orders")}>
      <h1 ><AiOutlineShoppingCart/></h1>  
        <div>
        <h5>{orders?.length}</h5>
        <h5 className={style.para}>Total Orders</h5>
        </div>
        </div>
   
        </Link>  
      </CardContent>
    </Card>
    <Card className={style.card}  sx={{ height: 120 ,width:230,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"left" }}>
      <CardContent>
      <Link className={style.link}  to={"/Sales"}>    
    <div className={style.contain}  onClick={()=>handlePageName("Total Sales")}>
      <h1><BsFillCreditCardFill /></h1>  
        <div>
        <h5>244</h5>
        <h5 className={style.para}>Total Sales</h5>
        </div>
        </div>
   </Link>
    
      </CardContent>
    </Card>
    <Card className={style.card}  sx={{ height: 120 ,width:230,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"left" }}>
      <CardContent>
      <Link className={style.link}  to={"/Customers"}>    
      <div className={style.contain} onClick={()=>handlePageName("Total Customers")}>
      <h1><BsFillPeopleFill/></h1>  
        <div>
        <h5>244</h5>
        <h5 className={style.para}>Total Customer</h5>
        </div>
        </div>
        </Link>
      </CardContent>
    </Card>
    <Card className={style.card}  sx={{ height: 120 ,width:230,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"left" }}>
      <CardContent>
      <Link className={style.link}  to={"/Product"}>    
      <div className={style.contain}  onClick={()=>handlePageName("Total Product")}>
      <h1><BsFillPersonLinesFill/></h1>  
        <div>
        <h5>{products?.length}</h5>
        <h5 className={style.para}>Total Product</h5>
        </div>
        </div>
        </Link>
      </CardContent>
    </Card>
 
    
    </div>
  );
}
