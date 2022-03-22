import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { locationContext } from '../../contexts/locationContext';
import AddressForm from './addressForm';

const AddressAccordion = ({
  addressAccordionBtn,
  addressAccordionCollapse,
  user,
  setAddressCollapse,
  addressCollapse,
  handleAddressForm,
  register,
  locations,
  handleAddressNext,
  userLocations,
  setGov,
  gov,
  locationsExist,
}) => {
  const { checkedAddress, setCheckedAddress } = useContext(locationContext);
  const { t } = useTranslation();
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id='flush-headingOne'>
        <button
          className='accordion-button'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#flush-collapseOne'
          aria-expanded='false'
          aria-controls='flush-collapseOne'
          disabled
          ref={addressAccordionBtn}
        >
          {t('BillingShippingAddress')}
        </button>
      </h2>
      <div
        id='flush-collapseOne'
        className='accordion-collapse'
        aria-labelledby='flush-headingOne'
        data-bs-parent='#accordionFlushExample'
        ref={addressAccordionCollapse}
      >
        <div className='accordion-body'>
          <h4>{t('BillingAddress')}</h4>

          {userLocations.length !== 0 ? (
            <>
              {userLocations.map(loc => (
                <div
                  className='form-check shipping-address-card'
                  key={userLocations.indexOf(loc)}
                >
                  <input
                    className='form-check-input'
                    type='radio'
                    name='address-radio'
                    value={userLocations.indexOf(loc)}
                    defaultChecked={
                      userLocations.indexOf(loc) === checkedAddress
                    }
                    onChange={e => {
                      setCheckedAddress(Number(e.target.value));
                    }}
                  />
                  <div className='card-body'>
                    <p>
                      <strong>{t('FullName')} :</strong> {user.FirstName}{' '}
                      {user.LastName}
                    </p>
                    <p>
                      <strong>{t('Mobile')} :</strong> {user.PhoneNum}
                    </p>
                    <p>
                      <strong>{t('Address')} :</strong> {loc.address}
                      <br />
                      {loc.building}
                    </p>
                  </div>
                </div>
              ))}
              <button
                className='btn shipping-address-btn my-3'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#addressCollapse'
                onClick={() => setAddressCollapse(!addressCollapse)}
              >
                {t('AddNewAddress')}
              </button>
              <div className='collapse' id='addressCollapse'>
                <div className='card card-body'>
                  <AddressForm
                    handleAddressForm={handleAddressForm}
                    register={register}
                    locations={locations}
                    setGov={setGov}
                    gov={gov}
                  ></AddressForm>
                </div>
              </div>
            </>
          ) : (
            <AddressForm
              handleAddressForm={handleAddressForm}
              register={register}
              locations={locations}
              setGov={setGov}
              gov={gov}
            ></AddressForm>
          )}

          {addressCollapse && locationsExist && (
            <div className='buttons-group'>
              <button></button>
              <button
                className='btn submit-button me-4'
                onClick={handleAddressNext}
              >
                {t('Continue')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressAccordion;
