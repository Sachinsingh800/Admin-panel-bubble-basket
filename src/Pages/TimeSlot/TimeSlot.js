import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar/NavBar";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./TimeSlot.module.css";
import { useRecoilState } from "recoil";
import { loadingStatus } from "../../Recoil";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { CreateButton2 } from "../../Component/CreateButton/CreateButton";
import Header from "../../Component/Header/Header";

function TimeSlot() {
  const [timeslot, setTimeslot] = useState([]);
  const [isLoading, SetIsloading] = useRecoilState(loadingStatus);
  const authToken = JSON.parse(localStorage.getItem("token"));

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  useEffect(() => {
    handleGetAllTimeslot();
  }, []);

  const handleGetAllTimeslot = async () => {
    SetIsloading(true);
    try {
      const response = await axios.get(
        `https://www.backend.luxurybubblebasket.com/admin/timeSlot/allSlots`
      );
      setTimeslot(response.data.timeSlots.map(item => ({...item, id: item._id})));
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
      SetIsloading(false);
    }
  };

  const handleDeleteTimeSlot = async (Id) => {
    SetIsloading(true);
    try {
      // Perform the deletion action here
      console.log("Deleted timeslot with ID:", Id);
      alert("Timeslot deleted successfully");

      // Refresh the timeslots after successful deletion
      handleGetAllTimeslot();
    } catch (error) {
      console.error("Error deleting timeslot:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const columns = [
    { field: 'day', headerName: 'Day', width: 150 },
    { field: 'startTime', headerName: 'Start Time', width: 150 },
    { field: 'endTime', headerName: 'End Time', width: 150 },
    { field: '_id', headerName: 'Action', width: 150, renderCell: (params) => (
      <button className={style.btn} onClick={() => handleDeleteTimeSlot(params.value)}>Delete</button>
    )},
  ];

  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
      <Header />
        <div className={style.header}>
          <h2>All Timeslots</h2>
          <div>
            <CreateButton2 />
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={timeslot}
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
        </div>
      </div>
    </div>
  );
}

export default TimeSlot;
