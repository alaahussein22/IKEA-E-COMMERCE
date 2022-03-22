import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CompletedOrders } from './completedOrders';
import { PendingOrders } from './pendingOrders';

const OrdersTab = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('completed');
  return (
    <>
      <div className='row col-12 gx-4 mt-3'>
        <div
          className='col-sm-12 col-md-6 row'
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedTab('completed')}
        >
          <p
            className={`tab  text-center ${
              selectedTab === 'completed' && 'selected'
            }`}
          >
            {t('CompletedOrders')}
          </p>
        </div>
        <div
          className='col-sm-12 col-md-6'
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedTab('pending')}
        >
          <p
            className={`tab  text-center ${
              selectedTab === 'pending' && 'selected'
            }`}
          >
            {t('PendingOrders')}
          </p>
        </div>
      </div>
      {selectedTab === 'completed' && <CompletedOrders />}
      {selectedTab === 'pending' && <PendingOrders />}
    </>
  );
};
export default OrdersTab;
