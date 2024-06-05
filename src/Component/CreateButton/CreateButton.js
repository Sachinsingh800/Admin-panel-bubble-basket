import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./CreateButton.module.css";
import { useState, useEffect } from "react";
import {
  addAccess,
  addCategory,
  addNotification,
  addPincode,
  addShipping,
  addSubCategory,
  addTimeSlot,
  getAllCategory,
} from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useRecoilState } from "recoil";
import { loadingStatus, pinCodeStatus } from "../../Recoil";
import axios from "axios";
import { Input } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [isPincode, SetIsPincode] = useRecoilState(pinCodeStatus);

  const handleCreateClick = async () => {
    SetIsloading(true);
    setOpen(false);
    const formdata = {
      pincode: pincode,
    };
    try {
      const response = await addPincode(formdata);
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Created successfully");
        SetIsPincode(true);
      } else {
        console.error(message);
        // Handle update error
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
      // Handle update error
    } finally {
      SetIsloading(false);
    }
  };
  return (
    <div>
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleOpen}
      >
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Pincode
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              onChange={(e) => setPincode(e.target.value)}
              className={styles.input}
              type="number"
              placeholder="Add Pincode"
              maxlength="6"
            />
            <button className={styles.btn} onClick={handleCreateClick}>
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const CreateButton2 = () => {
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [selectedPeriod2, setSelectedPeriod2] = useState("AM");
  const [selectedTime, setSelectedTime] = useState("06:30");
  const [selectedTime2, setSelectedTime2] = useState("05:30");

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handlePeriodChange2 = (event) => {
    setSelectedPeriod2(event.target.value);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleTimeChange2 = (time) => {
    setSelectedTime2(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCreateClick = async () => {
    setOpen(false);
    SetIsloading(true);
    const day = selectedDate
      ? selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
        })
      : "";
    const timeRange =
      selectedTime +
      " " +
      selectedPeriod +
      " to " +
      selectedTime2 +
      " " +
      selectedPeriod2;

    const requestData = {
      day,
      timeRange,
    };

    try {
      const response = await addTimeSlot(requestData);
      const { status, message } = response;
      if (status) {
        console.log(message);
      } else {
        console.error(message);
        SetIsloading(false);
        alert("Created successfully");
        handleClose();
        window.location.href = "/TimeSlot";
        // Handle creation error
      }
    } catch (error) {
      console.error("Error creating timeslot:", error.message);
      // Handle creation error
    }
  };

  return (
    <div>
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleOpen}
      >
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create TimeSlot
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>Day</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="EEEE (dd MMM)"
            />
            <div className={styles.customTimePicker}>
              <div>
                <label>Start Time</label>
                <TimePicker
                  onChange={handleTimeChange}
                  value={selectedTime}
                  disableClock
                  format="HH:mm"
                />
                <select
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  className={styles.time}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div>
                <label>End Time</label>
                <TimePicker
                  onChange={handleTimeChange2}
                  value={selectedTime2}
                  disableClock
                  format="HH:mm"
                />

                <select
                  value={selectedPeriod2}
                  onChange={handlePeriodChange2}
                  className={styles.time}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <br />
            <br />
            <button onClick={handleCreateClick} className={styles.btn}>
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const AddNotificationButton = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateClick = async () => {
    setOpen(false);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", description);

      // const response = await addNotification(formData);
      const response = "";
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Notification created successfully");
      } else {
        console.error(message);
        setIsLoading(false);
        alert("Error: " + message);
      }
    } catch (error) {
      console.error("Error creating category:", error.message);
      setIsLoading(false);
      alert("Error: " + error.message);
    } finally {
      // window.location.reload();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={style.main}>
              <label>
                title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <div className={styles.text_area}>
                <label>Description:</label>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <br />
              <button className={styles.btn} onClick={handleCreateClick}>
                {isLoading ? "Create..." : "Create"}
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateCategory = ({ id }) => {
  const authToken = JSON.parse(localStorage.getItem("token"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState([]);
  const [content, setContent] = useState("");
  const [catTypeUp, setCatTypeUp] = useState("");
  const [catTypeDown, setCatTypeDown] = useState("");

  useEffect(() => {
    handlegetSingleDataAccess();
  }, [open]);

  const handlegetSingleDataAccess = async () => {
    SetIsloading(true);
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "application/json", // Set content type to JSON
    };
    try {
      const response = await axios.get(
        `https://bubblebasketbackendapp.onrender.com/admin/category/getSingle/${id}`,
        { headers }
      );
      setCategoryName(response?.data?.data?.categoryName);
      setContent(response?.data?.data?.content);
      setCatTypeUp(response?.data?.data?.catTypeUp);
      setCatTypeDown(response?.data?.data?.catTypeDown);
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const handleUpdateAccessData = async () => {
    SetIsloading(true);
    setOpen(false);

    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "multipart/form-data", // Set content type to JSON
    };
    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("content", content);
      formData.append("catTypeUp", catTypeUp);
      formData.append("catTypeDown", catTypeDown);
      categoryImg.forEach((file) => {
        formData.append("categoryImg", file);
      });
      const response = await axios.put(
        `https://bubblebasketbackendapp.onrender.com/admin/category/update/${id}`,
        formData,
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data update successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      SetIsloading(false);
    }
  };
  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label className={styles.label}>
              Category Name:
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label className={styles.label_textArea}>
              Content:
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label className={styles.label}>
              catTypeUp:
              <input
                type="text"
                value={catTypeUp}
                onChange={(e) => setCatTypeUp(e.target.value)}
              />
            </label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label className={styles.label}>
              catTypeDown:
              <input
                type="text"
                value={catTypeDown}
                onChange={(e) => setCatTypeDown(e.target.value)}
              />
            </label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label className={styles.label}>
              Category Image:
              <input
                onChange={(e) => setCategoryImg(Array.from(e.target.files))}
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                multiple
              />
            </label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button className={styles.btn} onClick={handleUpdateAccessData}>
              Update
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const AddShippingButton = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [shippingCharge, setshippingCharge] = useState("");
  const [freeShipingLimit, setfreeShipingLimit] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateClick = async () => {
    setOpen(false);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("shippingCharge", shippingCharge);
      formData.append("freeShipingLimit", freeShipingLimit);

      const response = await addShipping(formData);
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Shipping created successfully");
      } else {
        console.error(message);
        setIsLoading(false);
        alert("Error: " + message);
      }
    } catch (error) {
      console.error("Error creating category:", error.message);
      setIsLoading(false);
      alert("Error: " + error.message);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Shipping Charge:
              <input
                type="number"
                value={shippingCharge}
                onChange={(e) => setshippingCharge(e.target.value)}
              />
            </label>
            <br />
            <label>
              Free ShipingLimit
              <input
                type="number"
                value={freeShipingLimit}
                onChange={(e) => setfreeShipingLimit(e.target.value)}
              />
            </label>

            <br />
            <button className={styles.btn} onClick={handleCreateClick}>
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateShippingButton = ({ id }) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [shippingCharge, setShippingCharge] = useState("");
  const [freeShippingLimit, setFreeShippingLimit] = useState("");
  const authToken = JSON.parse(localStorage.getItem("token"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateClick = async () => {
    setIsLoading(true);
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "multipart/form-data", // Set content type to JSON
    };
    try {
      const response = await axios.put(
        `https://bubblebasketbackendapp.onrender.com/admin/shipping/update/${id}`,
        {
          shippingCharge: shippingCharge,
          freeShipingLimit: freeShippingLimit,
        },
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data update successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Shipping
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Shipping Charge:
              <input
                type="number"
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
              />
            </label>
            <br />
            <label>
              Free Shipping Limit:
              <input
                type="number"
                value={freeShippingLimit}
                onChange={(e) => setFreeShippingLimit(e.target.value)}
              />
            </label>

            <br />
            <button className={styles.btn} onClick={handleUpdateClick}>
              Update
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateCouponsButton = ({ id }) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const authToken = JSON.parse(localStorage.getItem("token"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateClick = async () => {
    setIsLoading(true);
    const headers = {
      "x-admin-token": authToken,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.put(
        `https://bubblebasketbackendapp.onrender.com/admin/coupon/update/${id}`,
        {
          promoCode,
          discount,
          expiry,
        },
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Coupon
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Promo Code:
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </label>
            <br />
            <label>
              Discount:
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </label>
            <br />
            <label>
              Expiry:
              <input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.btn} onClick={handleUpdateClick}>
              Update
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const CreateCouponsButton = ({ id }) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const authToken = JSON.parse(localStorage.getItem("token"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateClick = async () => {
    setIsLoading(true);
    const headers = {
      "x-admin-token": authToken,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        `https://bubblebasketbackendapp.onrender.com/admin/coupon/create`,
        {
          promoCode,
          discount,
          expiry,
        },
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data Create successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Coupon
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Promo Code:
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </label>
            <br />
            <label>
              Discount:
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </label>
            <br />
            <label>
              Expiry:
              <input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.btn} onClick={handleUpdateClick}>
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateTaxButton = ({ id }) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [shippingCharge, setShippingCharge] = useState("");
  const authToken = JSON.parse(localStorage.getItem("token"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateClick = async () => {
    setIsLoading(true);
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "multipart/form-data", // Set content type to JSON
    };
    try {
      const response = await axios.put(
        `https://bubblebasketbackendapp.onrender.com/admin/tax/update/${id}`,
        {
          taxPercent: shippingCharge,
        },
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data update successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Shipping
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Tax Charge:
              <input
                type="number"
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.btn} onClick={handleUpdateClick}>
              Update
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const AddSubCategoryButton = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);

  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleAllCategory = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCategory();
      setCategories(response.data); // Set the categories data
    } catch (error) {
      console.error("Error getting categories:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClick = async () => {
    setOpen(false);
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("subCategoryName", categoryName);
    for (let i = 0; i < categoryImg.length; i++) {
      formdata.append("subCategoryImg", categoryImg[i]);
    }

    try {
      const response = await addSubCategory(selectedCategory, formdata);
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Sub Category created successfully");
        window.location.reload();
      } else {
        console.error(message);
        setIsLoading(false);
        alert("Sub Category created successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating category:", error.message);
      // Handle creation error
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Sub Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={style.categoriesContainer}>
              <span>Category:</span>
              <select
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <label>
              Category Name:
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Category Image:
              <input
                onChange={(e) => setCategoryImg(e.target.files)}
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                multiple
              />
            </label>
            <br />
            <button className={styles.btn} onClick={handleCreateClick}>
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateSubCategoryButton = ({ id }) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState([]); // Initialize as empty array
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleAllCategory = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCategory();
      setCategories(response.data); // Set the categories data
    } catch (error) {
      console.error("Error getting categories:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSubCategory = async () => {
    setIsLoading(true);
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "multipart/form-data", // Set content type to JSON
    };
    try {
      const formData = new FormData();
      formData.append("subCategoryName", categoryName);
      categoryImg.forEach((file) => {
        formData.append("subCategoryImg", file);
      });
      const response = await axios.put(
        `https://bubblebasketbackendapp.onrender.com/admin/categoryAndSubCategory/updateSubCategory/${selectedCategory}/${id}`,
        formData,
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data update successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Sub Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={style.categoriesContainer}>
              <span>Category:</span>
              <select
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <label>
              Sub Category Name:
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Sub Category Image:
              <input
                onChange={(e) => {
                  console.log("Selected files:", e.target.files);
                  setCategoryImg(Array.from(e.target.files)); // Convert FileList to array
                }}
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                multiple
              />
            </label>
            <br />
            <button className={styles.btn} onClick={handleUpdateSubCategory}>
              Update Sub Category
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const CreateAccess = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateClick = async () => {
    SetIsloading(true);
    setOpen(false);
    const formdata = {
      grantAccessEmail: email,
      password: password,
    };
    try {
      const response = await addAccess(formdata);
      const { status, message } = response;
      if (status) {
        alert("Created successfully");
        window.location.reload();
      } else {
        console.error(message);
        // Handle update error
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
      // Handle update error
    } finally {
      SetIsloading(false);
    }
  };
  return (
    <div>
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleOpen}
      >
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Access
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              name="email"
              placeholder="admin@gmail.com"
            />
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              name="password"
              placeholder="Add Pincode"
              required
            />
            <button className={styles.btn} onClick={handleCreateClick}>
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const UpdateAccess = ({ id }) => {
  const authToken = JSON.parse(localStorage.getItem("token"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    handlegetSingleDataAccess();
  }, []);

  const handlegetSingleDataAccess = async () => {
    SetIsloading(true);
    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "application/json", // Set content type to JSON
    };
    try {
      const response = await axios.get(
        `https://bubblebasketbackendapp.onrender.com/admin/adminAuth/getSingle/${id}`,
        { headers }
      );
      setEmail(response.data.data.grantAccessEmail);
      setPassword(response.data.data.password);
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const handleUpdateAccessData = async () => {
    SetIsloading(true);
    setOpen(false);

    const headers = {
      "x-admin-token": authToken, // Ensure authToken is defined
      "Content-Type": "multipart/form-data", // Set content type to JSON
    };
    try {
      const response = await axios.put(
        `https://bubblebasketbackendapp.onrender.com/admin/adminAuth/updateSingle/${id}`,
        {
          grantAccessEmail: email,
          password: password,
        },
        { headers }
      );
      const { status, message, data, token } = response.data;
      if (status) {
        alert("Data update successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error getting services:", error.message);
    } finally {
      SetIsloading(false);
    }
  };
  return (
    <div>
      <button style={{ padding: "1px" }} onClick={handleOpen}>
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Access
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              name="email"
              placeholder="admin@gmail.com"
            />
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
              name="password"
              placeholder="Add password"
              required
            />
            <button className={styles.btn} onClick={handleUpdateAccessData}>
              Update
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export const AddCategoryButton = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [content, setContent] = useState("");
  const [categoryImg, setCategoryImg] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateClick = async () => {
    setOpen(false);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("content", content);
      categoryImg.forEach((file) => {
        formData.append("categoryImg", file);
      });

      const response = await addCategory(formData);
      const { status, message } = response;
      if (status) {
        console.log(message);
        alert("Category created successfully");
      } else {
        console.error(message);
        setIsLoading(false);
        alert("Error: " + message);
      }
    } catch (error) {
      console.error("Error creating category:", error.message);
      setIsLoading(false);
      alert("Error: " + error.message);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleOpen}>
        <AiOutlinePlus />
        Create
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Category Name:
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </label>
            <br />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label className={styles.teaxtArea}>
              Content:
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </Typography>
          <br />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Category Image:
              <Input
                onChange={(e) => setCategoryImg(Array.from(e.target.files))}
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                multiple
              />
            </label>

            <br />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button className={styles.btn} onClick={handleCreateClick}>
                Create
              </Button>
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
