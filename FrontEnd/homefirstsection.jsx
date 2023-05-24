import React from 'react';
import { Button } from './Button';
import './Homefirstsection.css';
import home from "./iamges/Home.png"






function Homefirstsection() {
  return (
    <div className='hero-container'>
      <img src={home} alt="Home" className="img2" ></img>
      <h1>CREATE MEMORIES</h1>
      <p>What are you waiting for?</p>
    </div>
  );
}

export default Homefirstsection;