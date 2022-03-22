import React from 'react';
import Carousel from '../components/carousel/carousel';
import ImageGallery from '../components/imageGallery/imageGallery';
import SalesButtons from '../components/salesButtons/salesButtons';
import Slider from '../components/slider/slider';
import GoodToKnowCards from '../components/goodToKnowCards/goodToKnowCards';

const Home = () => {
  return (
    <>
      <ImageGallery />

      <Carousel
        condition={{ property: 'SalePrice', operator: '>', value: 0 }}
      />

      <SalesButtons />

      <Slider />

      <Carousel
        condition={{ property: 'LowerPrice', operator: '==', value: true }}
      />

      <GoodToKnowCards />

      <Slider />
    </>
  );
};

export default Home;
