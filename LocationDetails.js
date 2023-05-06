import { useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import ReviewList from "./Review";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ReviewModal from "./addReview";

//MAKE API TO RETURN SINGLE LOCATION WITH DETAILS ON BACKEND


const ReviewButton = () => { 
  const id = useParams().id;
  console.log(`THIS IS ID ${id}`);
  const domain = jwtDecode(localStorage.getItem("token")).userType;
  if (domain == "user") {
        return(      
        <div className="addButton">
             <ReviewModal id={id}/>
        </div>
     );
     }
     else {
      return(
        <div></div>
      )
     }
  };

const Location = ({ location}) => {
     return (
      <div>
        <h2>{location.locationName}</h2>
        <p> <img src= {location.image} alt="" className="image"/></p>
        <p>
          {location.locationArea}, {location.locationAddress}
        </p>
        <p>Rent: {location.locationRent}</p>
        <p>Capacity: {location.Capacity}</p>
      </div>
    );
 };

const LocationDetails = () => {
    const id = useParams().id;
    console.log(`THIS IS ID ${id}`);
    const [locations, setLocations] = useState([]);
    React.useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3001/location/${id}`,
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkd0FzQUNBWmVMRW1ZYmh5U29NbmxxdXVEMkxHM3ZWOTJiclJlOEU0b2lad21kSFVZcnVQQWEiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNjgwMjk0MjI5fQ.qWwpK6nHlRr_RrR372ufQ8QYP7ZT8qckNK5vB2Ij71w'
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setLocations(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);
    
    return (
      
      <div className="locations-container">
        <NavBar/>
        <h1 className="locations-heading">This is your location</h1>
        {locations.map((location) => (
          <Location key={location.locationID} location={location} />
        ))}
        <ReviewButton/>
        <ReviewList/>
      </div>
    );
};

export default LocationDetails;