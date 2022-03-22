import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuNewList from './menuNewList';
import MenuOfferList from './menuOfferList';
import MenuProductList from './menuProductList';
import MenuRoomList from './menuRoomList';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const MenuMainBody = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const history = useHistory();
  const { t, i18n } = useTranslation();
  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('language', i18n.language);
  }

  return (
    <>
      {selectedSection === '' && (
        <div id='main-menu' className='offcanvas-body menu-body'>
          <ul>
            <li
              onClick={() => {
                setSelectedSection('p-content');
              }}
              style={{ cursor: 'pointer' }}
            >
              {t('Products')}
            </li>
            <li
              onClick={() => {
                setSelectedSection('r-content');
              }}
              style={{ cursor: 'pointer' }}
            >
              {t('Rooms')}
            </li>
            <li
              onClick={() => {
                // setSelectedSection('o-content');
                history.push('/offers/sale');
              }}
              style={{ cursor: 'pointer' }}
            >
              {t('Offers')}
            </li>
            <li
              onClick={() => {
                // setSelectedSection('w-content');
                history.push('/whatsnew/newArrival');
              }}
              style={{ cursor: 'pointer' }}
            >
              {t('WhatNew')}
            </li>
          </ul>
          <ul className='small-text-list'>
            <li>
              <Link to='/stores'>{t('Stores')}</Link>
            </li>
            {/* <li>
              <Link to='/conactUs'>{t('ContactUs')}</Link>
            </li> */}
          </ul>
          <div className='d-flex flex-row justify-content-around'>
            <select
              onChange={changeLanguage}
              type='button'
              className='selector-btn'
              defaultValue={i18n.language}
            >
              <option value='en'>English</option>
              <option value='ar'>العربية</option>
            </select>
            <button className='selector-btn'>
              <i className='bi bi-globe'></i>
              {t('ChangeCountry')}
            </button>
          </div>
        </div>
      )}
      {selectedSection === 'p-content' && (
        <MenuProductList
          changeSelection={(selection) => setSelectedSection(selection)}
        />
      )}
      {selectedSection === 'r-content' && (
        <MenuRoomList
          changeSelection={(selection) => setSelectedSection(selection)}
        />
      )}
      {/* {selectedSection === 'o-content' && (
        <MenuOfferList
          changeSelection={(selection) => setSelectedSection(selection)}
        />
      )}
      {selectedSection === 'w-content' && (
        <MenuNewList
          changeSelection={(selection) => setSelectedSection(selection)}
        />
      )} */}
    </>
  );
};
export default MenuMainBody;
