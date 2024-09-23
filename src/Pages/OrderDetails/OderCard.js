import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParticularOrders } from "../../Api/Api";
import styles from "./OderCard.module.css";

function OderCard() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await getParticularOrders(id);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>No order details available.</p>;
  }

  return (
    <div className={styles.orderDetails}>
      <h1>Order Details</h1>
      <div className={styles.inner_container}>
        <div>
          <h2>Shipping Information</h2>
          <p>First Name: {order.shippingInfo.firstName || "N/A"}</p>
          <p>Last Name: {order.shippingInfo.lastName || "N/A"}</p>
          <p>Company: {order.shippingInfo.companyName || "N/A"}</p>
          <p>Country: {order.shippingInfo.country || "N/A"}</p>
          <p>Town/City: {order.shippingInfo.townCity || "N/A"}</p>
          <p>State/County: {order.shippingInfo.stateCounty || "N/A"}</p>
          <p>Postcode/ZIP: {order.shippingInfo.postcodeZIP || "N/A"}</p>
          <p>Phone: {order.shippingInfo.phone || "N/A"}</p>
          <p>Email: {order.shippingInfo.email || "N/A"}</p>
        </div>
        <div>
          <h2>Billing Information</h2>
          <p>First Name: {order.shippingInfo.firstName || "N/A"}</p>
          <p>Last Name: {order.shippingInfo.lastName || "N/A"}</p>
          <p>Country: {order.shippingInfo.country || "N/A"}</p>
          <p>Town/City: {order.shippingInfo.townCity || "N/A"}</p>
          <p>State/County: {order.shippingInfo.stateCounty || "N/A"}</p>
          <p>Postcode/ZIP: {order.shippingInfo.postcodeZIP || "N/A"}</p>
          <p>Phone: {order.shippingInfo.phone || "N/A"}</p>
          <p>Email: {order.shippingInfo.email || "N/A"}</p>
        </div>
      </div>
      <div className={styles.inner_container}>
        <div>
          <h2>Payment Method</h2>
          <p>Online: {order.paymentMethod.online ? "Yes" : "No"}</p>
          <p>COD: {order.paymentMethod.cod ? "Yes" : "No"}</p>
        </div>
      </div>

      <h2>Products</h2>
      {order.productData.map((product) => (
        <div key={product.Product_id} className={styles.product}>
          <img
            src={product.ProductImg}
            alt={product.Product_title}
            className={styles.productImg}
          />
          <h3>{product.Product_title}</h3>
          <p dangerouslySetInnerHTML={{ __html: product.Product_description }}></p>
          <p>Category: {product.Product_category}</p>
          <p>Price: ${product.Product_price}</p>
          <p>Quantity: {product.Product_quantity}</p>
          <p>Total Price: ${product.Product_totalPrice}</p>
          <p>SKU: {product.Product_sku}</p>
        </div>
      ))}
      <div className={styles.inner_container}>
        <div>
          <h2>Order Summary</h2>
          <p>Total Items: {order.totalItems || "N/A"}</p>
          <p>All Product Total Price: ${order.allProductTotalPrice || "N/A"}</p>
          <p>Total Tax: ${order.totalTax || "N/A"}</p>
          <p>Subtotal: ${order.subTotal || "N/A"}</p>
          <p>Promo Discount: ${order.promoDiscount || "N/A"}</p>
          <p>Total Price: ${order.totalPrice || "N/A"}</p>
          <p>Coupon Code: {order.couponCode || "N/A"}</p>
        </div>
        <div>
          <h2>Payment Data</h2>
          <p>
            Amount: {order.paymentData.amountMoney.amount / 100}{" "}
            {order.paymentData.amountMoney.currency}
          </p>
          <p>Status: {order.paymentData.status || "N/A"}</p>
          <p>
            Receipt:{" "}
            <a
              href={order.paymentData.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Receipt
            </a>
          </p>
        </div>
      </div>

      <div className={styles.inner_container}>
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {order.orderId || "N/A"}</p>
          <p>Order Date: {new Date(order.orderDate).toLocaleString() || "N/A"}</p>
          <p>Created At: {new Date(order.paymentData.createdAt).toLocaleString() || "N/A"}</p>
          <p>Updated At: {new Date(order.paymentData.updatedAt).toLocaleString() || "N/A"}</p>
        </div>
        <div>
          <h2>Tracking Details</h2>
          <p>Status: {order.trackingDetails.trackingStatus || "N/A"}</p>
          <p>Tracking Date: {new Date(order.trackingDetails.trackingDate).toLocaleString() || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default OderCard;
