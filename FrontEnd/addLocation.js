import React, { useEffect, useState } from "react";
import "./addLocation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
import SideBar from "./Components/SideBardata";

function AddLocation() {
  const [locationName, setLocationName] = useState([]);
  const [locationArea, setLocationArea] = useState([]);
  const [locationAddress, setLocationAddress] = useState([]);
  const [locationRent, setLocationRent] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [capacity, setCapacity] = useState();
  const [id, setID] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    let data = JSON.stringify({
      locationName: `${locationName}`,
      locationArea: `${locationArea}`,
      locationAddress: `${locationAddress}`,
      locationRent: `${locationRent}`,
      image: `${imageUrl}`,
      Archived: "0",
      Capacity: `${capacity}`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/location",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/myVenues");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log({
      locationName,
      locationArea,
      locationAddress,
      locationRent,
      imageUpload,
      capacity,
    });
  };

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleLocationAreaChange = (e) => {
    setLocationArea(e.target.value);
  };

  const handleLocationAddressChange = (e) => {
    setLocationAddress(e.target.value);
  };

  const handleLocationRentChange = (e) => {
    setLocationRent(e.target.value);
  };

  const UploadImage = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/location/id",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    var newId;

    try {
      var response = await axios.request(config);
      console.log("response:");
      console.log(response);
      console.log(response.data[0].last_id + 1);
      newId = response.data[0].last_id + 1;
      setID(response.data[0].last_id + 1);
      // console.log(`This is ur id: ${id}`);
      console.log(`This is ur id` + response.data[0].last_id + 1);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

      console.log("New id:");
      console.log(newId);
    } catch {
      console.log("api not work");
    }

    const imageRef = ref(storage, `images/` + newId);
    await uploadBytes(imageRef, imageUpload);
    // .then(() => {
    //          alert("Image Uploaded")
    // })

    const imageRefUrl = ref(
      storage,
      `gs://uploadimage-2ed90.appspot.com/images/` + newId
    );
    getDownloadURL(imageRefUrl)
      .then((url) => {
        setImageUrl(url);
        console.log(`Image URL: ${imageUrl}`);
      })
      .catch((error) => {
        console.error("Error retrieving image URL:", error);
      });

    console.log("Omage uplaoded");
    console.log(newId);
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const validateForm = () => {
    if (locationAddress.length >= 255) return false;
    return (
      locationName &&
      locationArea &&
      locationAddress &&
      locationRent &&
      imageUrl &&
      capacity
    );
  };

  return (
    <div className="parent">
      <div className="SB">
        {" "}
        <SideBar />
      </div>

      <div className="container">
        <div className="heading">
          <h1>Add a Location</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="locationName">Location Name</label>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={handleLocationNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="locationArea">Location Area</label>
            <input
              type="text"
              id="locationArea"
              value={locationArea}
              onChange={handleLocationAreaChange}
              required
            />
          </div>
          <div>
            <label htmlFor="locationAddress">Location Address</label>
            <input
              type="text"
              id="locationAddress"
              value={locationAddress}
              onChange={handleLocationAddressChange}
              required
            />
          </div>
          <div>
            <label htmlFor="locationRent">Location Rent</label>
            <input
              type="number"
              id="locationRent"
              value={locationRent}
              onChange={handleLocationRentChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <div>
              <input
                type="file"
                name="myImage"
                onChange={(event) => setImageUpload(event.target.files[0])}
              />
              <button type="button" className="upload" onClick={UploadImage}>
                Upload
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={handleCapacityChange}
              required
            />
          </div>

          <button
            type="button"
            className="submit"
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLocation;
