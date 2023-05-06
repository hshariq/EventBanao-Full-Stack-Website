import React from "react";
import ban1 from "./iamges/banq1.png"
import ban2 from "./iamges/banq2.png"
import {SideBarData} from "./Components/SideBardata"
import './MyVenue.css';

const eventHalls = [
  {
    id: 1,
    imageUrl: ban1,
    title: "Event Hall 1",
    capacity: "500",
    rent: "$2000",
    postedBy: "John Doe"
  },
  {
    id: 2,
    imageUrl: ban2,
    title: "Event Hall 2",
    capacity: "300",
    rent: "$1500",
    postedBy: "Jane Smith"
  },
  // Add more event halls here...
];

export const EventHallList = () => {
  return (
    <>
    <h1>YOUR VENUES</h1>
    <div className="SB">
      <ul className="SBList">
      <div className="Heading">eventbanao.pk</div>
        {SideBarData.map((val, key) => {
          return (      
          <li 
            key={key} 
            id={window.location.pathname== val.link ? "active" : ""}
            className="SBRow"
            onClick={()=>{
              window.location.pathname=val.link;
            }}>
            {" "}
            <div id="icon">{val.icon}</div>
            {" "}
            <div id="title">{val.titile}</div>
          </li>
          )
      })}
      </ul>
    </div>
  <div className="event-hall-container">
    {eventHalls.map((eventHall) => (
        <div key={eventHall.id} className="event-hall">
        <div className="img_container">
            <img src={eventHall.imageUrl} alt={eventHall.title} style={{maxWidth: '45%', height: '30%', zIndex: '1'}} />
            {/* <img src={eventHall.imageUrl} alt={eventHall.title} width=/> */}
        </div>
        <div className="info-box">
            <h3 className="title">{eventHall.title}</h3>
            <div className="capacity">
            <span>Capacity:</span> {eventHall.capacity}
            </div>
            <div className="rent">
            <span>Rent:</span> {eventHall.rent}
            </div>
            <div className="posted-by">
            <span>Posted by:</span> {eventHall.postedBy}
            </div>
        </div>
    </div>
  ))}
</div>
<div className="hs-icon">HS</div>
      <div className="user-name">Hamza Shariq</div>

    </>
  );
};