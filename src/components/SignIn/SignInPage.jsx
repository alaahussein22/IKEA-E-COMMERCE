import React, { useState, useRef, useEffect } from 'react';
import '../../assets/scss/pages/_login.scss';
import { Link } from 'react-router-dom';
import { signup, useAuth } from '../../firebaseConfig/firebase';
import { addDocByID } from '../../services/firebase';
import { changeUser } from '../../store/actions/auth';

import { useTranslation } from 'react-i18next';
import EyeIcon from '../eyeIcon';

function SignIn() {
  const { t } = useTranslation();
  const [isSecure, setSecure] = useState(true);
  const [users, setUser] = useState({
    FirstName: '',
    LastName: '',
    Phone: '',
    Email: '',
    Password: '',
  });

  const [errors, setError] = useState({
    FirstNameErr: null,
    LastNameErr: null,
    PhoneErr: null,
    EmailErr: null,
    PasswordErr: null,
  });

  const [allValid, setAllValid] = useState(
    errors.FirstNameErr === null &&
      errors.LastNameErr === null &&
      errors.PhoneErr === null &&
      errors.EmailErr === null &&
      errors.PasswordErr === null
  );
  // Function to hadndle change in any input and write into it
  const handleChangeInInput = (e) => {
    const regName = /^\w[a-zA-Z]{3,}/;
    const regPhoneNum = /^01[0125][0-9]{8}$/;
    const regEmail = /^([a-zA-Z0-9_\-\.]+){3,}@([a-zA-Z0-9_\-\.]+){3,}(.com)$/;
    // const regName = /^\w[a-zA-Z]{3,}[^-\s][a-zA-Z]{3,}/;
    const regPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?_&])[A-Za-z\d@$!%*?_&]{8,}$/;

    // Validate Name Input
    setUser({
      ...users,
      [e.target.name]: e.target.value,
    });

    // Validate Name Input
    if (e.target.name === 'FirstName') {
      if (regName.test(e.target.value)) {
        setError({
          ...errors,
          FirstNameErr: null,
        });
      } else {
        setError({
          ...errors,
          FirstNameErr: t('NameValidation'),
        });
      }
    } else if (e.target.name === 'LastName') {
      if (regName.test(e.target.value)) {
        setError({
          ...errors,
          LastNameErr: null,
        });
      } else {
        setError({
          ...errors,
          LastNameErr: t('NameValidation'),
        });
      }
    } else if (e.target.name === 'Phone') {
      if (regPhoneNum.test(e.target.value)) {
        setError({
          ...errors,
          PhoneErr: null,
        });
      } else {
        setError({
          ...errors,
          PhoneErr: t('PhoneInvalid'),
        });
      }
    }

    // Validate Email Input
    else if (e.target.name == 'Email') {
      if (regEmail.test(e.target.value)) {
        setError({
          ...errors,
          EmailErr: null,
        });
      } else {
        setError({
          ...errors,
          EmailErr: t('ValidEmailExample'),
        });
      }
    }

    // Validate Password Input
    else if (e.target.name == 'Password') {
      if (regPassword.test(e.target.value)) {
        setError({
          ...errors,
          PasswordErr: null,
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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const storeRef = useRef();

  async function handleSignup(e) {
    console.log('function signIn');
    var userObj = {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Email: emailRef.current.value,
      PhoneNum: phoneRef.current.value,
      PrefferedStore: storeRef.current.value,
    };
    setLoading(true);
    if (!allValid) {
      e.preventDefault();
    } else {
      try {
        await signup(emailRef.current.value, passwordRef.current.value).then(
          userCredentials => {
            addDocByID('users', userCredentials.user.uid, userObj).then(() => {
              localStorage.setItem('UID', userCredentials.user.uid);
              // changeUser(userObj);
              window.location.href = '/profile';
            });
          }
        );
      } catch {
        alert(t('UserExists'));
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    setAllValid(
      errors.FirstNameErr === null &&
        errors.LastNameErr === null &&
        errors.PhoneErr === null &&
        errors.EmailErr === null &&
        errors.PasswordErr === null
    );
  }, [errors]);
  return (
    <>
      <div className='log-parent'>
        <div className='container'>
          {/* <!-- Left section --> */}
          <section className='row left-box-log'>
            <section className='col-md-5 col-12 login-heading'>
              <h3>{t('CreateIkeaProfile')}</h3>
              <p>
                {t('AlreadyHaveAccount')} <Link to='/login'> {t('Login')}</Link>{' '}
              </p>
            </section>

            {/* <!-- Center Section --> */}
            <section className='col-md-2 col-12 center-sec'></section>
            {/* <!-- Right Section --> */}
            <section className='col-md-5 col-12 login-form'>
              <div className='form-floating mb-3 input-log'>
                <div className='row g-3 needs-validation' noValidate>
                  <div className='input-box'>
                    <input
                      type='text'
                      className='form-control input-sign-form'
                      id='validationCustom01'
                      name='FirstName'
                      placeholder={t('FirstName')}
                      required
                      onChange={e => {
                        handleChangeInInput(e);
                      }}
                      ref={firstNameRef}
                    />
                    <small className='text-danger'>{errors.FirstNameErr}</small>
                  </div>
                  <div className='input-box'>
                    <input
                      type='text'
                      className='form-control input-sign-form'
                      id='validationCustom02'
                      name='LastName'
                      placeholder={t('LastName')}
                      required
                      onChange={e => {
                        handleChangeInInput(e);
                      }}
                      ref={lastNameRef}
                    />
                    <small className='text-danger'>{errors.LastNameErr}</small>
                  </div>
                  <div className='input-box'>
                    <div className='input-group has-validation'>
                      <input
                        type='text'
                        className='form-control input-sign-form'
                        id='validationCustom01'
                        name='Phone'
                        placeholder='EG(011, 012, 015, 010)'
                        onChange={e => {
                          handleChangeInInput(e);
                        }}
                        ref={phoneRef}
                      />
                      <small className='text-danger'>{errors.PhoneErr}</small>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='validationCustom04'
                      className='form-label selct-label-form-sign'
                    >
                      {t('PrefferedStore')}
                    </label>
                    <select
                      className='form-select selct-form-sign'
                      id='validationCustom04'
                      required
                      ref={storeRef}
                    >
                      <option></option>
                      <option value='1'>IKEA Cairo Mall Of Arabia</option>
                      <option value='2'>IKEA CFC</option>
                    </select>
                    <div className='invalid-feedback'>
                      {t('PrefferedStoreValidation')}
                    </div>
                  </div>

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
                        <p></p>
                        <p className='text-secondary'>
                          {' '}
                          {t('ValidEmailExample')}
                        </p>
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
                          setSecure={(value)=>{setSecure(value)}}
                          />
                          </div>
                        <p></p>
                        <p className='text-secondary'>
                          {t('CharPassValidation')}
                        </p>
                        <p className='text-secondary'>
                          {t('SmallAndUppercaseValidation')}
                        </p>
                        <p className='text-secondary'>
                          {t('SpecialCharValidation')}
                        </p>
                        <p className='text-danger'>{errors.PasswordErr}</p>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                    <input type='checkbox' className='check-sign-form' /> I have
                    read and understood the <Link to=''>Privacy policy.</Link>
                  </div> */}

                  <div className='col-12'>
                    <button
                      className='btn btn-primary'
                      type='submit'
                      onClick={handleSignup}
                    >
                      {t('CreateProfile')}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default SignIn;
