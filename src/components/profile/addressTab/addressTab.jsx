import { useSelector } from 'react-redux';
import { useState } from 'react';
import { updateData } from '../../../services/firebase';
import { updateUserStorageByID } from '../../../services/firebase';
import Loader from '../../loader';
import { useTranslation } from 'react-i18next';

const AddressTab = () => {
  const { t } = useTranslation();
  const [editSection, setEditSection] = useState(0);
  const user = useSelector((state) => state.user.user);
  const id = useSelector((state) => state.user.id);
  const [loader, setLoader] = useState(false);

  var userInfo = {
    Address: user.Address,
  };

  const updateUser = () => {
    setLoader(true);
    updateData('users', id, userInfo)
      .then(() => {
        updateUserStorageByID(id).then(() => setLoader(false));
      })
    setEditSection(0);
  };
  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <section className='py-5 border-bottom'>
          <div className='row fw-bold d-flex justify-content-between mb-2'>
            <div className='col-6'>{t('Address')}</div>
            {editSection !== 1 && (
              <button
                className='col-3 text-end text-decoration-underline'
                onClick={() => setEditSection(1)}
              >
              {t('Edit')}
              </button>
            )}
            {editSection === 1 && (
              <button
                className='col-3 text-end text-decoration-underline'
                onClick={() => setEditSection(0)}
              >
              {t('Close')}
              </button>
            )}
          </div>
          {editSection !== 1 && (
            <>
              {!user.Address && <span className='small-text'>{t('AddAddress')}</span>}
              <span className='d-block'>{user.Address}</span>
            </>
          )}
          {editSection === 1 && (
            <>
              <section className='col-12 col-lg-6'>
                <div className='form-floating floating-input-holder'>
                  <textarea
                    className='form-control edit-input'
                    placeholder='Leave a comment here'
                    id='floatingTextarea2'
                    style={{ height: '100px' }}
                    defaultValue={user.Address}
                    onChange={(e) => {
                      userInfo.Address = e.target.value;
                    }}
                  ></textarea>
                  <button
                    className='default-btn cancel-change-btn col-12 mt-5'
                    onClick={() => setEditSection(0)}
                  >
                  {t('Cancel')}
                  </button>
                  <button
                    className='dark-btn save-change-btn col-12'
                    onClick={() => updateUser()}
                  >
                  {t('SaveChanges')}
                  </button>
                </div>
              </section>
            </>
          )}
        </section>
      )}
    </>
  );
};
export default AddressTab;
