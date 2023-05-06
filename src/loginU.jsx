import React from "react"
import { useState } from "react"
import form from "./iamges/Form.png"
import { useNavigate } from "react-router-dom"
import './Login.css';
import {Link} from 'react-router-dom'
 

export const LoginU = (props) =>{
    
    const[email, setEmail]=useState('');
    const[pw,setPasswrod]=useState('');
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
            <h2 className="HeaderLOgin">Login as User</h2>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}type="email" placeholder="email@gmail.com" id="email" name="email"/>
                <label htmlFor="Password">Password</label>
                <input value={pw} onChange={(e)=> setPasswrod(e.target.value)}type="password" placeholder="*****" id="password" name="password"/>
                <button >
                    {/* <Link to = '/'> */}
                    LOGIN
                    {/* </Link> */}
                </button>                
            </form>
            <label>Not Registered?</label>
            {/* <button onClick={()=> props.onFormSwitch('register')}>SIGNUP</button> */}
            <button className="SU"> 
                <Link to = '/signupU'>
                    SIGNUP
                </Link>
            </button>
        </div>
        </div>
    </>
    )
}