import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MenuNewList = props => {
  const { t , i18n } = useTranslation();
  return (
    <div className='offcanvas-body menu-body'>
      <div className='d-flex flex-row'>
        <button
          className={`position-sticky ${i18n.dir()==='ltr'?' menu-btn-ltr left-arrow':'menu-btn-rtl right-arrow'}`}
          onClick={() => {
            props.changeSelection('');
          }}
        >
          <i className={`bi ${i18n.dir()==='ltr'?'bi-arrow-left-short':'bi-arrow-right-short'}`}></i>
        </button>
        <span className='head-title'>{t('WhatNew')}</span>
      </div>
      <ul className='small-text-list my-4'>
        <li>
          <Link to='/'>{t('NewProducts')}</Link>
        </li>
        <li>
          <Link to='/'>{t('Stories')}</Link>
        </li>
      </ul>
    </div>
  );
};
export default MenuNewList;
