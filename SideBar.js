import React from "react";

import jwtDecode from "jwt-decode";
import "./SideBar.css";

const SideBar = () => {
  const [SideBarData, setSideBarData] = React.useState([]);
  React.useEffect(() => {
    const domain = jwtDecode(localStorage.getItem("token")).userType;
    if (domain == "user") {
      setSideBarData([
        //array of objects
        {
          titile: "Home",
         
          link: "/location",
        },
        {
          titile: "Personal Information",
       
          link: "/perInfo",
        },
      ]);
    } else {
      setSideBarData([
        //array of objects
        {
          titile: "Home",
         
          link: "/DB",
        },
        {
          titile: "Add Venue",
         
          link: "/AddVenue",
        },
        {
          titile: "My Venues",
      
          link: "/MyVenues",
        },
        {
          titile: "Explore All",
      
          link: "/ShowAll",
        },
        {
          titile: "Archived",
        
          link: "/Archive",
        },
        {
          titile: "Deleted",
  
          link: "/deleted",
        },
        {
          titile: "Personal Information",
         
          link: "/perInfo",
        },
      ]);
    }
  }, []);
  return (
    <div className="SB">
      <ul className="SBList">
        <div className="Heading">eventbanao.pk</div>
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname == val.link ? "active" : ""}
              className="SBRow"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="icon">{val.icon}</div> <div id="title">{val.titile}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SideBar;
