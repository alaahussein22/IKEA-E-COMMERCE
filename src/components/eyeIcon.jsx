import React from 'react';
import { useTranslation } from 'react-i18next';

const EyeIcon = ({ isSecure, setSecure,err }) => {
  const { i18n } = useTranslation();
  console.log('ree',err);
  return (
    <i
      className={`far ${isSecure ? 'fa-eye' : 'fa-eye-slash'} ${
        i18n.language === 'en' ? 'eye' : 'eyeAr' }
        ${err?'error':''}`}
      id='togglePassword'
      onClick={() => setSecure(!isSecure)}
    ></i>
  );
};

export default EyeIcon;
