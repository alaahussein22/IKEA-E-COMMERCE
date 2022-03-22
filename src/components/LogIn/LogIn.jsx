import React from 'react';
import '../../assets/scss/pages/_login.scss';
import { Link } from 'react-router-dom';
import SharedLogComp from '../SharedLogCom/ShahredLogCom';
import { useTranslation } from 'react-i18next';

function LogIn() {
  const { t } = useTranslation();

  return (
    <>
      <div className='log-parent'>
        <div className='container'>
          {/* <!-- Left section --> */}
          <section className='row left-box-log'>
            <section className='col-md-5 col-12 login-heading'>
              <h3>{t('LoginToYourAccount')}</h3>
              <p>
                {t('LoginDesc')}
              </p>
              <button className='login-creation'>
                {' '}
                <Link to='/sign'>{t('CreateAccount')}</Link>{' '}
              </button>
            </section>

            {/* <!-- Center Section --> */}
            <section className='col-md-2 col-12 center-sec'></section>
            {/* <!-- Right Section --> */}
            <section className='col-md-5 col-12 login-form'>
              <SharedLogComp />
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default LogIn;
