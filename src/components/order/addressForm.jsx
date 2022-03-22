import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const AddressForm = ({
  handleAddressForm,
  register,
  locations,
  gov,
  setGov,
}) => {
  const { t, i18n } = useTranslation();
  const [areas, setAreas] = useState([]);

  const handleGovSelect = e => {
    locations.forEach(loc => {
      if ((i18n.language === 'en' ? loc.Name : loc.NameAr) === e.target.value) {
        setAreas(i18n.language === 'en' ? loc.Areas : loc.AreaAr);
        setGov({ ...gov, gov: e.target.value });
      }
    });
  };

  const handleAreaSelect = e => {
    locations.forEach(loc => {
      if (
        i18n.language === 'en'
          ? loc.Areas.includes(e.target.value)
          : loc.AreaAr.includes(e.target.value)
      ) {
        i18n.language === 'en'
          ? loc.Areas.forEach(area => {
              if (area === e.target.value)
                setGov({ ...gov, area: e.target.value });
            })
          : loc.AreaAr.forEach(area => {
              if (area === e.target.value)
                setGov({ ...gov, area: e.target.value });
            });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleAddressForm} className='address-form mt-3'>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder={t('FullName')}
            name='name'
            {...register('name')}
            required
          />
        </div>
        <select
          className='form-select form-control mb-3'
          defaultValue={'default'}
          onChange={handleGovSelect}
          required
        >
          <option disabled value='default'>
            {t('SelectGovernorate')}
          </option>

          {locations?.map(loc => (
            <option
              value={i18n.language === 'en' ? loc.Name : loc.NameAr}
              key={locations.indexOf(loc)}
            >
              {i18n.language === 'en' ? loc.Name : loc.NameAr}
            </option>
          ))}
        </select>
        <select
          className='form-select form-control mb-3'
          defaultValue={'default'}
          onChange={handleAreaSelect}
          required
        >
          <option disabled value='default'>
            {t('SelectArea')}
          </option>

          {areas?.map(area => (
            <option value={area} key={areas.indexOf(area)}>
              {area}
            </option>
          ))}
        </select>
        <div className='mb-3'>
          <input
            type='email'
            className='form-control'
            placeholder='sample1@sample.com'
            name='email'
            {...register('email')}
            required
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder={t('Address')}
            name='address'
            {...register('address')}
            required
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder={t('BuildingNoPlaceHolder')}
            name='building'
            {...register('building')}
            required
          />
        </div>
        <small className='mb-3'>{t('NoElevatorNote')}</small>
        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            name='isUsedAsShippingAddress'
            {...register('isUsedAsShippingAddress')}
          />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
            <small>{t('UseAsShipping')}</small>
          </label>
        </div>

        <input
          type='submit'
          className='btn submit-button'
          value={t('Continue')}
        />
      </form>
    </>
  );
};

export default AddressForm;
