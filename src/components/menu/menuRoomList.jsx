import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCollection } from '../../services/firebase';
import { useTranslation } from 'react-i18next';

const MenuRoomList = props => {
  const [rooms, setRooms] = useState([]);
  const { t ,i18n } = useTranslation();

  useEffect(()=>{
    getCollection('RoomCategories').then((allCategories) => {
        setRooms(allCategories);
    });
  }, []);
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
        <span className='head-title'>{t('Rooms')}</span>
      </div>
      <div className='row mx-auto g-4 my-4' id='rooms-list'>
        {rooms.map(room => {
          return (
            <Link
              key={room.id}
              className='card category-card col-3 col-md-5'
              to={`/category/room/${room.data().Name}/${room.id}`}
            >
              <img src={room.data().Image} className='card-img-top' alt='...' />
              <div className='card-body category-body'>
                <p className='card-text'>{i18n.language=='en'?room.data().Name:room.data().NameAr}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default MenuRoomList;
