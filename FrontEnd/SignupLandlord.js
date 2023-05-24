// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import form from "./iamges/Form.png";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SignupUser.css";
// import axios from "axios";

// export const SignInSide = (props) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [pw, setPasswrod] = useState("");
//   const [cnic, setCnic] = useState("");
//   const [birthdate, setBirthdate] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const validateForm = () => {
//     return name && pw && cnic && email && birthdate;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Button is clicked");

//     let data = JSON.stringify({
//       name: `${name}`,
//       password: `${pw}`,
//       cnic: `${cnic}`,
//       birthdate: `${birthdate}`,
//       email: `${email}`,
//     });

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:3001/user",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         console.log("Api call");
//         navigate("/loginU");
//       })
//       .catch((error) => {
//         console.log(error);
//         setError("Email already in use");
//       });
//   };

//   return (
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
//         rel="stylesheet"
//       />
//       <CssBaseline />
//       <Grid
//         item
//         xs={false}
//         sm={4}
//         md={7}
//         sx={{
//           backgroundImage: "url(" + form + ")",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />
//       <Grid
//         item
//         xs={12}
//         sm={8}
//         md={5}
//         component={Paper}
//         elevation={6}
//         square
//         sx={{ backgroundColor: "#FFD9D9" }}
//       >
//         <Box
//           sx={{
//             my: 10,
//             mx: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar> */}
//           <Typography className="h" variant="h5">
//             SIGNUP AS USER
//           </Typography>
//           <Box
//             className="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 1, backgroundColor: "white", borderRadius: "5%" }}
//           >
//             <TextField
//               margin="normal"
//               required
//               id="name"
//               label="Name"
//               name="name"
//               autoComplete="name"
//               autoFocus
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="my-text-field"
//             />
//             <TextField
//               margin="normal"
//               required
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="my-text-field"
//             />
//             <TextField
//               margin="normal"
//               required
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={pw}
//               onChange={(e) => setPasswrod(e.target.value)}
//               className="my-text-field"
//             />
//             <TextField
//               margin="normal"
//               required
//               name="cnic"
//               label="CNIC"
//               type="cnic"
//               id="cnic"
//               autoComplete="cnic"
//               value={cnic}
//               onChange={(e) => setCnic(e.target.value)}
//               className="my-text-field"
//             />
//             <TextField
//               margin="normal"
//               required
//               name="birthdate"
//               label="yyyy-mm-dd"
//               type="birthday"
//               id="birthday"
//               autoComplete="birthday"
//               value={birthdate}
//               onChange={(e) => setBirthdate(e.target.value)}
//               className="my-text-field"
//             />
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: "10px",
//               }}
//             >
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: -5,
//                   mb: 8,
//                   width: "70%",
//                   backgroundColor: "#f2a3a3",
//                   "&:hover": {
//                     backgroundColor: "#dfa8a8",
//                   },
//                 }}
//                 className="bt"
//                 disabled={!validateForm()}
//                 onClick={handleSubmit}
//               >
//                 Sign In
//               </Button>
//               <div>{error}</div>
//             </div>
//             <Typography
//               variant="h"
//               color="text.secondary"
//               sx={{ ml: 2, zIndex: 1 }}
//             >
//               Already have an account?
//             </Typography>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: "10px",
//               }}
//             >
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: -5,
//                   mb: 8,
//                   width: "70%",
//                   backgroundColor: "#f2a3a3",
//                   "&:hover": {
//                     backgroundColor: "#dfa8a8",
//                   },
//                 }}
//               >
//                 LogIn
//               </Button>
//             </div>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import form from "./iamges/Form.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupUser.css";
import axios from "axios";

export const SignupLandlord = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPasswrod] = useState("");
  const [cnic, setCnic] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validateForm = () => {
       return name && pw && cnic && email;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    let data = JSON.stringify({
              name: `${name}`,
              password: `${pw}`,
              cnic: `${cnic}`,
              email: `${email}`,
            });
        
            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url: "http://localhost:3001/landlord",
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };
        
            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log("Api call");
                navigate("/loginU");
              })
              .catch((error) => {
                console.log(error);
                setError("Email already in use");
              });
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
            SIGNUP AS USER
          </h1>
          <Box
            className="form1"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, backgroundColor: "white", borderRadius: "5%" }}
          >
            <TextField
              margin="normal"
              required
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="my-text-field"
            />
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
              className="my-text-field"
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
              className="my-text-field"
            />
            <TextField
              margin="normal"
              required
              name="cnic"
              label="CNIC"
              type="cnic"
              id="cnic"
              autoComplete="cnic"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="my-text-field"
            />
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
                disabled={!validateForm()}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <div>{error}</div>
            </div>
            <Typography
              variant="h"
              color="text.secondary"
              sx={{ ml: 2, zIndex: 1 }}
            >
              Already have an account?
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
                LogIn
              </Button>
            </div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
