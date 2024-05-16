import axios from 'axios';




const BASE_URL = 'https://wine-rnlq.onrender.com';
const authToken = JSON.parse(localStorage.getItem("token"));


// LOG IN ADMIN


export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/auth/logIn`, {
      email,
      password,
    });
    const { status, message, data, token } = response.data;
    if(status){
      localStorage.setItem('token',JSON.stringify(token) );
      localStorage.setItem("userData",(response.config.data))
      window.location.href="/DashBoard"
    }
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
  }
};




// Update  profile


export const UpdateAdminProfile= async (name,email, password) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.put(`${BASE_URL}/admin/auth/update`, {
      name,
      email,
      password,
    },{headers});

    const { status, message, data, token } = response.data;
    if(status){
      localStorage.clear()
      window.location.href="/"
    }
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
  }
};


// add services 

export const addServices = async (requestServices) => {
  const token =JSON.parse(localStorage.getItem("token")); 
  const headers={
     "x-auth-token": token
   }
  
  try {
    const response = await axios.post(`${BASE_URL}/admin/createService`, requestServices,{headers});
    const { status, message, data } = response.data;

    return { status, message, data };
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
  }
};

// add Access 

export const addAccess = async (formdata) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/adminAuth/grantAccess`, formdata ,{headers});
    const { status, message, data } = response.data;

    return { status, message, data };
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
  }
};


// getAllProduct

export const getAllProduct = async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  
  try {
    const response = await axios.get(`${BASE_URL}/admin/product/getAll`, {headers
    });
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


// getAllBlog

export const getAllBlog= async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  
  
  try {
    const response = await axios.get(`${BASE_URL}/admin/blog/getAllAdmin`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

// getSingleBlog

export const getSingleBlog= async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  
  
  try {
    const response = await axios.get(`${BASE_URL}/admin/blog/getSingleAdmin/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


// getAllCategory 

export const getAllCategory = async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/category/getAll`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


// getAllSubCategory 

export const getAllSubCategory = async (categoriesId) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/categoryAndSubCategory/getAllSubCategory/${categoriesId}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};



// getAllPincode

export const getAllPincode = async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/pincodeLocation/getAllPincode`, {headers
    });
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


// getAllTimeslot

export const getAllTimeslot = async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/allSlots`, {headers
    });
    console.log(response)
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//updateProduct

export const updateProduct = async (id, formdata) => {

  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.put(`${BASE_URL}/admin/product/update/${id}`, formdata,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//DeleteShipping

export const DeleteShipping = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/shipping/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//DeleteCoupon

export const DeleteCoupon = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/coupon/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};



//DeleteTax

export const DeleteTax = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/shipping/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//DeleteProduct

export const deleteProduct = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/product/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//DeleteBlog

export const deleteBlog = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/blog/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//DeletePincode

export const deletePincode = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/pincodeLocation/deletePincode/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//DeleteTimeSlot

export const DeleteTimeslot = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/timeslot/deleteTimeSlot/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};
//DeleteBannner

export const DeleteBanner = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/banner/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//DeleteCategory

export const DeleteCategory = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/category/delete/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};
//DeleteSubCategory

export const DeleteSubCategory = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.delete(`${BASE_URL}/admin/categoryAndSubCategory/deleteSingleSubCategory/${id}`,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//addProduct 

export const addProduct = async ( formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/product/create`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//addCategory

export const addCategory = async ( formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data', // Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/category/create`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//addSubCategory

export const addSubCategory = async ( selectedCategory,formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/categoryAndSubCategory/addSubCategory/${selectedCategory}`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//addBanner

export const addBanner = async ( formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/banner/create`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//addTimeSlot

export const addTimeSlot= async ( formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/timeSlot/addTimeSlot`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


//addPincode 

export const addPincode = async ( formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/pincodeLocation/createPincode`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};

//getSingleProduct

export const getSingleProduct = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/get/product/${id}`,{headers });
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};


export const getAllOrders = async () => {
  const headers = {
    "x-auth-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/order/getAllOrders`,{headers});
   console.log(response,"response")
    const { status, message, data } = response.data;

    return { status, message, data };
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
  }
};


export const getParticularOrders = async (id) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/order/singleOrder/${id}`,{headers});
 
    const { status, message, data } = response.data;
    if(status){
      localStorage.setItem("orderInfo",JSON.stringify(data))
      window.location.href = "/Invoice";
    }
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
  }
};

// getAllBanner

export const getAllBanner = async () => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data',// Set content type to JSON
  };
  try {
    const response = await axios.get(`${BASE_URL}/admin/banner/getAll`,{headers });
   console.log(response,"response")
    const { status, message, data } = response.data;


    return { status, message, data };
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
  }
};

//addShipping

export const addShipping = async ( formData) => {
  const headers = {
    "x-admin-token": authToken, // Ensure authToken is defined
    'Content-Type': 'multipart/form-data', // Set content type to JSON
  };
  try {
    const response = await axios.post(`${BASE_URL}/admin/shipping/create`, formData,{headers});
    const { status, message, data } = response.data;
    return { status, message, data };
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
  }
};