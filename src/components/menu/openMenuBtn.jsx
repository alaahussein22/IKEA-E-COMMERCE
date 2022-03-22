import { useTranslation } from 'react-i18next';
const OpenMenuBtn = () => {
  const {i18n} = useTranslation();
  return (
    <button
      className={`resp-hide mx-2 ${i18n.dir()==='ltr'?' menu-btn-ltr':'menu-btn-rtl'}`}
      type='button'
      data-bs-toggle='offcanvas'
      data-bs-target='#offcanvasExample'
      aria-controls='offcanvasExample'
    >
      <i className='bi bi-list'></i>
    </button>
  );
};
export default OpenMenuBtn;
