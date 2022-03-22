import MenuHeader from './menuHeader';
import MenuMainBody from './menuMainBody';
import { useTranslation } from 'react-i18next';

const MenuBar = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <div
        className={`offcanvas ${
          i18n.dir() === 'ltr'
            ? 'offcanvas-start menu-bar-ltr'
            : 'offcanvas-end menu-bar-rtl'
        }`}
        tabIndex='-1'
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'
      >
        <MenuHeader />
        <MenuMainBody />
      </div>
    </>
  );
};
export default MenuBar;
