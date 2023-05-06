import { Routes, Route } from 'react-router-dom';

import About from './About';
import Login from './Login';
import LocationsList from './LocationsList';
import LocationDetails from './LocationDetails';
import AddLocation from './AddLocation';
import LoginLandlord from './loginLandlord';
import ReviewModal from './addReview';

export default function App() {
  return (
    <div className="App">
      <Routes> 
   
        <Route path="about" element={<About />} />
        <Route path="/" element={<Login/>} />
        <Route path="home" element={<LocationsList/>} />
        <Route path="location/:id" element={<LocationDetails/>} />
        <Route path="addlocation" element={<AddLocation/>} />
        <Route path="addReview/:id" element={<ReviewModal/>}/>


      </Routes>
    </div>
  );
}