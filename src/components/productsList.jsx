import React from 'react';
import ProductCard from './cards/productCard/productCard';
import EmptyData from './emptyData';
import Loader from './loader';

export default function ProductsList({
  loading,
  productsList,
  filteredList,
  roomBtn,
  baseUrl,
  search
}) {
  return (
    <div className='carousel-body overflow-hidden px-3 pb-2 mb-5'>
      <div className='row' id='show-proDetail'>
        {loading && <Loader />}
        {!loading && !productsList?.length ? (
          <EmptyData />
        ) : !loading && filteredList?.length === 0 ? (
          <EmptyData />
        ) : (
          ''
        )}

        {filteredList
          ? filteredList?.map((i) => (
              <ProductCard
                key={i.id}
                productData={i.data()}
                pId={i.id}
                showOptions
                roomBtn={roomBtn}
                carousel={false}
                baseUrl={baseUrl && baseUrl}
              />
            ))
          : productsList?.map((i) => (
              <ProductCard
                key={i.id}
                productData={search ? i.data : i.data()}
                pId={i.id}
                showOptions
                roomBtn={roomBtn}
                carousel={false}
                baseUrl={baseUrl && baseUrl}
              />
            ))}
      </div>
    </div>
  );
}
