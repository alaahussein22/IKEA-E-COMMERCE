import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './../../store/actions/cartProducts';
import { useTranslation } from 'react-i18next';
import { addCartItemToUser, getCollection, getDocumentByID } from '../../services/firebase';
const RightSide = (props) => {
  const { t , i18n } = useTranslation();
  const {
    Images,
    Price,
    Name,
    NameAr,
    Color,
    ColorAr,
    Description,
    DescriptionAr,
    SubCategory,
    ProductName,
    Quantity,
  } = props.prod.productData;
  const pId = props.prod.id;

  const { cartProducts } = useSelector((state) => state.cartProducts);

  let found = cartProducts?.find((i) => i.id === pId);
  const [added, setAdded] = useState(found ? true : false);
  const dispatch = useDispatch();
  const addToBag = () => {
    const { productData } = props.prod;
    dispatch(addToCart({ id: pId, productData, PurchasedAmount: 1 }));
    setAdded(true);
    addCartItemToUser(localStorage.getItem('UID'), pId);
  };
  const [product,setProduct]=useState({});
  useEffect(()=>{
    getDocumentByID('Products',pId).then((res)=>{
      setProduct(res);
    })
  },[])
  return (
    <>
      <div className='col-12 col-md-4 right'>
        <div className='head'>
          <p>
            <b> {product.ProductName}</b>
          </p>
          <span className='span ms-5'>
            <b>
              {product.Price} {t('EGP')}
            </b>
          </span>
        </div>
        <div>
          {i18n.language=='en'?product.Name:product.NameAr}, {i18n.language=='en'?product.Color:product.ColorAr}
          {/* {SubCategory=='PH6KZW35bbvGRBdbQ8pe'&&
                   <span >Mattress and bedlinen are sold separately.</span>} */}
        </div>

        <div id='right-btn '>
          {product.Quantity!==0 && 
          <button
            className={`col-7 mb-3 btn btn-primary rounded-pill ${
              added && 'disabled'
            }`}
            onClick={addToBag}
          >
            {!added ? t('AddToCart') : t('Added')}
          </button>}
        </div>

        <p>
          <span className='me-1'>
            <i className='fas fa-truck right-icon'></i>
          </span>
          <span> {t('SeeDeliveryOptions')}</span>
        </p>

        <hr />

        <p>
          <span className='me-1'>
            <i className='fas fa-solid fa-store right-icon'> </i>
          </span>
          {(product.Quantity > 2 )&& (
            <span>
              {t('AvailableInStock')} : {product.Quantity}{' '}
            </span>
          )}
          {(product.Quantity<=2 && product.Quantity!==0) && (
            <span className='text-danger'>
              {product.Quantity} {t('OnlyInStock')}
            </span>
          )
          }
          {(product.Quantity===0) &&
            <span className='text-danger'>
            {t('OutOfStock')}
          </span>
          }
        </p>
      </div>
    </>
  );
};

export default RightSide;
