import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/scss/pages/products2.scss';
import Carousel from '../carousel/carousel';
import LeftSide from './left-side';
import RightSide from './right-side';

const ProductA = (props) => {
  const { t } = useTranslation();
  const { prod } = props.location.state;
  return (
    <>
      <>
        <div className='container'>
          <div className='row'>
            <LeftSide prod={prod} />

            <RightSide prod={prod} />

            <div>
              <div className='pro-detail mt-5'>
                <h3>
                  <b>{t('RelatedProducts')}</b>
                </h3>
              </div>
              <Carousel
                condition={{
                  property: 'SubCategory',
                  operator: '==',
                  value: prod.productData.SubCategory,
                }}
                ignore={prod.id}
              />
            </div>
          </div>
        </div>

        {/* <h2 className="slide-head">Others also viewed</h2> */}

        {/* <Carousel /> */}

        {/* <h2 className="slide-head">Goes well with</h2>

          <Carousel /> */}
      </>

      {/* <h2 className="slide-head">Your recently viewed products</h2> */}

      {/* img - firestore */}

      {/* <section id="view-pro">
          <div className="container">
            <div className="row">
              <div className=" pictures" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
              <img className="col-1" src="https://www.ikea.com/eg/en/images/products/traedkrassula-duvet-cover-and-pillowcase-white-blue__0737274_pe741006_s5.jpg?f=xxs" alt="" />
            </div>
          </div>
        </section> */}
    </>
  );
};

export default ProductA;
