import React from "react";
import { useState } from "react";
import form from "./iamges/Form.png";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Register.css';


export const Register =(props) =>{
    const[email, setEmail]=useState('');
     const[name, setName]=useState('');
    const[pw,setPasswrod]=useState('');
    const[cnic,setCnic]=useState('');
    const navigate = useNavigate();


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email);
        navigate("/DB");
    }
    
    return(
        <> 
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
        <div className="img">
            <img
            src={form}
            alt="Form"
            className="img1"
        />
        </div>
        <div className="auth-FormContainter"> 
        <div className="SmallContainer">
            <h2 className="h">Signup as Landlord</h2>
            <form className="ResiterForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e)=> setName(e.target.value)}type="name" placeholder="Name" id="name" name="name"/>
                <label htmlFor="Email">Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}type="email" placeholder="email@gmail.com" id="email" name="email"/>
                <label htmlFor="Password">Password</label>
                <input value={pw} onChange={(e)=> setPasswrod(e.target.value)}type="password" placeholder="*****" id="password" name="password"/>
                <label htmlFor="Cnic">CNIC</label>
                <input value={cnic} onChange={(e)=> setCnic(e.target.value)}type="cnic" placeholder="42201-..." id="cnic" name="cnic"/>
                {/* <button className="SignUpRegButton">SIGNUP</button> */}
                <button>SIGNUP</button>
                {/* <button onClick={()=> props.onFormSwitch('login')}>LOGIN</button> */}
            </form>
            <label className="Already">Already Have an Account?</label>
            <button className="LU">
            <Link to = '/login'>
                    LOGIN
            </Link>
            </button>
            </div>
        </div>
        </>
    )
} 