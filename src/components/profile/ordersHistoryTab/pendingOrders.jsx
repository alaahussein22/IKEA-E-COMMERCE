import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getDocumentByID } from '../../../services/firebase';
import Loader from '../../loader';
import OrderCard from './orderCard';

export const PendingOrders = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(true);
  const purchases = useSelector((state) => state.user.user.Purchased);
  const [orders, setOrders] = useState([]);
  const getUserOrders = () => {
    let orderList = [];
    purchases.forEach((element, index) => {
      getDocumentByID('Orders', element).then((order) => {
        if (!order.Status) {
          order.id = element;
          orderList.push(order);
        }
        if (index === purchases.length - 1) {
          setOrders(orderList);
          setLoader(false);
        }
      });
    });
  };
  useEffect(() => {
    if (purchases) {
      getUserOrders();
    }
  }, [purchases]);
  return (
    <>
      {loader && <Loader />}
      {orders.length===0 && !loader && (
        <div className='text-center my-5'>
          <p className='fst-italic' style={{ color: 'grey' }}>
            {t('NoOrdersPending')}
          </p>
        </div>
      )}
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  );
};