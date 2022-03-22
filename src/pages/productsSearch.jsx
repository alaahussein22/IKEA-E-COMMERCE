import React, { useEffect, useState } from 'react';
import { getProductsBySearchText } from '../services/firebase';
import { useParams } from 'react-router-dom';
import ProductsList from '../components/productsList';
import { useTranslation } from 'react-i18next';

const ProductsSearch = () => {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(true);

  const {t} = useTranslation();
  const params = useParams();

  // useEffect(() => {
  //   console.log(params.query);
  //   console.log(searchResult);
  // }, [searchResult]);

  useEffect(() => {
    setLoading(true)
    getProductsBySearchText(RegExp(params.query, 'i')).then(res => {
      console.log("search",res);
      setLoading(false)
      setSearchResult(res);
    });
  }, [setSearchResult, params.query]);

  return (
    <>
      <h1>
        {t('ShowResultsForSearch')}"<strong>{params.query}</strong>"
      </h1>

     <ProductsList
        loading={loading}
        productsList={searchResult}
        search
      />  
    </>
  );
};

export default ProductsSearch;
