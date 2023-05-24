import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "./landlordDetails.css";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const LandlordDetails = (props) => {
  const id = props.id;
  const [info,setInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/landlord/ID/${id}`,
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem("token")}` 
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setInfo(response.data);
        console.log(info.name);
      })
      .catch((error) => {
        console.log(error);
        navigate("*");
      });
  },[])
  return (
    <div>
      <button onClick={handleOpenModal}>Book this location</button>
      <Backdrop className={classes.backdrop} open={isOpen} >
        <div className="modal">
          <span class="closebutton" onClick={handleCloseModal}>&times;</span>
            <label>To book this location, please call the landlord on the provided number below</label>
            <label>Name of Landlord: {info.name}</label>
            <label>Contact Number: {info.cnic}</label>
        </div>
      </Backdrop>
    </div>
  );
}

export default LandlordDetails;