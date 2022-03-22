import LocationAccordion from "../components/accordion/locationsAccordion";
import { useTranslation } from 'react-i18next';

const StoresPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='row big-title col-12 col-md-7 p-2 pt-nav'>
        {t('ChooseNearestStore')}
      </div>
      <div className='row small-text col-12 col-md-7 p-2'>
        {t('SelectLocalStore')}
      </div>
      <div
        className='accordion accordion-flush my-5'
        id='accordionFlushExample'
      >
          <LocationAccordion/>
      </div>
    </>
  );
};
export default StoresPage;
