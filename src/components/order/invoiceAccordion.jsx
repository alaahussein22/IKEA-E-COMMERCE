import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getDocumentByID, removeCartItemFromUser } from '../../services/firebase';
import { removeFromCart, setCartItemAmount } from '../../store/actions/cartProducts';
import store from '../../store/store';

const InvoiceAccordion = ({
  invoiceAccordionBtn,
  invoiceAccordionCollapse,
  purchasedItems,
  totalOrderPrice,
  handleInvoiceBack,
  handleInvoiceNext,
}) => {
  const {t,i18n} = useTranslation();
  const [message, setMessage] = useState('');
  const [itemsRemoved, setItemsRemoved] = useState([]);
  useEffect(() => {
    let removed = [];
    purchasedItems.forEach((item, indx) => {
      getDocumentByID('Products', item.id).then((res) => {
        if (res.Quantity < item.PurchasedAmount) {
          removeCartItemFromUser(localStorage.getItem('UID'), item.id);
          store.dispatch(removeFromCart(item.id));
          store.dispatch(setCartItemAmount(item.id, 0));
          removed.push(item);
        }
        if (indx === purchasedItems.length - 1 && removed.length != 0) {
          setMessage(t('UnavailableMessage'));
          setItemsRemoved(removed);
        }
      });
    });
  }, []);

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id='flush-headingTwo'>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#flush-collapseTwo'
          aria-expanded='false'
          aria-controls='flush-collapseTwo'
          disabled
          ref={invoiceAccordionBtn}
        >
        {t('DeliveryInvoice')}
        </button>
      </h2>
      <div
        id='flush-collapseTwo'
        className='accordion-collapse collapse invoice'
        ref={invoiceAccordionCollapse}
        aria-labelledby='flush-headingTwo'
        data-bs-parent='#accordionFlushExample'
      >
        <div className='accordion-body'>
          {purchasedItems.map(item => {
            return (
              <div
                key={purchasedItems.indexOf(item)}
                className='purchased-item-card'
              >
                <div className='left'>
                  <img src={item.productData.Images[0]} alt='product' />
                  <div className='product-details ms-3'>
                    <p>
                      <span>{item.PurchasedAmount} x </span>
                      <strong>{item.productData.ProductName}</strong>
                    </p>
                    <p>
                      {item.productData.ProductName} {i18n.language=='en'?item.productData.Name:item.productData.NameAr}
                    </p>
                    <p>
                      <strong>{t('EGP')} {item.productData.Price}</strong>
                    </p>
                  </div>
                </div>
                <div className='right'>
                  <p>
                    <strong>
                    {t('EGP')} {item.PurchasedAmount * item.productData.Price}
                    </strong>
                  </p>
                </div>
              </div>
            );
          })}
          <p className='total-price'>
            {t('OrderTotal')}: <strong>{t('EGP')} {totalOrderPrice}</strong>
          </p>
        </div>
        {message !== '' && (
          <>
            <p className='text-danger mx-auto fs-6'>{message}</p>
            <div className='d-flex flex-row m-3'>
              {itemsRemoved.map((item) => {
                return (
                  <Link
                    className='border border-1 col-2 m-1'
                    key={item.id}
                    to={{
                      pathname: '/products/' + item.id,
                      state: {
                        prod: {
                          id: item.id,
                          productData: item.productData,
                        },
                      },
                    }}
                  >
                    <img src={item.productData.Images[0]} className='col-12' />
                    <p className='text-center'>{i18n.language=='en'?item.productData.Name:item.productData.NameAr}</p>
                  </Link>
                );
              })}
            </div>
          </>
        )}
        <div className='buttons-group'>
          <button className='btn back-button ms-4' onClick={handleInvoiceBack}>
            {t('Back')}
          </button>

          <button
            className='btn submit-button me-4'
            onClick={handleInvoiceNext}
          >
          {t('Continue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAccordion;
