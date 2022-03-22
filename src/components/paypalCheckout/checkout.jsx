import React, { useContext, useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './checkout.scss';
import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { createNewOrder } from '../../services/firebase';
import { locationContext } from '../../contexts/locationContext';
import { useHistory } from 'react-router-dom';

const initialOptions = {
  'client-id':
    'ASbDLGhIXQB7EmCkTpz9g6jG4fSZrAWl0poNKWmjoYDvnCiqdsBy4cn8d4yfwz5CvsjbNqEGrhuMgF5n',
  currency: 'USD',
};

const Checkout = () => {
  const { checkedAddress } = useContext(locationContext);

  const purchasedItems = useSelector(state => state.cartProducts.cartProducts);
  const totalOrderPrice = useSelector(state => state.cartProducts.totalPrice);

  const [items, setItems] = useState([]);
  const history =useHistory();
  useEffect(() => {
    purchasedItems.forEach(item => {
      const newItem = { ProductID: item.id, Amount: item.PurchasedAmount };
      setItems(prevItems => [...prevItems, newItem]);
    });
  }, []);

  return (
    <div className='checkout-container'>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalOrderPrice
                      ? (totalOrderPrice / 16).toFixed(2)
                      : 1,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            console.log('onApprove Data: ');
            const purchaseDate = Timestamp.fromDate(new Date());

            setTimeout(() => {
              createNewOrder({
                createdAt: purchaseDate,
                items: items,
                status: false,
                totalPrice: totalOrderPrice,
                userId: localStorage.getItem('UID'),
                checkedAddress: checkedAddress,
              });
            }, 2000);

            return actions.order.capture().then(details => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
              history.replace('/Home')
            });
          }}
          onError={err => {
            console.log('onError: ');
            console.log(err);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Checkout;
