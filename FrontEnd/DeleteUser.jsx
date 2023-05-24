import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import "./LocationList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import SideBar from "./Components/SideBardata";

const LandlordCard = ({ location }) => {
  const navigate = useNavigate();
  console.log(location.image);
  const handleBooking = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/admin/${location.landlordID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ8fSutPfnvrchFksz5P06HO7PnAyg7F6-9trWPbJuKw&s";

  return (
    <div className="location-card" key={location.locationID}>
      <div className="left">
        <img src={location.image} alt="" className="image" />
      </div>
      <div className="right">
        <h2>Name: {location.landlordName}</h2>

        <p>ID : {location.landlordID}</p>
        <p>email: {location.email}</p>
        <p>Contact Number: {location.cnic}</p>
      </div>
      <button classname="card-button" onClick={handleBooking}>
        Delete Landlords
      </button>
    </div>
  );
};

const LandlordList = () => {
  const [landlords, setLandlords] = useState([]);
  const navigate = useNavigate();
  const handleSearch = (searchLocations) => {};
  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/landlord",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLandlords(response.data);
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
      <div className="locations-container">
        <div className="Search">
          <SearchBar onSearch={handleSearch} />
        </div>
        <h1 className="locations-heading">List of Landlords</h1>
        {landlords.map((location) => (
          <LandlordCard key={location.locationID} location={location} />
        ))}
      </div>
    </div>
  );
};
export default LandlordList;
