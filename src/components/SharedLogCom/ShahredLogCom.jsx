import React, { useState, useRef } from 'react';
import '../../assets/scss/pages/_login.scss';
import { login, useAuth } from '../../firebaseConfig/firebase';
import { Link } from 'react-router-dom';
import { changeUser } from '../../store/actions/auth';
// import {auth} from '../../config/firebaseConfig'
// import Hello from '../Hello';
import { useTranslation } from 'react-i18next';
import EyeIcon from '../eyeIcon';

function SharedLogComp() {
  const { t } = useTranslation();
  const [isSecure, setSecure] = useState(true);
  const [users, setUser] = useState({
    Email: '',
    Password: '',
  });

  const [errors, setError] = useState({
    EmailErr: null,
    PasswordErr: null,
  });

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  // Function to hadndle change in any input and write into it
  const handleChangeInInput = (e) => {
    const regEmail = /^([a-zA-Z0-9_\-\.]+){3,}@([a-zA-Z0-9_\-\.]+){3,}(.com)$/;
    const regName = /^\w[a-zA-Z]{3,}[^-\s][a-zA-Z]{3,}/;
    const regPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?_&]{8,}$/;

    // console.log(e.target.value , e.target.name);

    setUser({
      ...users,
      [e.target.name]: e.target.value,
    });
    // Validate Email Input
    if (e.target.name == 'Email') {
      if (regEmail.test(e.target.value)) {
        setError({
          ...errors,
          EmailErr: '',
        });
      } else {
        setError({
          ...errors,
          EmailErr: t('EmailInvalid'),
        });
      }
    }
    // Validate Password Input
    else if (e.target.name == 'Password') {
      if (regPassword.test(e.target.value)) {
        setError({
          ...errors,
          PasswordErr: '',
        });
      } else {
        setError({
          ...errors,
          PasswordErr: t('PasswordInvalid'),
        });
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin() {
    console.log('function login');
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value).then(
        (userCredentials) => {
          // changeUser(userCredentials.user.uid);
          localStorage.setItem('UID', userCredentials.user.uid);
        }
      );
      window.location.href = '/profile';
    } catch {
      alert('User not found you can signup!');
      window.location.href = '/sign';
    }
    setLoading(false);
  }

  return (
    <>
      <div className='form-floating mb-3 input-log'>
        <div className='row g-3 needs-validation' noValidate>
          <div>
            <input
              type='text'
              className='form-control input-sign-form'
              id='validationCustom05'
              placeholder={t('EmailPlaceholder')}
              name='Email'
              required
              onChange={(e) => {
                handleChangeInInput(e);
              }}
              ref={emailRef}
            />

            <p className='text-secondary'> {t('ValidEmailExample')}</p>

            <p></p>
            <p className='text-secondary'> {t('ValidEmailExample')}</p>

            <small className='text-danger'>{errors.EmailErr}</small>
          </div>
          <div>
            <div className='inpCont'>
              <input
                type={isSecure?'password':'text'}
                className='form-control input-sign-form'
                id='validationCustom05'
                required
                name='Password'
                placeholder={t('PasswordPlaceholder')}
                onChange={(e) => {
                  handleChangeInInput(e);
                }}
                ref={passwordRef}
              />
              <EyeIcon
                isSecure={isSecure}
                setSecure={(value) => {
                  setSecure(value);
                }}
              />
            </div>
            <p></p>
            <p className='text-secondary'>{t('CharPassValidation')}</p>
            <p className='text-secondary'>{t('SmallAndUppercaseValidation')}</p>
            <p className='text-secondary'>{t('SpecialCharValidation')}</p>
            <p className='text-danger'>{errors.PasswordErr}</p>
          </div>

          <a href='#'>{t('ForgetPassword')}</a>
          <button
            className='login-creation'
            onClick={() => {
              handleLogin();
            }}
          >
            {' '}
            {t('Login')}{' '}
          </button>
        </div>
      </div>
    </>
  );
}

export default SharedLogComp;
