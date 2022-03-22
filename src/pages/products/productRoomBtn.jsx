import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductRoomBtn = ({ totalItems ,setRoomBtn}) => {
  const { t } = useTranslation();
  return (
    <div className='col-12 col-lg-4 d-flex filter-right-side align-items-center'>
      <p className='d-inline-flex no-of-items'>{totalItems} {t('Items')}</p>
      <div className='btn-group me-2 ' role='group' aria-label='First group'>
        <button type='button' className='btn btn-outline-secondary' onClick={()=>setRoomBtn(false)}>
        {t('Product')}
        </button>
        <button type='button' className='btn btn-outline-secondary' onClick={()=>setRoomBtn(true)}>
        {t('Room')}
        </button>
      </div>
    </div>
  );
};

export default ProductRoomBtn;
