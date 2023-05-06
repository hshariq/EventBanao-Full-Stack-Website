import React from 'react';
import { useState } from "react"; 
import './Team.css';
import h from './iamges/Hamza.png';
import a from './iamges/Ali.png';
// import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './navbar';

const teamMembers = [
    {
      name: "Hamza",
      position: "CEO & Founder",
      image: h,
      social: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://www.linkedin.com/in/johndoe",
        github: "https://github.com/johndoe"
      }
    },
    {
      name: "Ali",
      position: "CEO & Founder",
      image: a,
      social: {
        twitter: "https://twitter.com/janedoe",
        linkedin: "https://www.linkedin.com/in/janedoe",
        github: "https://github.com/janedoe"
      }
    }
  ];
  

export default function Member1() {
    const teamMemberList = teamMembers.map((member, index) => (
        <div key={index} className="team-member">
        <div className='imgcontainer'>
          <img src={member.image} alt={member.name} />
        </div>
        <div className='rest'>
          <h3>{member.name}</h3>
          <p>{member.position}</p>
          <div className="social-links">
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href={member.social.github} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
          </div>
        </div>
      ));
    
      return (
        <>
        <Navbar/>
        <div className='team-section'>
            <h2>Team behind Eventbanao</h2>
            <div className='team-members'>
                {teamMemberList}
            </div>
        </div>

        <Footer />

        </>
      );
    };
    




// {/* <img src={h} alt='CEO'/>
// <h2>Muhammad Hamza Shariq</h2>
// <div className='social-links'>
//   <a href='member1-instagram-url'>Instagram</a>
//   <a href='member1-facebook-url'>Facebook</a>
//   <a href='member1-linkedin-url'>LinkedIn</a>
// </div>
// </div>
// </div>
//   <div className='member-card'>
//   <img src={a} alt='CEO'/>
//   <h2>Ali Sohail Shaikh</h2>
//   <div className='social-links'>
//     <a href='member2-instagram-url'>Instagram</a>
//     <a href='member2-facebook-url'>Facebook</a>
//     <a href='member2-linkedin-url'>LinkedIn</a>
//   </div>
// </div>
// </div> */}