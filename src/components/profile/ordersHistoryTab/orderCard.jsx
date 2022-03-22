import ItemCard from './itemCard';
import { useTranslation } from 'react-i18next';

const OrderCard = ({ order }) => {
  const { t } = useTranslation();
  return (
    <div className='col-12 order-card row'>
      <div className='col-5 border-end p-1'>
        <h5>
          {t('Order')} #{order.id}
        </h5>
        <h5>
          {t('CreatedAt')}:{' '}
          <small className='small-text-size fst-italic fw-lighter'>
            {order.CreatedAt.toDate().toString()}
          </small>
        </h5>
        {order.Status && <h5 className='text-success'>{t('Delivered')}</h5>}
        {!order.Status && <h5 className='text-danger'>{t('Pending')}</h5>}
        <h4>
          {t('TotalPrice')} {t('EGP')} {order.TotalPrice}
        </h4>
      </div>
      <div className='col-7'>
        {order.Items.map(item => (
          <ItemCard
            item={item}
            key={item.ProductID}
            isDelivered={order.Status}
          />
        ))}
      </div>
    </div>
  );
};
export default OrderCard;
