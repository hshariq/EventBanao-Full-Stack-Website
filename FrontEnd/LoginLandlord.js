import React from "react";
import { useState } from "react";
import form from "./iamges/Form.png";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const LoginLandlord = (props) => {
  const [email, setEmail] = useState("");
  const [pw, setPasswrod] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedError, setSelectedError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm(); //checking if valid or not
    if (isValid) {
      let data = JSON.stringify({
        email: email,
        password: pw,
      });

      let config = {
        //configguration object for axios request
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:3001/landlord/login`, //api link
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config);

      axios
        .request(config)
        .then((response) => {
          //.then has 200 status code
          console.log(JSON.stringify(response.data));
          console.log(`The status is: ${response.status}`);
          console.log(selectedOption);
          console.log(config.url);
          localStorage.setItem("token", response.data);
          console.log(localStorage.getItem("token"));
          navigate("/DB");
        })
        .catch((error) => {
          //.catch has 400 or 500 status code
          console.log("API NOT WORK");
          setLoginError("Email or password incorrect");
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!pw || pw.length < 1) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(" + form + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ backgroundColor: "#FFD9D9" }}
      >
        <Box
          sx={{
            my: 10,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
          <h1 className="headerofLogin" variant="h5">
            LOGIN AS LANDLORD

          </h1>
          <Box
            className="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, backgroundColor: "white", borderRadius: "5%" }}
          >
            <TextField
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-text-fieldLU"
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPasswrod(e.target.value)}
              className="my-text-fieldLU"
            />
             {passwordError}
            <h6 className="LoginError">{loginError}</h6>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                // disabled={!validateForm()}
                sx={{
                  mt: -5,
                  mb: 8,
                  width: "70%",
                  backgroundColor: "#f2a3a3",
                  "&:hover": {
                    backgroundColor: "#dfa8a8",
                  },
                }}
                className="bt"
                
              >
                Log In
              </Button>
            </div>
            <Typography
              variant="h"
              color="text.secondary"
              sx={{ ml: 2, zIndex: 1 }}
            >
              Do not have an account?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: -5,
                  mb: 8,
                  width: "70%",
                  backgroundColor: "#f2a3a3",
                  "&:hover": {
                    backgroundColor: "#dfa8a8",
                  },
                }}
                className="bt"
              >
                <Link to="/signupU">SIGNUP</Link>
              </Button>
            </div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

         
  
