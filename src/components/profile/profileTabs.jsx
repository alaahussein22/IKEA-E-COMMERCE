import { useState } from 'react';
import AccountTab from './accountTab/accountTab';
import AddressTab from './addressTab/addressTab';
import OrdersTab from './ordersHistoryTab/ordersHistoryTab';
import SettingsTab from './settingsTab/settingsTab';
import { useTranslation } from 'react-i18next';

const ProfileTab = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('Account');
  return (
    <>
      <div className='row col-12 gx-4 mt-3'>
        <div
          className='col-sm-12 col-md-3 row'
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedTab('Account')}
        >
          <p
            className={`tab  text-center ${
              selectedTab === 'Account' && 'selected'
            }`}
          >
            {t('Account')}
          </p>
        </div>
        <div
          className='col-sm-12 col-md-3'
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedTab('Address')}
        >
          <p
            className={`tab  text-center ${
              selectedTab === 'Address' && 'selected'
            }`}
          >
            {t('Address')}
          </p>
        </div>

        <div
          className='col-sm-12 col-md-3'
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedTab('Settings')}
        >
          <p
            className={`tab  text-center ${
              selectedTab === 'Settings' && 'selected'
            }`}
          >
            {t('Settings')}
          </p>
        </div>

        <div
          className='col-sm-12 col-md-3'
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedTab('Orders History')}
        >
          <p
            className={`tab  text-center ${
              selectedTab === 'Orders History' && 'selected'
            }`}
          >
            {t('Orders')}
          </p>
        </div>
      </div>
      {selectedTab === 'Account' && <AccountTab />}
      {selectedTab === 'Address' && <AddressTab />}
      {selectedTab === 'Settings' && <SettingsTab />}
      {selectedTab === 'Orders History' && <OrdersTab />}
    </>
  );
};
export default ProfileTab;
