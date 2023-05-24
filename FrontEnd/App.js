import React, {useState} from 'react';
import './App.css';
import {Login } from './login';
import { Register } from './register';
import Title_Page from './title_page';
import { Dashboard } from './Components/dashboard';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { LoginU } from './loginU';
import { RegisterU } from './signupU';
import Member1 from './Team';
import {SearchBar} from './SearchBar';
import LocationsList from './locationsList';
import Testing from './testing';
import LocationDetails from './LocationDetails';
import AddLocation from './addLocation';
import MyVenues from './MyVenues';
import ArchivedVenues from './ArchivedVenues';
import { SignInSide } from './SignupUser';
import { LoginUser } from './LoginUser';
import { SignupLandlord } from './SignupLandlord';
import { LoginLandlord } from './LoginLandlord';
import NotFound from './NotFound';
import LandlordList from './DeleteUser';
import { LoginAdmin } from './Admin';

function App() {
  const [currForm,setCurrForm]=useState('login');

  const toggleForm= (formName) => {
    setCurrForm(formName)
  }

  return (
      <div className="App">
      <Router>
      <Routes>
      <Route exact path='/' element={<Title_Page/>}/>
      <Route exact path='/DB' element={<Dashboard/>}/>
      <Route path='/login' element={<LoginLandlord/>}/>
      <Route path='/signup' element={<SignupLandlord/>}/>
      <Route path='/loginU' element={<LoginUser/>}/>
      <Route path='/signupU' element={<SignInSide/>}/>
      <Route path='/Team' element={<Member1/>}/>
      <Route path='location' element={<LocationsList/>}/>
      <Route path='testing' element={<Testing/>}/>
      <Route path='/SearchBar' element={<SearchBar/>}/>
      <Route path='/addLocation' element={<AddLocation/>}/>
      <Route path="/myVenues" element={<MyVenues/>}/>
      <Route path="/archive" element={<ArchivedVenues/>}/>
      <Route path="location/:id" element={<LocationDetails/>} />
      <Route path ="/admin/landlords" element={<LandlordList/>}/>
      <Route path='/Admin' element={<LoginAdmin/>}/>
      <Route path ="*" element={<NotFound/>}/>


      </Routes>
    </Router>
    </div>

  );
}

export default App;

// {/* {
//         currForm == "login" ? <Login/>: <Register/>
//       } */}
