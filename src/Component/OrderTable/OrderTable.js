import React, { useState, useEffect } from 'react';
import styles from './OrderTable.module.css'; // Import module-level CSS
import { getParticularOrders } from '../../Api/Api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterOrder, loadingStatus, applyFilter } from '../../Recoil';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const OrderTable = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useRecoilState(filterOrder);
  const applyFilters = useRecoilValue(applyFilter);
  const authToken = JSON.parse(localStorage.getItem("token"));

  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'orderDate', headerName: 'Order Date', width: 150 },
    { field: 'totalItems', headerName: 'Total Items', width: 150 },
    { field: 'totalPrice', headerName: 'Total Price', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'townCity', headerName: 'Town/City', width: 150 },
    { field: 'stateCounty', headerName: 'State/County', width: 150 },
    { field: 'postcodeZIP', headerName: 'Postcode/ZIP', width: 150 },
    { field: 'orderNotes', headerName: 'Order Notes', width: 150 },
    { field: 'trackingStatus', headerName: 'Tracking Status', width: 150 },
    { field: 'trackingDate', headerName: 'Tracking Date', width: 150 },
    {
      field: "_id",
      headerName: "INVOICE",
      width: 150,
      renderCell: (params) => (
        <p
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => handleParticularData(params.id)}
      >
        View Invoice
      </p>
      ),
    },
  ];



  useEffect(() => {
    getAlldata();
  }, [filterDate, applyFilters]);

  const getAlldata = async () => {
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "application/json", // Set content type to JSON
    };
    setIsLoading(true);
    try {
      let apiUrl = 'https://www.backend.luxurybubblebasket.com/admin/order/dateWiseOrder';
      if (applyFilters) {
        apiUrl += `?date=${filterDate}`;
      }
      const response = await axios.get(apiUrl, { headers });
      setOrders(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response.data.message;
        alert(errorMessage);
      } else {
        // Network error (e.g., no internet connection)
        alert("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleParticularData = async (id) => {
    setIsLoading(true);
    try {
      await getParticularOrders(id);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <div className={styles.orderTable}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orders.map((order) => ({
            id: order._id,
            orderId: order.orderId,
            orderDate: new Date(order.orderDate).toLocaleDateString(),
            totalItems: order.totalItems,
            totalPrice: order.totalPrice,
            firstName: order.shippingInfo.firstName,
            lastName: order.shippingInfo.lastName,
            email: order.shippingInfo.email,
            phone: order.shippingInfo.phone,
            country: order.shippingInfo.country,
            townCity: order.shippingInfo.townCity,
            stateCounty: order.shippingInfo.stateCounty,
            postcodeZIP: order.shippingInfo.postcodeZIP,
            orderNotes: order.shippingInfo.orderNotes,
            trackingStatus: order.trackingDetails.trackingStatus,
            trackingDate: new Date(order.trackingDetails.trackingDate).toLocaleDateString(),
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default OrderTable;
