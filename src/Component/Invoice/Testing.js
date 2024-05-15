import React, { useState } from "react";
import style from "./Testing.module.css";
import { invoiceData } from "./data.js";
import barCode from "./barCode.png";
import qrCode from "./qr code.png";

const Testing = () => {
  const [printed, setPrinted] = useState(false);

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
                <span>Billing State:</span> {invoiceData?.billingState}
              </p>

              <p>
                <span>Place Of Supply:</span> {invoiceData?.placeOfSupply}
              </p>
            </div>
          </div>

          <div className={style.address}>
            <strong>SHIPPING & BILLING ADDRESS:</strong>
            <p>{invoiceData?.shippingAddress}</p>
            <strong>Buyer UID/GSTIN #: </strong>
            <strong>Delivery#: {invoiceData?.buyerUID}</strong>
            <img className={style.barCode} src={barCode} />
          </div>
          <div>
            <h3>RETAIL / TAX INVOICE</h3>
            <strong>Order#: {invoiceData?.orderNumber}</strong>
            <p>Date: {invoiceData?.orderDate}</p>
            <img className={style.qrCode} src={qrCode} />
          </div>
        </div>
            <div className={style.block}>----------------------------------------------------------------</div>
        <div className={style.shipping_billing}>
          <div className={style.shipping}>
            <strong>
              <span>INVOICE#:</span>
            </strong>
            <div>
              <strong>{invoiceData?.invoiceNumber}</strong>
            </div>
            <strong>
              <span>29/04/2024</span>
            </strong>
            <div>
              <strong>| Item(s) In The Box : 1</strong>
            </div>
          </div>
          <div className={style.shipping}>
            <strong> SOLD BY:</strong>
            <div>
              <strong>
                NYKAA E-RETAIL LIMITED | GSTIN # : 07AAFCN5072P1ZX| FSSAI
                License No # : 10021011000081
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
                    <p align="left">{item.description}</p>
                  </td>
                  <td
                    width="50"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.price}</p>
                  </td>
                  <td
                    width="50"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.quantity}</p>
                  </td>
                  <td
                    width="50"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.discount}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.cgstRate}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.cgstAmount}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.sgstRate}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.sgstAmount}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.igstRate}</p>
                  </td>
                  <td
                    width="25"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.igstAmount}</p>
                  </td>
                  <td
                    width="60"
                    style={{ border: "1px solid #000000", padding: "0.1cm" }}
                  >
                    <p align="center">{item.netAmount}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className={style.block}>----------------------------------------------------------------</div>

        <div className={style.footer}>
          <p> Registered Address for Nykaa E-Retail Limited</p>
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
          <div className={style.block}>----------------------------------------------------------------</div>
        <div>
          <p>Declaration I : Tax is not payable on reverse charge basis.</p>
          <p>
            <strong>CUSTOMER SELF DECLARATION:</strong> I, Hereby confirm that
            the content of this package are being purchased for my internal and
            personal purpose and not for resale. I further understand and agree
            to Nykaa's Terms and Conditions.
          </p>
        </div>
          <div className={style.block}>----------------------------------------------------------------</div>
        <div className={style.outer_box}>
            <div className={style.block}>----------------------------------------------------------------</div>
          <div className={style.footer}>
            <p> Registered Address for Nykaa E-Retail Limited</p>
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
