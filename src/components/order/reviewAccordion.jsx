import React from 'react';
import Checkout from '../paypalCheckout/checkout';
import { useEffect, useContext } from 'react';
import { locationContext } from '../../contexts/locationContext';
import { useTranslation } from 'react-i18next';

const ReviewAccordion = ({
  reviewAccordionBtn,
  reviewAccordionCollapse,
  user,
  handleReviewBack,
  handleReviewNext,
  continuePayment,
  totalOrderPrice,
}) => {
  const { checkedAddress, userLocations } = useContext(locationContext);
  const {t} = useTranslation();
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id='flush-headingThree'>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#flush-collapseThree'
          aria-expanded='false'
          aria-controls='flush-collapseThree'
          disabled
          ref={reviewAccordionBtn}
        >
        {t('ReviewConfirm')}
        </button>
      </h2>
      <div
        id='flush-collapseThree'
        className='accordion-collapse collapse review'
        aria-labelledby='flush-headingThree'
        data-bs-parent='#accordionFlushExample'
        ref={reviewAccordionCollapse}
      >
        <div className='accordion-body review-cards'>
          <div className='review-card'>
            <h4>{t('BillingAddress')}</h4>
            <div className='card-body'>
              <p>
                <strong>{t('Name')}:</strong> {user.FirstName} {user.LastName}
              </p>
              <p>
                <strong>{t('Mobile')}:</strong> {user.PhoneNum}
              </p>
              <p>
                <strong>{t('Address')}:</strong>{' '}
                {userLocations.length !== 0 &&
                  userLocations[checkedAddress].address}
                <br />
                {userLocations.length !== 0 &&
                  userLocations[checkedAddress].building}
              </p>
            </div>
          </div>
          <div className='review-card'>
            <h4>{t('ShippingAddress')}</h4>
            <div className='card-body'>
              <p>
                <strong>{t('Name')}:</strong> {user.FirstName} {user.LastName}
              </p>
              <p>
                <strong>{t('Mobile')}:</strong> {user.PhoneNum}
              </p>
              <p>
                <strong>{t('Address')}:</strong>{' '}
                {userLocations.length !== 0 &&
                  userLocations[checkedAddress].address}
                <br />
                {userLocations.length !== 0 &&
                  userLocations[checkedAddress].building}
              </p>
            </div>
          </div>
          <div className='review-card'>
            <h4>{t('DeliveryDateTime')}</h4>
            <div className='card-body'>
              <p>
                <strong>{t('DeliveryDate')}:</strong>
              </p>
              <p>
                <strong>{t('DeliveryTime')}:</strong>
              </p>
              <p>
                <strong>{t('AssemblyTime')}:</strong>
              </p>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>
          {t('ContinuePaymentConfirmation')}
          <span style={{ color: '#90baf1' }}> {t('TermsConditions')}</span>
        </p>

        <div className='buttons-group'>
          <button className='btn back-button ms-4' onClick={handleReviewBack}>
            {t('Back')}
          </button>

          <button className='btn submit-button me-4' onClick={handleReviewNext}>
            {t('ContinueWithPayment')}
          </button>
        </div>

        {continuePayment && <Checkout totalOrderPrice={totalOrderPrice} />}
      </div>
    </div>
  );
};

export default ReviewAccordion;
