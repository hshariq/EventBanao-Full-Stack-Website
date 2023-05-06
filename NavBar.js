import { Link } from "react-router-dom"
import './NavBar.css'
import logo from './eventlogo.svg';
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

 
  


const NavBar = () => {
  const [isAdmin,setIsAdmin] = React.useState(false);
  const [isLandlord,setIsLandlord] = React.useState(false);
  const [isUser,setIsUser] = React.useState(false);
  useEffect(() => {
     const domain = jwtDecode(localStorage.getItem("token")).userType;
     if (domain == "admin"){
        setIsAdmin(true);
     }
     else if(domain == "user"){
        setIsUser(true);
     }
     else {
       setIsLandlord(true);
     }
     },[]);
   
  return(
<>
   {/* <div>
   <img src={logo} alt="Event Logo" className="logo" />
   <Link className="nav-button" to="/about">About</Link>
   <Link className="nav-button" to ="/location">Location</Link>
   <Link className="nav-button" to="/"><img src="https://static.vecteezy.com/system/resources/previews/000/574/782/original/vector-logout-sign-icon.jpg" alt="Button Image" style={{ width: '100px', height: '50px' }} /></Link>
   </div> */
   }

<nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link className="navbar-button" to= "/about" >About</Link>
        <Link className="navbar-button"to="/home">Home</Link>
      </div>
      <div className="navbar-right">
        {}
        <>{isAdmin ? "Admin" : isLandlord ? "Landlord" : isUser ? "User" : ""}</>
        <Link className="logout-button" to= "/">Logout</Link>
      </div>
    </nav>
  
   

</>
)

}
export default NavBar;