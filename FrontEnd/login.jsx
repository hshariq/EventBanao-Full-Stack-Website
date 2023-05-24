import React from "react";
import { useState } from "react";
import form from "./iamges/Form.png";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pw, setPasswrod] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    let data = JSON.stringify({
      email: `${email}`,
      password: `${pw}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/landlord/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.data);
        console.log(localStorage.getItem("token"));
        navigate("/DB");
      })
      .catch((error) => {
        console.log(error);
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
          <h2 className="HeaderLOgin">Login as Landlord</h2>
          <form className="LoginForm" onSubmit={handleSubmit}>
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
            <button>
              {/* <Link to = '/'> */}
              LOGIN
              {/* </Link> */}
            </button>
          </form>
          <label>Not Registered?</label>
          {/* <button onClick={()=> props.onFormSwitch('register')}>SIGNUP</button> */}
          <button className="SU">
            <Link to="/signup">SIGNUP</Link>
          </button>
        </div>
      </div>
    </>
  );
};
