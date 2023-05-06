import React from 'react';
// import './App.css';
import Homefirstsection from './homefirstsection';
import Sections from './Sections';
import Footer from './Footer';
import Navbar from './navbar';

function Title_Page() {
  return (
    <>
      <Navbar/>
      <Homefirstsection />
      <Sections />
      <Footer />
    </>
  );
}

export default Title_Page;