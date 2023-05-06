import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Login } from './login';
import { Register } from './register';
import Title_Page from './title_page';
import { Dashboard } from './Components/dashboard';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { LoginU } from './loginU';
import { RegisterU } from './signupU';
import {EventHallList} from './MyVenues';
import Member1 from './Team';
import {SearchBar} from './SearchBar';

function App() {
  const [currForm,setCurrForm]=useState('login');

  const toggleForm= (formName) => {
    setCurrForm(formName)
  }

  return (
      <Router>
      <Routes>
      <Route exact path='/' element={<Title_Page/>}/>
      <Route exact path='/DB' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/loginU' element={<LoginU/>}/>
      <Route path='/signupU' element={<RegisterU/>}/>
      <Route path='/MyVenues' element={<EventHallList/>}/>
      <Route path='/Team' element={<Member1/>}/>
      <Route exact path='/SearchBar' element={<SearchBar/>}/>

      </Routes>
    </Router>
      

  );
}

export default App;

// {/* {
//         currForm == "login" ? <Login/>: <Register/>
//       } */}
