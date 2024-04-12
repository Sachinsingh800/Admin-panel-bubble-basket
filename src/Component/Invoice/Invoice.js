import React, { useState } from "react";
import style from "./Invoice.module.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function Invoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [printed, setPrinted] = useState(false);

  const order = JSON.parse(localStorage.getItem("orderInfo"));

  const companyName = "Zuluresh"; 

  return (
    <div className={style.main}>
      {loading && <LoadingScreen />}
      {!printed && (
  <button
    onClick={() => {
      const title = `${companyName} Invoice #${order.orderId}`;
      document.title = title;
      window.print();
    }}
    className={style.print_button}
  >
    Print Invoice
  </button>
)}
      <div className={style.Invoice}>
        <table className={style.invoiceTable}>
          <tbody>
            <tr>
              <td className={style.invoiceHeader} colSpan="2" bgcolor="#727272">
                <h1 >Zuluresh</h1>
                <p className={style.s1}>Invoice # {order.orderId}</p>
                <p className={style.s1}>
                  Order Date: {new Date().toDateString()}
                </p>
              </td>
            </tr>
            <tr>
              <td className={style.address} bgcolor="#EDEAEA">
                <h2 className={style.s2}>Billing Address</h2>
                <p className={style.s3}>Name: {order.address.name}</p>
                <p className={style.s3}>Phone No: {order.address.phone}</p>
                <p className={style.s3}>House No: {order.address.houseNo}</p>
                <p className={style.s3}>Block: {order.address.block}</p>
                <p className={style.s3}>Street: {order.address.street}</p>
                <p className={style.s3}>Landmark: {order.address.Landmark}</p>
                <p className={style.s3}>Pincode: {order.address.pincode}</p>
                <p className={style.s3}>Locality: {order.address.locality}</p>
                <p className={style.s3}>
                  Address As: {order.address.AddressAs}
                </p>
                <p className={style.s3}>
                  Delivery Slot: {order.address.deliverySlot}
                </p>
              </td>
              <td className={style.address} bgcolor="#EDEAEA">
                <h2 className={style.s2}>Shipping Address</h2>
                <p className={style.s3}>Name: {order.address.name}</p>
                <p className={style.s3}>Phone No: {order.address.phone}</p>
                <p className={style.s3}>House No: {order.address.houseNo}</p>
                <p className={style.s3}>Block: {order.address.block}</p>
                <p className={style.s3}>Street: {order.address.street}</p>
                <p className={style.s3}>Landmark: {order.address.Landmark}</p>
                <p className={style.s3}>Pincode: {order.address.pincode}</p>
                <p className={style.s3}>Locality: {order.address.locality}</p>
                <p className={style.s3}>
                  Address As: {order.address.AddressAs}
                </p>
                <p className={style.s3}>
                  Delivery Slot: {order.address.deliverySlot}
                </p>
              </td>
            </tr>
            <tr>
              <td className={style.productDetails} colSpan="2">
                <h2 className={style.s2}>Product Details</h2>
                <table className={style.productTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>Measure Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.ProductDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Product_title}</td>
                        <td>{item.Product_quantity}</td>
                        <td>{item.Product_price}</td>
                        <td>{item.Product_unit}</td>
                        <td>{item.Product_measureUnit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className={style.orderSummary} colSpan="2">
                <h2 className={style.s2}>Order Summary</h2>
                <p className={style.s3}>Subtotal: ₹{order.totalPrice}</p>
                <p className={style.s3}>Discount: ₹{order.Discount}</p>
                <p className={style.s3}>
                  Shipping & Handling: ₹{order.Shipping}
                </p>
                <p className={style.s3}>
                  Grand Total: ₹
                  {order.totalPrice + order.Shipping + order.Discount}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Hide the print button when printing */}
      <style>
        {`
          @media print {
            button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Invoice;
