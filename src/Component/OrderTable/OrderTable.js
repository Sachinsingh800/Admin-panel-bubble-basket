import React, { useState, useEffect } from 'react';
import styles from './OrderTable.module.css'; // Import module-level CSS
import { getAllOrders, getParticularOrders } from '../../Api/Api'; // API functions
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterOrder, loadingStatus, applyFilter } from '../../Recoil';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const OrderTable = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useRecoilState(filterOrder);
  const applyFilters = useRecoilValue(applyFilter);
  const [filter, setFilter] = useState({
    orderId: "",
    customer: "",
    orderStatus: "",
    total: "",
    dateAdded: null,
    dateModified: null,
    trackingNumber: "",
  });

  // Define table columns
  const columns = [
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "orderDate", headerName: "Order Date", width: 150 },
    { field: "totalItems", headerName: "Total Items", width: 150 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "townCity", headerName: "Town/City", width: 150 },
    { field: "stateCounty", headerName: "State/County", width: 150 },
    { field: "postcodeZIP", headerName: "Postcode/ZIP", width: 150 },
    { field: "orderNotes", headerName: "Order Notes", width: 150 },
    { field: "trackingStatus", headerName: "Tracking Status", width: 150 },
    { field: "trackingDate", headerName: "Tracking Date", width: 150 },
    { field: "trackingID", headerName: "Tracking ID", width: 150 },
    {
      field: "view",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
           <a href={`/OrderDetails/${params?.id}`}><button>View</button></a>  
      ),
    },
    {
      field: "_id",
      headerName: "INVOICE",
      width: 150,
      renderCell: (params) => (
        <a href={`/Invoice/${params?.id}`}><button>View Invoice</button></a>  
      ),
    },
  ];

  useEffect(() => {
    handleAlldata();
  }, [filterDate, applyFilters]);

  // Fetch all order data
  const handleAlldata = async () => {
    setIsLoading(true);
    try {
      const response = await getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching all orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch particular order details
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

  // Handle filter field changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle date changes in filters
  const handleDateChange = (name, date) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: date,
    }));
  };

  // Apply filters to the order data
  const handleFilterSubmit = () => {
    let filteredOrders = orders;

    if (filter.orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.toLowerCase().includes(filter.orderId.toLowerCase())
      );
    }
    if (filter.customer) {
      filteredOrders = filteredOrders.filter((order) =>order?.shippingInfo?.email
          .toLowerCase()
          .includes(filter?.customer?.toLowerCase())
      );
    }
    if (filter.orderStatus) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order?.trackingDetails[0]?.trackingStatus.toLowerCase() ===
          filter.orderStatus.toLowerCase()
      );
    }
    if (filter.total) {
      filteredOrders = filteredOrders.filter(
        (order) => order.totalPrice == filter.total
      );
    }
    if (filter.dateAdded) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          new Date(order.orderDate).toLocaleDateString() ===
          new Date(filter.dateAdded).toLocaleDateString()
      );
    }
    if (filter.dateModified) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          new Date(
            order.trackingDetails[0]?.trackingDate
          ).toLocaleDateString() ===
          new Date(filter.dateModified).toLocaleDateString()
      );
    }
    if (filter.trackingNumber) {
      filteredOrders = filteredOrders.filter((order) =>
        order.trackingDetails[0]?._id
          ?.toLowerCase()
          .includes(filter.trackingNumber.toLowerCase())
      );
    }

    setOrders(filteredOrders);
  };

  return (
    <div className={styles.orderTable}>
      <Box sx={{ padding: 2 }}>
        <Box component="form" display="flex" flexDirection="column" width={500} mb={2}>
          <TextField
            label="Order ID"
            name="orderId"
            value={filter.orderId}
            onChange={handleFilterChange}
            margin="normal"
          />
          <TextField
            label="Customer Email"
            name="customer"
            value={filter.customer}
            onChange={handleFilterChange}
            margin="normal"
          />
          <FormControl margin="normal">
            <InputLabel>Order Status</InputLabel>
            <Select
              label="Order Status"
              name="orderStatus"
              value={filter.orderStatus}
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Total Price"
            name="total"
            value={filter.total}
            onChange={handleFilterChange}
            margin="normal"
          />
          <br/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Added"
              value={filter.dateAdded}
              onChange={(date) => handleDateChange('dateAdded', date)}
              renderInput={(params) => <TextField {...params} margin="normal" />}
            />
            <br/>
            <DatePicker
              label="Date Modified"
              value={filter.dateModified}
              onChange={(date) => handleDateChange('dateModified', date)}
              renderInput={(params) => <TextField {...params} margin="normal" />}
            />
          </LocalizationProvider>
          <TextField
            label="Tracking ID"
            name="trackingNumber"
            value={filter.trackingNumber}
            onChange={handleFilterChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterSubmit}
            sx={{ marginTop: 2 }}
          >
            Filter
          </Button>
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
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
              stateCounty: order?.shippingInfo?.stateCounty,
              postcodeZIP: order?.shippingInfo?.postcodeZIP,
              orderNotes: order?.shippingInfo?.orderNotes,
              trackingStatus: order?.trackingDetails[0]?.trackingStatus,
              trackingDate: new Date(
                order?.trackingDetails[0]?.trackingDate
              ).toLocaleDateString(),
              trackingID: order?.trackingDetails[0]?._id,
              view:order?._id,
            }))}
            
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </div>
  );
};

export default OrderTable;
