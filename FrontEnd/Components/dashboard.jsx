import React from "react";
import { useState, useEffect } from "react";
// import form from "./iamges/Form.png"
import SideBar from "./SideBardata";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { MyChart } from "./MyCharts";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [arch, setArch] = useState(0);
  const [avg, setAvgReview] = useState(0);

  useEffect(() => {
    let data = JSON.stringify({
      email: `${jwtDecode(localStorage.getItem("token")).email} `,
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/landlord/total",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    let config2 = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/landlord/arch",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    let config3 = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/landlord/avgReview",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setTotal(response.data.COUNT);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .request(config2)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setArch(response.data.COUNT);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .request(config3)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setAvgReview(response.data.AVG);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="DB_page">
      <div className="left">
        <SideBar />
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      {/* <div className="SB">
      <ul className="SBList">
      <h2 className="SBHead">eventbanao.pk</h2>
        {SideBar.map((val, key) => {
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
    </div> */}
      <div className="dashboard-container">
        <div className="cards-container">
          <div className="card">
            <h2>Total</h2>
            <p>{total}</p>
          </div>
          <div className="card">
            <h2>Avg Ratings</h2>
            <p>{avg}</p>
          </div>
          <div className="card">
            <h2>Archive</h2>
            <p>{arch}</p>
          </div>
          <div className="cardChart">
            <h2>Stars</h2>
            <MyChart />
          </div>
        </div>
      </div>
    </div>
  );
};
