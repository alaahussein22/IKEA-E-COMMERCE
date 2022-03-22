import { useSelector } from 'react-redux';
import { deleteDocument, updateData } from '../../../services/firebase';
import { updateUserStorageByID } from '../../../services/firebase';
import { useTranslation } from 'react-i18next';
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { clearUser } from '../../../store/actions/auth';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const SettingsTab = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const id = useSelector((state) => state.user.id);

  var userInfo = {
    PrefferedStore: user.PrefferedStore,
  };

  const updateUser = () => {
    updateData('users', id, userInfo).then(() => {
      updateUserStorageByID(id);
    });
  };
  const auth = getAuth();
  // const history = useHistory();
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState('');
  const handleInput = (e) => {
    setPassword(e.target.value);
  };
  const deleteAccount = (e) => {
    e.preventDefault();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var cred = EmailAuthProvider.credential(user.email, password);
        reauthenticateWithCredential(user, cred)
          .then(() => {
            // user.delete().then(()=>{
            localStorage.removeItem('UID');
            // history.push('/sign');
            clearUser();
            deleteDocument(user.uid, 'users').then(() => {
              user.delete();
            });
            // })
          })
          .catch(() => {
            setValid(t('WrongPassword'));
          });
      }
    });
  };
  return (
    <>
      <section className='py-5 border-bottom'>
        <div className='row fw-bold d-flex justify-content-between mb-2'>
          <div className='col-6'>{t('IkeaStore')}</div>
        </div>
        <section className='col-12 col-lg-6'>
          <div className='form-floating floating-input-holder col-9'>
            <select
              className='form-select edit-input'
              id='floatingSelect'
              aria-label='Floating label select example'
              defaultValue={user.PrefferedStore}
              onChange={(e) => {
                userInfo.PrefferedStore = e.target.value;
                updateUser();
              }}
            >
              <option></option>
              <option value='1'>IKEA Cairo Mall Of Arabia</option>
              <option value='2'>IKEA CFC</option>
            </select>
            <label htmlFor='floatingSelect'>{t('PrefferedStore')}</label>
          </div>
        </section>
      </section>

      <section className='py-5 border-bottom'>
        <div className='row fw-bold d-flex justify-content-between mb-2'>
          <div className='col-6'>{t('DeleteProfile')}</div>
        </div>
        <p className='small-text'>{t('DeleteInfo')}</p>
        <button
          type='link'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'
        >
          {t('DeleteConfirmation')}
        </button>
        <div
          className='modal fade'
          id='staticBackdrop'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          tabIndex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={() => setValid('')}
                ></button>
              </div>
              <div className='modal-body'>
                <p>{t('DeleteDesc')}</p>
                <p>{t('EnterPassword')}</p>
                <input
                  type='password'
                  className='form-control edit-input'
                  onChange={handleInput}
                />
                {valid !== '' && <small className='text-danger'>{valid}</small>}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={() => setValid('')}
                >
                  {t('Cancel')}
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={deleteAccount}
                >
                  {t('DeleteAccount')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SettingsTab;
