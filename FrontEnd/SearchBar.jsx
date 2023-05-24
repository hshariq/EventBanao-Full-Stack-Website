import React, { useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ onSearch }) => {
  const [area, setArea] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [type, setType] = useState("");
  const [searchType, setSearchType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [capacityMin, setCapacityMin] = useState("");
  const [capacityMax, setCapacityMax] = useState("");
  const [areaDropdowns, setAreaDropdowns] = useState([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [areas, setAreas] = useState([]);
  const types = ["Banquet", "Lawn", "Hall", "Hotel", "Resort"];
  // const types = [
  //   {
  //     locationArea: "dha",
  //   },
  //   {
  //     locationArea: "Downtown",
  //   },
  //   {
  //     locationArea: "gulshan",
  //   },
  // ];

  const handleAreaChange = (event) => {
    setSearchArea(event.target.value);
    setArea(event.target.value);
    console.log(areas);
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
    setType(event.target.value);
  };

  const handlePriceMinChange = (event) => {
    setPriceMin(event.target.value);
  };

  const handlePriceMaxChange = (event) => {
    setPriceMax(event.target.value);
  };

  const handleCapacityMinChange = (event) => {
    setCapacityMin(event.target.value);
  };

  const handleCapacityMaxChange = (event) => {
    setCapacityMax(event.target.value);
  };

  const handleAreaSelect = (value) => {
    setArea(value);
    setSearchArea("");
    //setShowAreaDropdown(false);
  };

  const handleTypeSelect = (value) => {
    setType(value);
    setSearchType("");
    //setShowAreaDropdown(false);
  };

  const handleSubmit = () => {
    const params = {
      location: area,
      maxCapacity: capacityMax,
      minCapacity: capacityMin,
      minPrice: priceMin,
      maxPrice: priceMax,
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/location/filter`,
      headers: {
        Authorization:
        `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const filteredParams = Object.entries(params)
      .filter(([key, value]) => value !== null)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    const queryString = Object.entries(filteredParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    config.url += `?${queryString}`;

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        onSearch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMoreOptionsClick = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/location/distinctLocations",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log("HELLLLLO");
        console.log(response.data[0]);
        setAreas(response.data);
      })
      .catch((error) => {
        console.log("eROOR", error);
      });
  }, []);

  return (
    <div className="search-bar-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <div className="search-bar">
        {/* Area */}
        <div className="search-bar-input-container">
          Area
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search areas"
            value={area}
            onChange={handleAreaChange}
          />
          {searchArea && (
            <div className="search-bar-dropdown">
              {areas
                .filter((item) =>
                  item.locationArea.toLowerCase().includes(area.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="search-bar-dropdown-item"
                    onClick={() => handleAreaSelect(item.locationArea)}
                  >
                    {item.locationArea}
                  </div>
                ))}
            </div>
          )}
        </div>
        {/* TYPPE */}
        <div className="search-bar-input-container">
          Type
          <input
            className="search-bar-inputT"
            type="text"
            placeholder="Search types"
            value={type}
            onChange={handleTypeChange}
          />
          {searchType && (
            <div className="search-bar-dropdownT">
              {types
                .filter((item) =>
                  item.toLowerCase().includes(type.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="search-bar-dropdown-item"
                    onClick={() => handleTypeSelect(item)}
                  >
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>
        <button onClick={handleSubmit} className="search-bar-search-button">
          <i className="fas fa-search"></i>
        </button>
        <button onClick={handleMoreOptionsClick} className="moreButton">
          <i className="fas fa-caret-down"></i>
          {showMoreOptions ? "Less Options" : "More Options"}
        </button>
        {/* <div className="more-options"> */}
        <div
          className="optional-fields"
          style={{ height: showMoreOptions ? "auto" : 0, overflow: "hidden" }}
        >
          {/* proce */}
          <div className="search-bar-input-container1">
            Price
            <div className="search-bar-range-input">
              <input
                className="search-bar-input1"
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={handlePriceMinChange}
              />
              <div className="search-bar-range-input-label">to</div>
              <input
                className="search-bar-input1"
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={handlePriceMaxChange}
              />
            </div>
          </div>
          <div className="search-bar-input-container1Cap">
            Capacity
            <div className="search-bar-range-input">
              <input
                className="search-bar-input1"
                type="number"
                placeholder="Min"
                value={capacityMin}
                onChange={handleCapacityMinChange}
              />
              <div className="search-bar-range-input-label">to</div>
              <input
                className="search-bar-input1"
                type="number"
                placeholder="Max"
                value={capacityMax}
                onChange={handleCapacityMaxChange}
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
