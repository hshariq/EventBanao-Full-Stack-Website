import React, { useState } from "react";

import { SearchBar } from "./SearchBar";
import "./LocationList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import SideBar from "./Components/SideBardata";

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
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/location/increment/${location.locationID}`,
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
          Area: {location.locationArea}</p>
          <p>Address: {location.locationAddress}</p>
        
        <p>Rent: {location.locationRent}</p>
        <p>Capacity: {location.Capacity}</p>
      </div>
      <button classname="card-button" onClick={handleBooking}>Book Location</button>
    </div>
  );
};

const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations,setfilteredLocations] = useState([]);
  const [showAllLocations, setShowAllLocations] = useState(true);
  const navigate = useNavigate();
  const handleSearch = (searchLocations) => {
    setfilteredLocations(searchLocations);
    setShowAllLocations(false);
  };
  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/location",
      headers: {
        Authorization:
        `Bearer ${localStorage.getItem("token")}`,
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
      <div className="locations-container">
      <div className="Search">
          <SearchBar onSearch={handleSearch} />
        </div>
        <h1 className="locations-heading">List of Locations</h1>
        {showAllLocations
          ? locations.map((location) => (
              <LocationCard key={location.locationID} location={location} />
            ))
          : filteredLocations.map((location) => (
              <LocationCard key={location.locationID} location={location} />
        ))}
        <LocationButton />
        <LocationButton />
      </div>
    </div>
  );
};

export default LocationsList;
