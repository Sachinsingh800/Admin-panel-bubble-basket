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
    { field: 'deliverySlot', headerName: 'Delivery Slot', width: 150 },
    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'phoneNo', headerName: 'Phone No', width: 150 },
    { field: 'houseFlatNo', headerName: 'House Flat No', width: 150 },
    { field: 'blockName', headerName: 'Block Name', width: 150 },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'landMark', headerName: 'LandMark', width: 150 },
    { field: 'pinCode', headerName: 'PinCode', width: 150 },
    { field: 'locality', headerName: 'Locality', width: 150 },
    { field: 'shippingPrice', headerName: 'Shipping Price', width: 150 },
    { field: 'totalPrice', headerName: 'Total Price', width: 150 },
    { field: 'orderStatus', headerName: 'Order Status', width: 150 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    { field: 'productId', headerName: 'Product ID', width: 150 },
    { field: 'productTitle', headerName: 'Product Title', width: 150 },
    { field: 'productDescription', headerName: 'Product Description', width: 150 },
    { field: 'productPrice', headerName: 'Product Price', width: 150 },
    { field: 'productImage', headerName: 'Product Image', width: 150, renderCell: (params) => <img src={params.value} alt="Product" style={{ width: '100px' }} /> },
    { field: '_id', headerName: 'Actions', width: 150, renderCell: (params) => <p style={{ color: 'blue', cursor: 'pointer' }}     onClick={() => handleParticularData(params.row._id)}>View Invoice</p> },
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
      let apiUrl = 'https://zuluresh.onrender.com/admin/order/getAllOrders';
      if (applyFilters) {
        apiUrl += `?date=${filterDate}`;
      }
      const response = await axios.get(apiUrl,{headers});
      setOrders(response.data.data);
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

  const handleParticularData = async (id) => {
    setIsLoading(true);
    try {
      await getParticularOrders(id);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
      window.location.href = "/Invoice";
    }
  };

  return (
    <div className={styles.orderTable}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orders.map((order, index) => ({
            id: index + 1, // Ensure each row has a unique identifier
            orderId: order.orderId,
            deliverySlot: order.shippingInfo?.deliverySlot?.day,
            customerName: order.shippingInfo?.name,
            phoneNo: order.shippingInfo?.phoneNo,
            houseFlatNo: order.shippingInfo?.houseFlatNo,
            blockName: order.shippingInfo?.blockName,
            street: order.shippingInfo?.street,
            landMark: order.shippingInfo?.landMark,
            pinCode: order.shippingInfo?.pinCode,
            locality: order.shippingInfo?.locality,
            shippingPrice: order.shippingPrice,
            totalPrice: order.totalPrice,
            orderStatus: order.orderStatus,
            paymentMethod: order.paymentMethod.cod ? "COD" : "Online",
            productId: order.items[0]?.productId?._id,
            productTitle: order.items[0]?.productId?.title,
            productDescription: order.items[0]?.productId?.description,
            productPrice: order.items[0]?.productId?.price,
            productImage: order.items[0]?.productId?.productImg[0]?.url,
            _id:order._id
          }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default OrderTable;
