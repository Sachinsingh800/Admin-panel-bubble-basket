import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./Access.module.css";
import Header from "../../Component/Header/Header";
import { CreateAccess, UpdateAccess } from "../../Component/CreateButton/CreateButton";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { getAllProvidedAccess } from "../../Api/Api";

function Access() {
  const [isLoading, setIsLoading] = useRecoilState(loadingStatus);
  const [access, setAccess] = useState([]);
  const authToken = JSON.parse(localStorage.getItem("token"));

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  useEffect(() => {
    handlegetAllAccess();
  }, []);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // You can pass locale options here if needed
  };

  const handlegetAllAccess = async () => {
    setIsLoading(true);
    try {
      const response = await  getAllProvidedAccess()
      setAccess(
        response?.data?.data.map((item) => ({ ...item, id: item._id }))
      ); // Add id property
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };


  const DeleteAccess = async (id) => {
    setIsLoading(true);
    try {
      const headers = {
        "x-admin-token": authToken, // Ensure authToken is defined
        "Content-Type": "application/json", // Set content type to JSON
      };
      const response = await axios.delete(
        `https://www.backend.luxurybubblebasket.com/admin/adminAuth/deleteSingle/${id}`,
        { headers }
      );
  
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
      handlegetAllAccess();
    }
  };

  const columns = [
    { field: "grantAccessEmail", headerName: "Email", width: 200 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      valueGetter: (params) => formatCreatedAt(params.value),
    },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "_id",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <button
        style={{padding:"1px"}}
          className={style.btn}
          onClick={() => DeleteAccess(params.formattedValue)}
        >
          Delete
        </button>
      ),
    },
    {
      field: "id", // Corrected field name to match the ID field
      headerName: "Update",
      width: 150,
      renderCell: (params) => <UpdateAccess id={params.formattedValue} />,
    },
  ];

  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <Header />
        <br />
        <div>
          <div className={style.header}>
            <div className={style.innerbox}>
              <div className={style.label}>
                <h6>From:</h6>
                <input type="date" />
              </div>
              <div className={style.label}>
                <h6>To:</h6>
                <input type="date" />
              </div>
              <button className={style.btn}>Clear</button>
              <button className={style.btn}>apply filter</button>
            </div>
            <div>
              <button>
                <AiOutlineCloudUpload />
                Export
              </button>
              <CreateAccess />
            </div>
          </div>
          <br />
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={access}
            columns={columns}
            getRowId={(row) => row._id}
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
        </div>
      </div>
    </div>
  );
}

export default Access;
