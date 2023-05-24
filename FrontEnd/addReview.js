import React, { useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import './addReview.css'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function ReviewModal(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const id = props.id;

  // Add state for form validation
  const [isFormValid, setIsFormValid] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  
  const onStarClick = (nextValue, prevValue, name) => {
    console.log(nextValue);
    setRating(nextValue);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted review: ${review} with ${rating} stars`);
    let data = JSON.stringify({
      "review": `${review}`,
      "rating": `${rating}`
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:3001/review/${id}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      data : data
    };
      
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

    handleCloseModal();
  };

  React.useEffect(() => {
    setIsFormValid(rating && review);
  }, [rating, review]);

  return (
    <div>
      <button onClick={handleOpenModal}>Leave a Review</button>
      <Backdrop className={classes.backdrop} open={isOpen} >
        <div className="modal">
          <form onSubmit={handleSubmit}>
          <span class="closebutton" onClick={handleCloseModal}>&times;</span>
            <label>Leave a Review</label>
            <label className='stars'>
              <ReactStars
                count={5}
                onChange={onStarClick}
                size={50}
                color2={'#ffd700'}
              />
            </label>
            <label>
              Review:
              <textarea value={review} onChange={handleReviewChange} />
            </label>

            {/* Disable the submit button if the form is not valid */}
            <button type="submit" disabled={!isFormValid}>Submit</button>
          </form>
        </div>
      </Backdrop>
    </div>
  );
}

export default ReviewModal;
