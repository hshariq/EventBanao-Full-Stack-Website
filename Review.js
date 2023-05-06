import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import './Review.css'



const ReviewCard = ({ review }) => {
   return (
      <div className="review-card" key={review.reviewID}>
          <div className = "left">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" style={{ width: '50px', height: '50px'}} />
          </div>
          <div className="right">
            <p>User: {review.userID}</p>
            <p>Review: {review.review}</p> 
            <p>Rating: {review.rating}</p>
        </div>
       </div>
    );
  };



const ReviewList = () => {
    const id = useParams().id;
    const [reviews,setReviews] = useState([]);
    React.useEffect(() => {
        
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3001/review/${id}`,
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiaGFtemFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkeEJNajB4L1JrNE92b0pMZjN1Zm9NdWhZMzF0N2tLVWFVSUtWeDZMRDRMSTYuY0NkL1ZHR0siLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE2ODAyMDU2MTB9.BAdUpawZov58itPnZNdxnX2Vzj8QCF5yrRrCsYXV6Oo'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setReviews(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

},[])
    return (
    
        <div className="reviews-container">
          
          <h1 className="reviews-heading">Reviews</h1>
          {reviews.map((review) => (
            <ReviewCard key={review.reviewID} review={review} />
          ))}

     
        </div>
      );
}

export default ReviewList;