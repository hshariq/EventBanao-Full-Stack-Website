import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import './AddLocation.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {storage} from './firebase';
import {ref , uploadBytes, listAll,list, getDownloadURL} from 'firebase/storage';


function AddLocation() {
  const [locationName, setLocationName] = useState("test");
  const [locationArea, setLocationArea] = useState("test");
  const [locationAddress, setLocationAddress] = useState("test");
  const [locationRent, setLocationRent] = useState("123");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [capacity, setCapacity] = useState("123");
  const [id,setID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
   
    
    let data = JSON.stringify({
        "locationName":`${locationName}`,
        "locationArea": `${locationArea}`,
        "locationAddress": `${locationAddress}`,
        "locationRent": `${locationRent}`,
        "image": `${imageUrl}`,
        "Archived": "0",
        "Capacity": `${capacity}`
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/location',
      headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhbGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQmwvcHZlYjNQWWRWNFNsZWI2SktvZVpGSUhrREFwL2ZKNk1NcFdCMWRiUEtIeEFrRnhrQ3UiLCJ1c2VyVHlwZSI6ImxhbmRsb3JkIiwiaWF0IjoxNjgwOTkwMTM4fQ.k255pC2TJ5_P_4YeZZrbIIzc5AR1WWguNvMK5uMPmtk', 
          'Content-Type': 'application/json'
      },
     data : data
    };
    axios.request(config)
.     then((response) => {
      console.log(JSON.stringify(response.data));
      navigate("/home");
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

  // const handleImageChange = (event) => {
  //     setImageUpload(event.target.files[0]);
  //     // if (imageUpload == null) return;
  //     let config = {
  //       method: 'get',
  //       maxBodyLength: Infinity,
  //       url: 'http://localhost:3001/location/id',
  //       headers: { 
  //         'Authorization': `Bearer ${localStorage.getItem("token")}`
  //       },
  //     };
      
  //     axios.request(config)
  //     .then((response) => {
  //       setID((response.data[0].last_id + 1));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
      
      
  //     const imageRef = ref(storage, `images/${id}`);
  //     const upload = async (req,res) => {
  //          await uploadBytes(imageRef,imageUpload).then(() => {
  //              alert("Image Uploaded")
  //     })
  //   }
  
  //   upload();
      
      
  //   const imageRefUrl = ref(storage, `images/`);
  //   const getUrl = async (req,res) => {
  //       await listAll(imageRefUrl).then((response) => {
  //       response.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setImageUrl(url);
  //           console.log(`${imageUrl}`);
  //         })
  //       })
  //       console.log(response);
  //     })
  //   }
  
  //   getUrl();
  //   console.log("Omage uplaoded")
  //   console.log(`${id}`);
  // }

  const UploadImage = async ()  =>{
    // if (imageUpload == null) return;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/location/id',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    };
    
    var newId ;

     var response =  await axios.request(config)
    // .then((response) => {
      console.log("response:")
      console.log(response)
      console.log(response.data[0].last_id + 1)
      newId = response.data[0].last_id + 1
      setID((response.data[0].last_id + 1));
       // console.log(`This is ur id: ${id}`);
        console.log(`This is ur id` + response.data[0].last_id + 1)
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    
    console.log("New id:")
    console.log(newId)
    
    const imageRef = ref(storage, `images/` + newId);
    await uploadBytes(imageRef,imageUpload)
    // .then(() => {
    //          alert("Image Uploaded")
    // })
  
  const imageRefUrl = ref(storage, `gs://uploadimage-2ed90.appspot.com/images/` + newId);
  getDownloadURL(imageRefUrl).then((url) => {
    setImageUrl(url);
    console.log(`Image URL: ${imageUrl}`);
  }).catch((error) => {
    console.error('Error retrieving image URL:', error);
  });

  
  console.log("Omage uplaoded")
  console.log(newId);
  
  
  };

  

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const validateForm = () => {
    if (locationAddress.length >= 255)
      return false;
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
    <>
    <div className="container">
    <NavBar/>
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
          <button type="button" onClick={UploadImage}>Upload</button>
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
      
       <button type="button" onClick={handleSubmit} disabled={!validateForm()}>
         Submit
      </button>
     
    </form>
    </div>
    </>
  );
}

export default AddLocation;
