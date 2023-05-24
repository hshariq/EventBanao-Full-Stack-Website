import React from "react";
import { useState } from "react";
import form from "./iamges/Form.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

export const RegisterU = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPasswrod] = useState("");
  const [cnic, setCnic] = useState("");
  const [birthdate,setBirthdate] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const validateForm = () => {
    return name && pw && cnic && email && birthdate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    let data = JSON.stringify({
        "name": `${name}`,
        "password": `${pw}`,
        "cnic": `${cnic}`,
        "birthdate": `${birthdate}`,
        "email": `${email}`
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/user',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/loginU");
      })
      .catch((error) => {
        console.log(error);
        setError("Email already in use");
        
      });

  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <div className="img">
        <img src={form} alt="Form" className="img1" />
      </div>
      <div className="auth-FormContainter">
        <div className="SmallContainer">
          <h2 className="h">Signup as User</h2>
          <form className="ResiterForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="Name"
              id="name"
              name="name"
            />
            <label htmlFor="Email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@gmail.com"
              id="email"
              name="email"
            />
            <label htmlFor="Password">Password</label>
            <input
              value={pw}
              onChange={(e) => setPasswrod(e.target.value)}
              type="password"
              placeholder="*****"
              id="password"
              name="password"
            />
            <label htmlFor="Cnic">CNIC</label>
            <input
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              type="cnic"
              placeholder="42201-..."
              id="cnic"
              name="cnic"
            />
             <label htmlFor="Birthdate">Date of Birth</label>
            <input
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              type="birthdate"
              placeholder="yyyy-mm-dd"
              id="birthdate"
              name="birthdate"
            />
            {/* <button className="SignUpRegButton">SIGNUP</button> */}
            <div className="error">{error}</div>
            <button disabled={!validateForm()}>SIGNUP</button>
            {/* <button onClick={()=> props.onFormSwitch('login')}>LOGIN</button> */}
          </form>
          <label className="Already">Already Have an Account?</label>
          <button className="LU">
            <Link to="/loginU">LOGIN</Link>
          </button>
        </div>
      </div>
    </>
  );
};
