import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import logo from './eventlogo.svg';
import axios from 'axios';





const Login = () => {
  const [email, setEmail] = useState('ali@gmail.com');
  const [password, setPassword] = useState('password');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedError, setSelectedError] = useState('');
  const [loginError,setLoginError] = useState('');
   
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      let data = JSON.stringify({
        "email": email,
        "password": password,
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/${selectedOption}/login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(`The status is: ${response.status}`);
        console.log(selectedOption);
        console.log(config.url);
            localStorage.setItem("token", response.data)
            console.log(localStorage.getItem("token"));
            navigate('/home');
      })
      .catch((error) => {
        console.log("API NOT WORK");
        setLoginError("Email or password incorrect")
      });
      
      
       
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (!selectedOption){
        setSelectedError('Please select an option.');
        isValid = false;
    } else {
        setSelectedError('');
    }
    return isValid;
  };

  return (
    <>
    <div className="loginPage">
      <div className="loginFormContainer">
      <img src={logo} alt="Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="options">Login as:</label>
            <select
              id="options"
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >

            
             
             
              <option value="">Choose an option</option>
              <option value="user">User</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
            {selectedError && <p className="error">{selectedError}</p>}
          </div>
          <div> 
               <button type="submit">Login</button>
               {<p className="error">{loginError}</p>}
         </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
