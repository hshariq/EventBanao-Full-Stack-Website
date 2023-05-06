import React from 'react';
import './Section.css';
import SectionItem from './SectionItem';
import Host from "./iamges/host.png";
import Post from "./iamges/Post.png";


function Sections() {
    const scrollToCards = () => {
        const element = document.getElementById('cards__container');
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
  return (
    <div className='cards'>
      <h1>LOGIN AS</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {/* <ul className='cards__items'> */}
          <div className='cards__items'>
            <SectionItem
              src={Host}
              text='Find A Venue'
              label='LOGIN AS USER'
              path='/loginU'
            />
         </div>
          {/* </ul> */}
          {/* <ul className='cards__items'> */}
          <div className='cards__items'>
              <SectionItem
              src={Post}
              text='Post A Venue'
              label='LOGIN AS HOST'
              path='/login'
            />
            </div>
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Sections;