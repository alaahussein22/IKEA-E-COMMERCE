import { useTranslation } from 'react-i18next';

const MenuHeader = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <div className='offcanvas-header menu-header'>
        <button type='button' className={`${i18n.dir()==='ltr'?'menu-btn-ltr':'menu-btn-rtl'}`} data-bs-dismiss='offcanvas'>
          <i className='bi bi-x'></i>
        </button>
        <img
          src='https://www.ikea.com/eg/en/static/ikea-logo.f7d9229f806b59ec64cb.svg'
          alt='...'
        />
      </div>
    </>
  );
};
export default MenuHeader;
