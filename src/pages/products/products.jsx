import FilterButton from './../../components/filterButton/filterButton';
import SubCategoryCard from './../../components/cards/subcategoryCard';
import ProductRoomBtn from './productRoomBtn';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterCollection, getDocumentByID } from '../../services/firebase';
import SectionTitle from './sectionTitle';
import Carousel from './../../components/carousel/carousel';
import { useTranslation } from 'react-i18next';

import Filters from './filters';
import {
  getProdList,
  clearFilters,
  clearProducts,
  getNewProds,
} from '../../store/actions/productsList';
import ProductsList from '../../components/productsList';

const Products = ({ match }) => {
  const { t , i18n } = useTranslation();
  let { type, name, id, subName, subId, sale, newArrival } = match?.params;

  let { productsList, filteredList } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [subCategories, setSubCategories] = useState(null);
  const [currentSub, setCurrentSub] = useState(null);
  const [roomBtn, setRoomBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  const getSubCategories = () => {
    filterCollection(
      'subCategory',
      [
        type === 'product' ? 'ProductCategory' : 'RoomCategory',
        'array-contains',
        `${id}`,
      ],
      ['Name', '!=', `${subName}`]
    ).then(allSubCategories => {
      setSubCategories(allSubCategories);
    });
  };

  const getCurrentSub = () => {
    getDocumentByID('subCategory', subId).then(current => {
      setCurrentSub(current);
    });
  };

  const getProducts = async () => {
    let condition = sale
      ? { SalePrice: ['SalePrice', '>', 0] }
      : subId
      ? { SubCategory: ['SubCategory', '==', subId] }
      : { Sort: ['CreatedAt', 'desc'] };

    newArrival
      ? dispatch(await getNewProds(condition))
      : dispatch(await getProdList(condition));
    setLoading(false);
  };

  const clearHandler = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    Promise.all([
      getProducts(),
      subId && getSubCategories(),
      subId && getCurrentSub(),
    ]);
    return () => {
      dispatch(clearProducts());
    };
  }, [match.params.subId, match.params]);
  return (
    <>
      {subId && (
        <>
          <SectionTitle
            title={
              i18n.language === 'en' ? currentSub?.Name : currentSub?.NameAr
            }
          />

          <section className='col-12 col-md-7 col-lg-7'>
            <p className='description'>
              {i18n.language === 'en'
                ? currentSub?.Description
                : currentSub?.DescriptionAr}
            </p>
          </section>
        </>
      )}

      {!newArrival && (
        <div className='row  filter-row '>
          <Filters allProducts={productsList} sale={sale} />

          <ProductRoomBtn
            totalItems={
              filteredList ? filteredList?.length : productsList.length
            }
            setRoomBtn={val => setRoomBtn(val)}
          />
        </div>
      )}

      {filteredList && (
        <div className='my-3'>
          <FilterButton
            title='clear filter'
            icon='bi bi-x'
            noDrop
            onClick={clearHandler}
          />
        </div>
      )}

      <ProductsList
        loading={loading}
        productsList={productsList}
        filteredList={filteredList}
        roomBtn={roomBtn}
        baseUrl={subId && match.url}
      />

      <SectionTitle title={t('TopSeller')} />
      <Carousel
        condition={{ property: 'SalePrice', operator: '>', value: 0 }}
      />

      <SectionTitle title={t('RelatedCategories')} />
      {/* <Loader /> */}
      <div className='row mx-auto g-3 categories-slidder'>
        {subCategories &&
          subCategories.map(subcategory => {
            return (
              <SubCategoryCard
                element={subcategory}
                key={subcategory.id}
                type={type}
                name={name}
                id={id} //categId
              />
            );
          })}
      </div>
    </>
  );
};

export default Products;
