import { useTranslation } from 'react-i18next';
const LocationAccordion = () => {
  const { t ,i18n } = useTranslation();
  const storesInfo = [
    {
      id: 1,
      accordionID: 'One',
      location: 'IKEA Cairo store',
      image:
        'https://www.ikea.com/images/cairo-store-db07cb6826c51fb59f479c5ec2d140b1.jpg?f=xxxl',
      mapLocation:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1727.1296683817493!2d31.4073508!3d30.0294169!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x38e6fd139b6eb6ee!2sIKEA%20-%20Cairo%20Festival%20City!5e0!3m2!1sen!2seg!4v1640968514950!5m2!1sen!2seg',
      description: i18n.language==="en"?
        'IKEA Cairo store, Cairo Festival City Ring Road, 5th settlement, P.O. Box 11835'
        :'محل ايكيا القاهرة - فستيفال سيتي القاهرةالطريق الدائري، التجمع الخامس، ص.ب 11835',
      googleLink:
        'https://www.google.com/maps/place/IKEA+-+Cairo+Festival+City/@30.0294169,31.4073508,18z/data=!4m5!3m4!1s0x0:0x38e6fd139b6eb6ee!8m2!3d30.0295603!4d31.4072651',
      hotline: '16576',
      services: [
        {
          id: 'service1',
          name: i18n.language==="en"?'Store, Bistro, and Swedish Food Market'
          :'المتجر، كافيتيريا البيسترو وسوق الطعام السويدي',
          openingTimes: i18n.language==="en"?'Saturday - Wednesday: 10:00 AM to 10:00 PM Thursday - Friday: 10:00 AM to 11:00 PM'
          :'السبت - الأربعاء: 10:00 صباحًا حتى 10:00 مساءً الخميس - الجمعة: 10:00 صباحًا حتى 11:00 مساءً',
        },
        {
          id: 'service2',
          name: i18n.language==="en"?'Restaurant':'المطعم',
          openingTimes: i18n.language==="en"?'Saturday - Wednesday: 10:00 AM to 10:00 PM Thursday - Friday: 10:00 AM to 11:00 PM'
          :'السبت - الأربعاء: 9:00 صباحًا حتى 9:30 مساءً الخميس - الجمعة: 9:00 صباحًا حتى 10:30 مساءً',
        },
      ],
    },
    {
      id: 2,
      accordionID: 'Two',
      location: 'IKEA Mall of Arabia',
      image:
        'https://www.ikea.com/images/78/d3/78d32779e9eaa63235feb1309e5ac8c7.jpg?f=xxxl',
      mapLocation:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13819.94005468486!2d30.9749948!3d30.0085867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x17a19fbdd41296cc!2sIKEA%20-%20Mall%20Of%20Arabia!5e0!3m2!1sen!2seg!4v1640969784395!5m2!1sen!2seg',
      description:i18n.language==="en"?
        'IKEA Mall of Arabia Mall of Arabia, Expansion phase Gate 17 - 6th of October City'
        :'ايكيا مول العرب مول العرب، مرحلة التوسعة بوابة 17 - مدينة السادس من أكتوبر',
      googleLink:
        'https://www.google.com/maps/place/IKEA+-+Mall+Of+Arabia/@30.0085867,30.9749948,15z/data=!4m2!3m1!1s0x0:0x17a19fbdd41296cc?sa=X&ved=2ahUKEwiir4O8iLXvAhVEilwKHd3UDQYQ_BIwHnoECC4QBQ',
      hotline: '16576',
      services: [
        {
          id: 'service1',
          name: i18n.language==="en"?'Store, Bistro, and Swedish Food Market'
          :'المتجر، كافيتيريا البيسترو وسوق الطعام السويدي',
          openingTimes: i18n.language==="en"?'Saturday - Wednesday: 10:00 AM to 10:00 PM Thursday - Friday: 10:00 AM to 11:00 PM'
          :'السبت - الأربعاء: 10:00 صباحًا حتى 10:00 مساءً الخميس - الجمعة: 10:00 صباحًا حتى 11:00 مساءً',
        },
        {
          id: 'service2',
          name: i18n.language==="en"?'Restaurant':'المطعم',
          openingTimes: i18n.language==="en"?'Saturday - Wednesday: 10:00 AM to 10:00 PM Thursday - Friday: 10:00 AM to 11:00 PM'
          :'السبت - الأربعاء: 9:00 صباحًا حتى 9:30 مساءً الخميس - الجمعة: 9:00 صباحًا حتى 10:30 مساءً',
        },
        {
          id: 'service3',
          name: i18n.language==="en"?'Exit café':'مقهى الخروج',
          openingTimes: i18n.language==="en"?'Saturday - Wednesday: 09:00 AM to 09:30 PM Thursday - Friday: 09:00 AM to 10:30 PM'
          :'السبت - الأربعاء: 10:00 صباحًا حتى 10:00 مساءً الخميس - الجمعة: 10:00 صباحًا حتى 11:00 مساءً',
        },
      ],
    },
  ];
  
  return (
    <>
      {storesInfo.map((store) => {
        return (
          <div className='accordion-item p-4' key={store.accordionID}>
            <h2
              className='accordion-header'
              id={`flush-heading${store.accordionID}`}
            >
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target={`#flush-collapse${store.accordionID}`}
                aria-expanded='false'
                aria-controls={`flush-collapse${store.accordionID}`}
              >
                {store.location}
              </button>
            </h2>
            <div
              id={`flush-collapse${store.accordionID}`}
              className='accordion-collapse collapse'
              aria-labelledby={`flush-heading${store.accordionID}`}
              data-bs-parent='#accordionFlushExample'
            >
              <div className='accordion-body'>
                <img src={store.image} width='100%' alt='...' />
                <div className='row my-5'>
                  <iframe
                  key={store.id}
                    className='col-sm-6'
                    src={store.mapLocation}
                    width='600'
                    height='450'
                    allowFullScreen=''
                    loading='lazy'
                    title={store.id}
                  ></iframe>
                  <p className='small-text col-sm-6 col-lg-3'>
                    {store.description}
                    <br />
                    <br />
                    <strong
                      onClick={() => window.open(store.googleLink, '_blank')}
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      {t('GetDirection')}
                    </strong>
                    <br />
                    <br />
                    <strong>{t('Hotline')}: </strong>
                    {store.hotline}
                    <br />
                    <br />
                    {store.services.map((service) => {
                      return (
                        <label key={service.id}>
                          <strong>{service.name}: </strong>
                          <br />
                          <br />
                          {service.openingTimes}
                          <br />
                          <br />
                          <br />
                        </label>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default LocationAccordion;
