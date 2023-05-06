import React, { useState } from "react";
import "./SearchBar.css";

const areas = [
  "Area A",
  "Area B",
  "Area C",
  "Area D",
  "Area E",
  "Area F",
  "Area G",
  "Area H",
];

const types = ["Banquet", "Lawn", "Hall", "Hotel", "Resort"];

export const SearchBar = () => {
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [capacityMin, setCapacityMin] = useState("");
  const [capacityMax, setCapacityMax] = useState("");
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleTypeChange = (event) => {
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

  const handleAreaDropdownItemClick = () => {
    setShowAreaDropdown(false);
  };

  const handleTypeDropdownItemClick = () => {
    setShowTypeDropdown(false);
  };

  const handleAreaSelect = (value) => {
    setArea(value);
    setShowAreaDropdown(false);
  };
  

  return (
    <div className="search-bar-container">

      <div className="search-bar">
        {/* Area */}
        <div className="search-bar-input-container">Area
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search areas"
            value={area}
            onChange={handleAreaChange}
          />
          {area && (
            <div className="search-bar-dropdown">
              {areas
                .filter((item) => item.toLowerCase().includes(area.toLowerCase()))
                .map((item, index) => (
                  <div key={index} className="search-bar-dropdown-item"
                  onClick={() => setArea(item)} >
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>
        {/* TYPPE */}
        <div className="search-bar-input-container">Type
          <input
            className="search-bar-inputT"
            type="text"
            placeholder="Search types"
            value={type}
            onChange={handleTypeChange}
          />
          {type && (
            <div className="search-bar-dropdownT">
              {types
                .filter((item) => item.toLowerCase().includes(type.toLowerCase()))
                .map((item, index) => (
                  <div key={index} className="search-bar-dropdown-item">
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>
        <button className="search-bar-search-button">
              <i className="fas fa-search"></i>
        </button>
        {/* proce */}
        <div className="search-bar-input-container1">
          <div className="search-bar-range-input">
            <input
              className="search-bar-input1"
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={handlePriceMinChange}
            />
            <div className="search-bar-range-input-label">Price</div>
            <input
              className="search-bar-input1"
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={handlePriceMaxChange}
            />
          </div>
          </div>
          <div className="search-bar-input-container1">
          <div className="search-bar-range-input">
            <input
              className="search-bar-input1"
              type="number"
              placeholder="Min"
              value={capacityMin}
              onChange={handleCapacityMinChange}
              />
              <div className="search-bar-range-input-label">Capacity</div>
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
    </div>
  )};
           
