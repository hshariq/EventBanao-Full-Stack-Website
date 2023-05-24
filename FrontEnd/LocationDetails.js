import { useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import ReviewModal from "./addReview";
import LandlordDetails from "./LandlordDetails";
import ReviewList from "./Review";
import jwtDecode from "jwt-decode";
import SideBar from "./Components/SideBardata";
import "./locationDetails.css";

//MAKE API TO RETURN SINGLE LOCATION WITH DETAILS ON BACKEND

const ReviewButton = () => {
  const id = useParams().id;
  console.log(`THIS IS ID ${id}`);
  const domain = jwtDecode(localStorage.getItem("token")).userType;
  if (domain == "user") {
    return (
      <div className="addButton">
        <ReviewModal id={id} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

const Location = ({ location }) => {
  const id = useParams().id;
  return (
    <div className="card-container">
      <div className="card-left">
      <h2>{location.locationName}</h2>
      <p>
        <img src={location.image} alt="" className="image" />
      </p>
      </div>
      <div className="card-right">
        <div className="details">
          <label>
            {location.locationArea}, {location.locationAddress}
          </label>
          <label>Rent: {location.locationRent}</label>
          <label>Capacity: {location.Capacity}</label>
          </div>
       
      </div>
    </div>
  );
};

const LocationDetails = () => {
  const id = useParams().id;
  console.log(`THIS IS ID ${id}`);
  const [locations, setLocations] = useState([]);
  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/location/${id}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkd0FzQUNBWmVMRW1ZYmh5U29NbmxxdXVEMkxHM3ZWOTJiclJlOEU0b2lad21kSFVZcnVQQWEiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNjgwMjk0MjI5fQ.qWwpK6nHlRr_RrR372ufQ8QYP7ZT8qckNK5vB2Ij71w",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="left-page">
        <SideBar />
      </div>
      <div className="right-page">
        <h1 className="locations-heading">This is your location</h1>
        {locations.map((location) => (
          <Location key={location.locationID} location={location} />
        ))}
        <div className="landlordButton">
          <LandlordDetails id={id} />
        </div>
        <ReviewList />
        <ReviewButton />
       
      </div>
    </div>
  );
};

export default LocationDetails;
