import React, { useEffect, useState } from "react";
import style from "./Invoice.module.css";
import { invoiceData } from "./data.js";
import barCode from "./barCode.png";
import qrCode from "./qr code.png";
import { getParticularOrders } from "../../Api/Api.js";
import { useParams } from "react-router-dom";

const Testing = () => {
  const [printed, setPrinted] = useState(false);
  const { id } = useParams();
  const [order, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(false);
console.log(order,"oreders")
  useEffect(() => {
    handleParticularData(id);
  }, [id]);

  const handleParticularData = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await getParticularOrders(orderId);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // months are zero-based
    const year = date.getUTCFullYear();

    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };
  return (
    <div className={style.main}>
      {!printed && (
        <button
          onClick={() => {
            const title = `Invoice #`;
            document.title = title;
            window.print();
          }}
          className={style.print_button}
        >
          Print Invoice
        </button>
      )}

      <div className={style.invoice_container}>
        <div className={style.header}>
          <div>
            <img
              className={style.logo}
              src="https://res.cloudinary.com/dscgsptzy/image/upload/v1715670590/zun4zqqt9cwuj7kvv3ux.jpg"
            />
            <div className={style.billing}>
              <p>
                <span>Billing State</span>: {order?.shippingInfo?.stateCounty}
              </p>

              <p>
                <span>Place Of Supply:</span>: {order?.shippingInfo?.townCity}
              </p>
            </div>
          </div>

          <div className={style.address}>
            <strong>SHIPPING & BILLING ADDRESS:</strong>
            <p style={{ fontWeight: 700 }}>{order?.shippingInfo?.firstName}</p>

            <p>
              {order?.shippingInfo?.streetAddress?.apartment}{" "}
              {order?.shippingInfo?.streetAddress?.houseNoAndStreetName}{" "}
              {order?.shippingInfo?.townCity},{order?.shippingInfo?.stateCounty}
              ,{order?.shippingInfo?.country}-{order?.shippingInfo?.postcodeZIP}
            </p>

            <strong>Buyer UID/GSTIN #: </strong>
            <strong>Delivery#: {invoiceData?.buyerUID}</strong>
            <img className={style.barCode} src={barCode} />
          </div>
          <div>
            <h3>RETAIL / TAX INVOICE</h3>
            <strong>Order#: {order?.orderId}</strong>
            <p>Date: {formatDate(order?.orderDate)}</p>
            <img className={style.qrCode} src={qrCode} />
          </div>
        </div>
        <div className={style.block}>
          -----------------------------------------------------------------------
        </div>
        <div className={style.shipping_billing}>
          <div className={style.shipping}>
            <strong>
              <span>INVOICE#:</span>
            </strong>
            <div>
              <strong>{invoiceData?.invoiceNumber}</strong>
            </div>
            <strong>29/04/2024</strong>
            <div>
              <strong>Item(s) In The Box : {order?.totalItems}</strong>
            </div>
          </div>
          <div className={style.shipping}>
            <strong> SOLD BY:</strong>
            <div className={style.shipp_ad}>
              <strong>
                luxury bubble basket E-RETAIL LIMITED | GSTIN # :
                07AAFCN5072P1ZX| FSSAI License No # : 10021011000081
              </strong>

              <p>
                Khasra no, 1226 Rajokari villageSouth WestNew Delhi, Delhi,
                INDIA - 110038
              </p>
            </div>
          </div>
        </div>
        {/* Display item details */}
        <br />
        <br />
        <br />
        <div className={style.item_details}>
          <table width="560" cellpadding="1" cellspacing="0">
            <thead>
              <tr valign="top">
                <th
                  width="100"
                  style={{ border: "1px solid  #000000", padding: "0.1cm" }}
                >
                  <p align="left">Product Description</p>
                </th>
                <th
                  width="50"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="left">SALE PRICE</p>
                </th>
                <th
                  width="50"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="left">QTY</p>
                </th>
                <th
                  width="50"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="left">DISC</p>
                </th>
                <th
                  width="50"
                  colSpan="2"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">CGST</p>
                </th>
                <th
                  width="50"
                  colSpan="2"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">SGST/UGST</p>
                </th>
                <th
                  width="50"
                  colSpan="2"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">IGST</p>
                </th>
                <th
                  width="60"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">NET AMT</p>
                </th>
              </tr>
              <tr valign="top">
                <th
                  width="100"
                  style={{ border: "1px  black solid", padding: "0.1cm" }}
                >
                  <p align="left"></p>
                </th>
                <th
                  width="50"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center"></p>
                </th>
                <th
                  width="50"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center"></p>
                </th>
                <th
                  width="50"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center"></p>
                </th>
                <th
                  width="25"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Rate</p>
                </th>
                <th
                  width="25"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Amt</p>
                </th>
                <th
                  width="25"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Rate</p>
                </th>
                <th
                  width="25"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Amt</p>
                </th>
                <th
                  width="25"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Rate</p>
                </th>
                <th
                  width="25"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Amt</p>
                </th>
                <th
                  width="60"
                  style={{ border: "1px solid #000000", padding: "0.1cm" }}
                >
                  <p align="center">Amt</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map through item list and display each item */}
              {invoiceData?.items.map((item, index) => (
                <tr valign="top" key={index}>
                  <td
                    width="100"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="left">{item?.description}</p>
                  </td>
                  <td
                    width="50"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.price}</p>
                  </td>
                  <td
                    width="50"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.quantity}</p>
                  </td>
                  <td
                    width="50"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.discount}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.cgstRate}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.cgstAmount}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.sgstRate}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.sgstAmount}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.igstRate}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.igstAmount}</p>
                  </td>
                  <td
                    width="60"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item?.netAmount}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={style.block}>
          -----------------------------------------------------------------------
        </div>

        <div className={style.footer}>
          <p> Registered Address for luxury bubble basket E-Retail Limited</p>
          <p>{invoiceData?.registeredAddress}</p>
        </div>
        <div>
          <p>
            <strong>
              For more information on your order or to return an item write to
              luxurybubblebasket@gmail.com
            </strong>
          </p>
          <li>All disputes will be subjected to Mumbai Jurisdiction only.</li>
        </div>
        <div className={style.invoice_details}>
          <div className={style.invoice_details_innerbox}>
            <div>
              <strong>DISCOUNT () </strong>
              <p>
                <span>:&nbsp;&nbsp;&nbsp;INR</span>
                <span> 0.00</span>
              </p>
            </div>
            <div>
              <strong>WALLET </strong>{" "}
              <p>
                <span>:&nbsp;&nbsp;&nbsp;INR</span>
                <span> 0.00</span>
              </p>
            </div>
            <div>
              <strong>GV VALUE </strong>
              <p>
                <span>:&nbsp;&nbsp;&nbsp;INR</span>
                <span> 0.00</span>
              </p>
            </div>
            <div>
              <strong>TAX AMOUNT </strong>
              <p>
                <span>:&nbsp;&nbsp;&nbsp;INR</span>
                <span> 181.00</span>
              </p>
            </div>
            <div>
              <strong>STATE ENTRY TAX </strong>
              <p>
                <span>:&nbsp;&nbsp;&nbsp;INR</span>
                <span> 0.00</span>
              </p>
            </div>
            <div>
              <strong>ROUND OFF </strong>
              <p>
                <span>:&nbsp;&nbsp;&nbsp;INR</span>
                <span> 0.00</span>
              </p>
            </div>
            <div className={style.block}>----------------------------</div>
            <div>
              <strong>GRAND TOTAL </strong>{" "}
              <p>
                <span>
                  :&nbsp;&nbsp;&nbsp;<strong>INR</strong>
                </span>
                <span>
                  <strong> 1188.00</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
        <p>
          Refund amount due to difference between order MRP and shipment MRP INR
          0
        </p>
        <div className={style.block}>
          -----------------------------------------------------------------------
        </div>
        <div>
          <p>Declaration I : Tax is not payable on reverse charge basis.</p>
          <p>
            <strong>CUSTOMER SELF DECLARATION:</strong> I, Hereby confirm that
            the content of this package are being purchased for my internal and
            personal purpose and not for resale. I further understand and agree
            to luxury bubble basket's Terms and Conditions.
          </p>
        </div>
        <div className={style.block}>
          -----------------------------------------------------------------------
        </div>
        <div className={style.outer_box}>
          <div className={style.block}>
            -----------------------------------------------------------------------
          </div>
          <div className={style.footer}>
            <p> Registered Address for luxury bubble basket E-Retail Limited</p>
            <p>{invoiceData?.registeredAddress}</p>
          </div>
          <div>
            <p>
              <strong>
                For more information on your order or to return an item write to
                luxurybubblebasket@gmail.com
              </strong>
            </p>
            <li>All disputes will be subjected to Mumbai Jurisdiction only.</li>
          </div>
        </div>
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
    </div>
  );
};

export default Testing;
