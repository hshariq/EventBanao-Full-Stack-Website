import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import axios from "axios";

export const MyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace this URL with the URL of your API
    const url = "http://localhost:3001/landlord/star";
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // setData(transformedData);
        const data = [];
        response.data.forEach((item) => {
          let location = data.find((loc) => loc.name === item.locationName);
          if (!location) {
            location = {
              name: item.locationName,
              "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 0,
            };
            data.push(location);
          }
          location[item.stars] += 1;
        });

        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="1" fill="#8884d8" />
        <Bar dataKey="2" fill="#82ca9d" />
        <Bar dataKey="3" fill="#ffc658" />
        <Bar dataKey="4" fill="#6a4c93" />
        <Bar dataKey="5" fill="#e377c2" />
      </BarChart>
    </div>
  );
};
