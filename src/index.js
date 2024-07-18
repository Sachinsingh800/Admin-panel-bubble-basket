import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Product from './Pages/Product/Product';
import {RecoilRoot} from  "recoil"
import LoginForm from './Component/Form/LoginForm';
import OptionBar from './Component/OptionBar/OptionBar';
import DashBoard from './Pages/DashBoard/DashBoard';
import Orders from './Pages/Orders/Orders';
import Payment from './Pages/Payment/Payment';
import Customers from './Pages/Customers/Customers';
import Sales from './Pages/Sales/Sales';
import PeopleOnline from './Pages/PeopleOnline/PeopleOnline';
import UpdateProduct from './Pages/UpdateProduct/UpdateProduct';
import CreateProduct from './Pages/CreateProduct/CreateProduct';
import Pincode from './Pages/Pincode/Pincode';
import TimeSlot from './Pages/TimeSlot/TimeSlot';
import Banner from './Pages/Banner/Banner';
import AddCategory from './Pages/AddCategory/AddCategory';
import { AddSubCategoryButton } from './Component/CreateButton/CreateButton';
import AddSubCategory from './Pages/AddSubCategory/AddSubCategory';
import Invoice from './Component/Invoice/Invoice';
import Access from './Pages/Access/Access';
import UpdateProfile from './Component/UpdateProfile/UpdateProfile';
import RegisterPage from './Component/RegisterPage/RegisterPage';
import AddShpping from './Pages/AddShpping/AddShipping';
import AddShipping from './Pages/AddShpping/AddShipping';
import Review from './Pages/Review/Review';
import Approval from './Pages/Approval/Approval';
import AddTax from './Pages/AddTax/AddTax';
import AddCoupon from './Pages/AddCoupon/AddCoupon';
import Blog from './Pages/Blog/Blog';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import FullBlog from './Pages/FullBlog/FullBlog';
import UpdateBlog from './Pages/UpdateBlog/UpdateBlog';
import OrderDetails from './Pages/OrderDetails/OrderDetails';




const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/DashBoard",
    element: <App/>,
  },
  {
    path: "/Product",
    element: <Product/>,
  },
  {
    path: "/*",
    element: <LoginForm/>,
  },
  {
    path: "/OptionBar",
    element: <OptionBar/>,
  },
  {
    path: "/Orders",
    element: <Orders />,
  },
  {
    path: "/Payment",
    element: <Payment />,
  },
  {
    path: "/AddShipping",
    element: <AddShipping />,
  },
  {
    path: "/Sales",
    element: <Sales />,
  },
  {
    path: "/PeopleOnline",
    element: <PeopleOnline />,
  },
  {
    path: "/UpdateProduct/:id", // Corrected path with parameter
    element: <UpdateProduct />,
  },
  {
    path: "/Approval/:id", // Corrected path with parameter
    element: <Approval />,
  },
  {
    path: "/CreateProduct", // Corrected path with parameter
    element: <CreateProduct />,
  },
  {
    path: "/Pincode", // Corrected path with parameter
    element: <Pincode />,
  },
  {
    path: "/TimeSlot", // Corrected path with parameter
    element: <TimeSlot />,
  },
  {
    path: "/Banner", // Corrected path with parameter
    element: <Banner />,
  },
  {
    path: "/AddCategory", // Corrected path with parameter
    element: <AddCategory />,
  },
  {
    path: "/AddSubCategory", // Corrected path with parameter
    element: <AddSubCategory />,
  },
  {
    path: "/Invoice/:id", // Corrected path with parameter
    element: <Invoice />,
  },
  {
    path: "/Access", // Corrected path with parameter
    element: <Access />,
  },
  {
    path: "/Profile", // Corrected path with parameter
    element: <UpdateProfile />,
  },
  {
    path: "/RegisterPage", // Corrected path with parameter
    element: <RegisterPage/>,
  },
  {
    path: "/Review", // Corrected path with parameter
    element: <Review/>,
  },
  {
    path: "/AddTax", // Corrected path with parameter
    element: <AddTax />,
  },
  {
    path: "/AddCoupon", // Corrected path with parameter
    element: <AddCoupon />,
  },
  {
    path: "/Blog", // Corrected path with parameter
    element: <Blog />,
  },
  {
    path: "/CreateBlog", // Corrected path with parameter
    element: <CreateBlog />,
  },
  {
    path: "/FullBlog/:id", // Corrected path with parameter
    element: <FullBlog />,
  },
  {
    path: "/UpdateBlog/:id", // Corrected path with parameter
    element: <UpdateBlog />,
  },
  {
    path: "/OrderDetails/:id", // Corrected path with parameter
    element: <OrderDetails />,
  },
]);
root.render(
  <RecoilRoot>
  <RouterProvider router={router} />
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
