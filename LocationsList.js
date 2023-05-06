import React, { useState } from "react";
import "./LocationsList.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import SideBar from "./SideBar";

const LocationButton = () => {
  const navigate = useNavigate();
  const add = (event) => {
    event.preventDefault();
    navigate("/addLocation");
  };

  const domain = jwtDecode(localStorage.getItem("token")).userType;
  if (domain == "admin") {
    return (
      <div className="addButton">
        <button onClick={add} className="hello">
          Add a Location
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const LocationCard = ({ location }) => {
  const navigate = useNavigate();
  console.log(location.image);
  const handleBooking = () => {
    navigate(`/location/${location.locationID}`);
  };
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ8fSutPfnvrchFksz5P06HO7PnAyg7F6-9trWPbJuKw&s";

  return (
    <div className="location-card" key={location.locationID}>
      <div className="left">
        <img src={location.image} alt="" className="image" />
      </div>
      <div className="right">
        <h2>{location.locationName}</h2>
        <p>
          {location.locationArea},{location.locationAddress}
        </p>
        <p>Rent: {location.locationRent}</p>
        <p>Capacity: {location.Capacity}</p>
      </div>
      <button onClick={handleBooking}>Book Location</button>
    </div>
  );
};

const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/location",
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
      <SideBar/>
    </div>
    <div class="right-page">
    <div className="locations-container">
      
     
      <h1 className="locations-heading">List of Locations</h1>
      {locations.map((location) => (
        <LocationCard key={location.locationID} location={location} />
      ))}
      <LocationButton />
    </div>
    </div>
    </div>  
  );
};

export default LocationsList;
