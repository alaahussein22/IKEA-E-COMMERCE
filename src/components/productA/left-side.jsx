import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { getProductReviews } from './../../services/firebase';
import { FaStar } from 'react-icons/fa';
const LeftSide = props => {
  const { t, i18n } = useTranslation();
  const {
    Images,
    Description,
    DescriptionAr,
    Name,
    NameAr,
    SubCategory,
    Width,
    Height,
    Thickness,
    Material,
    MaterialAr,
    Color,
    ColorAr,
  } = props.prod.productData;
  // console.log(":::",Images);

  const [reviews, setReviews] = useState();
  const [averageReview, setAverageReview] = useState();
  const [sumOfRatings, setSumOfRatings] = useState(0);

  useEffect(() => {
    getProductReviews(props.prod.id).then(revs => {
      setReviews(revs);
    });
  }, []);

  useEffect(() => {
    if (reviews) {
      const newRevs = [];

      reviews.forEach(review => {
        newRevs.push(review.Review.rating);
      });

      const sum = newRevs.reduce((x, y) => x + y, 0);
      setSumOfRatings(sum);

      setAverageReview(Math.round(sum / reviews?.length));
    }
  }, [reviews]);

  return (
    <>
      <div className='col-12 col-md-8 left mt-5'>
        <div className='top-imgs '>
          {Images?.map((image, index) => (
            <img src={image} width='48%' alt='product image' key={index} />
          ))}
        </div>
        <div className='gursken'>
          <b>
            <span>{i18n.language == 'en' ? Name : NameAr}</span>
          </b>
          <p>
            {i18n.language == 'en' ? Description : DescriptionAr}
            {/* <br></br>
            wardrobe and of course a bed. Perfect for your first apartment or
            guest room. */}
          </p>
        </div>
        {/* <span>
          Article number<pre></pre>
          <span>001.020.65</span>
        </span> */}
        {/* <br></br> */}
        <hr />
        {/* details offcanva */}
        <div className='pro-detail'>
          <span>{t('ProductDetails')}</span>
          <button
            className='btn btn-primary'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasRight'
            aria-controls='offcanvasRight'
          >
            {' '}
            <i className='fas fa-arrow-right'></i>{' '}
          </button>

          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='offcanvasRight'
            aria-labelledby='offcanvasRightLabel'
          >
            <div className='offcanvas-header'>
              <h3 id='offcanvasRightLabel'>{t('ProductDetails')}</h3>
              <button
                type='button'
                className='btn-close text-reset'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>

            <div className='offcanvas-body'>
              <div>
                <h3>{i18n.language == 'en' ? Name : NameAr}</h3>
              </div>
              {/* <img src={Images[0]} className='col-12' /> */}
              {Description && (
                <div>
                  <p>{i18n.language == 'en' ? Description : DescriptionAr}</p>
                </div>
              )}
              {Material && (
                <div>
                  <h4>
                    {t('Material')}:{' '}
                    {i18n.language == 'en' ? Material : MaterialAr}
                  </h4>
                </div>
              )}
              {Color && (
                <div>
                  <h4>
                    {t('Color')}:{i18n.language == 'en' ? Color : ColorAr}
                    {/* <input
                      className='input-field'
                      type='color'
                      disabled
                      value={Color}
                    /> */}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* measurement offcanva */}
        {(Thickness || Width || Height) && (
          <>
            <hr />
            <div className='pro-detail'>
              <span>{t('Measurements')}</span>
              <button
                className='btn btn-primary'
                type='button'
                data-bs-toggle='offcanvas'
                data-bs-target='#offcanvasRight2'
                aria-controls='offcanvasRight2'
              >
                {' '}
                <i className='fas fa-arrow-right'></i>{' '}
              </button>

              <div
                className='offcanvas offcanvas-end'
                tabIndex='-1'
                id='offcanvasRight2'
                aria-labelledby='offcanvasRight2Label'
              >
                <div className='offcanvas-header'>
                  <h3 id='offcanvasRight2Label'>{t('Measurements')}</h3>
                  <button
                    type='button'
                    className='btn-close text-reset'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='offcanvas-body'>
                  {Height && (
                    <div>
                      <h3>
                        {t('Height')}: {Height} {t('cm')}
                      </h3>
                    </div>
                  )}
                  {Width && (
                    <div>
                      <h3>
                        {t('Width')}: {Width} {t('cm')}
                      </h3>
                    </div>
                  )}
                  {Thickness && (
                    <div>
                      <h3>
                        {t('Thickness')}: {Thickness} {t('cm')}
                      </h3>
                    </div>
                  )}
                  <img src={Images[0]} className='col-12' />
                </div>
              </div>
            </div>
          </>
        )}

        {reviews?.length !== 0 && (
          <>
            <hr />
            <div className='pro-detail'>
              <span>{t('Reviews')}</span>
              <button
                className='btn btn-primary'
                type='button'
                data-bs-toggle='offcanvas'
                data-bs-target='#reviewsOffcanvas'
                aria-controls='reviewsOffcanvas'
                style={{ transform: 'translateY(1rem)' }}
              >
                <i className='fas fa-arrow-right'></i>
              </button>
              <div>
                {[...Array(5)].map((_, idx) => {
                  return (
                    <FaStar
                      key={idx}
                      className='star'
                      size={15}
                      color={idx + 1 <= averageReview ? '#ffc107' : '#e4e5e9'}
                      style={{ margin: 0 }}
                    />
                  );
                })}
                <span
                  style={{
                    fontSize: '.8rem',
                    fontWeight: 'normal',
                    padding: '0 .5rem',
                  }}
                >
                  ({reviews?.length})
                </span>
              </div>

              <div
                className='offcanvas offcanvas-end'
                tabIndex='-1'
                id='reviewsOffcanvas'
                aria-labelledby='reviewsOffcanvasLabel'
                style={{ padding: 30 }}
              >
                <div className='offcanvas-header'>
                  <h4 id='reviewsOffcanvasLabel' style={{ fontWeight: 'bold' }}>
                    {t('Reviews')}
                  </h4>
                  <button
                    type='button'
                    className='btn-close text-reset'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='offcanvas-body'>
                  <h5>{t('AverageRating')}</h5>

                  <h2>{(sumOfRatings / reviews?.length).toFixed(2)}</h2>
                  {[...Array(5)].map((_, idx) => {
                    return (
                      <FaStar
                        key={idx}
                        className='star'
                        size={15}
                        color={idx + 1 <= averageReview ? '#ffc107' : '#e4e5e9'}
                        style={{ margin: 0 }}
                      />
                    );
                  })}

                  <span
                    style={{
                      fontSize: '.8rem',
                      fontWeight: 'normal',
                      padding: '0 .5rem',
                    }}
                  >
                    ({reviews?.length})
                  </span>

                  {reviews?.map(review => {
                    const rating = review?.Review.rating;
                    const comment = review?.Review.comment;

                    return (
                      <>
                        <hr />

                        <h5 style={{ padding: '.5rem 0 .3rem 0' }}>
                          {comment}
                        </h5>

                        {[...Array(5)].map((_, idx) => {
                          return (
                            <FaStar
                              key={idx}
                              className='star'
                              size={15}
                              color={idx + 1 <= rating ? '#ffc107' : '#e4e5e9'}
                              style={{ margin: 0 }}
                            />
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
        <pre></pre>
        <hr />
        <pre></pre>
      </div>
    </>
  );
};

export default LeftSide;
//  <FaStar
//    className='star'
//    size={15}
//    color={idx + 1 <= review?.rating ? '#ffc107' : '#e4e5e9'}
//    style={{ margin: 0 }}
//  />;
