import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { addProductRatingToUser } from '../../services/firebase';
import './rating.css';

const Rating = ({ productID, onReviewSubmit }) => {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');
  const offCanvas = useRef();
  const closeBtn = useRef();

  const handleCommentInput = e => {
    setComment(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (rating !== undefined) {
      const review =
        comment === ''
          ? { rating: rating }
          : { rating: rating, comment: comment };
      addProductRatingToUser(review, productID, localStorage.getItem('UID'));
    }

    closeBtn.current.click();

    onReviewSubmit(
      comment === '' ? { rating: rating } : { rating: rating, comment: comment }
    );
  };

  useEffect(() => {
    offCanvas.current.addEventListener('hidden.bs.offcanvas', () => {
      setRating(undefined);
      setComment('');
    });
  }, []);

  return (
    <div>
      <button
        className='rate'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasRight'
        aria-controls='offcanvasRight'
      >
        Add a review
      </button>

      <div
        className='offcanvas offcanvas-end review-container'
        tabIndex='-1'
        id='offcanvasRight'
        aria-labelledby='offcanvasRightLabel'
        ref={offCanvas}
      >
        <div className='offcanvas-header'>
          <h5 id='offcanvasRightLabel ' className='header'>
            Product Review
          </h5>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
            ref={closeBtn}
          ></button>
        </div>
        <div className='ratingVal'>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type='radio'
                  name='rating'
                  value={rating}
                  className='rating-input'
                  onClick={() => {
                    setRating(ratingValue);
                  }}
                />
                <FaStar
                  className='star'
                  size={22}
                  color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                />
              </label>
            );
          })}
        </div>

        <label htmlFor='review'>Comment</label>
        <textarea
          id='review'
          name='review'
          rows='4'
          cols='50'
          placeholder='Please add a comment'
          className='comment-input'
          value={comment}
          onChange={handleCommentInput}
        ></textarea>

        <button
          className='submit-btn'
          onClick={handleReviewSubmit}
          disabled={rating === undefined}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Rating;
