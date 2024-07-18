import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AiFillSetting} from 'react-icons/ai';
import {useNavigate} from "react-router-dom"

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout=()=>{
    localStorage.clear()
    navigate("/")
  }

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
      <AiFillSetting/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div style={{padding:"20px" , display:"flex",flexDirection:"column",gap:"10px"}}>
        <span ><a style={{textDecoration:"none",color:"black",cursor:"pointer"}} href='/Profile'>Profile</a></span>
        <span ><a style={{textDecoration:"none",color:"black",cursor:"pointer"}} href='/RegisterPage'>Register</a></span>
        <span ><p onClick={handleLogout} style={{color:"black",cursor:"pointer"}}>Logout </p></span>
        </div>
        
      </Popover>
    </div>
  );
}
