import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCollection } from '../../services/firebase';
import { useTranslation } from 'react-i18next';

const MenuProductList = props => {
  const [categories, setCategories] = useState([]);
  const { t ,i18n} = useTranslation();

  useEffect(() => {
    getCollection('ProductCategories')
      .then(allCategories => {
        setCategories(allCategories);
      })
      .catch(err => console.log('error :', err));
  }, []);
  return (
    <>
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
          <span className='head-title'>{t('Products')}</span>
        </div>
        <ul className='small-text-list my-4' id='products-list'>
          {categories.map(category => {
            return (
              <li key={category.id}>
                <Link
                  to={`/category/product/${category.data().Name}/${
                    category.id
                  }`}
                >
                  {i18n.language=='en'?category.data().Name:category.data().NameAr}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MenuProductList;
