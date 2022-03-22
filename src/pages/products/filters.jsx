import FilterButton from './../../components/filterButton/filterButton';
import FilterDropList from './../../components/filterDropList/FilterDropList';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FiltersMenu from './filtersMenu.jsx/filtersMenu';

const Filters = ({ allProducts, sale }) => {
  const { t, i18n } = useTranslation();

  const [materials, setMaterials] = useState(null);
  const [colors, setColors] = useState(null);
  const [widthes, setWidthes] = useState(null);
  const [lengthes, setLengthes] = useState(null);
  const [heights, setHeights] = useState(null);

  const getUniqueFilters = () => {
    let colors = [];
    let materials = [];
    let widthes = [];
    let lengthes = [];
    let heights = [];

    allProducts.forEach((product) => {
      const { ColorAr, Color, Material, MaterialAr, Width, Length, Height } =
        product.data();

      let foundColor = colors.find(
        (col) => col.label === (i18n.language === 'en' ? Color : ColorAr)
      );
      !foundColor &&
        colors.push({
          label: i18n.language === 'en' ? Color : ColorAr,
          id: i18n.language === 'en' ? Color : ColorAr,
        });

      let foundMaterial = materials.find(
        (mat) => mat.label === (i18n.language === 'en' ? Material : MaterialAr)
      );
      !foundMaterial &&
        (i18n.language === 'en' ? Material : MaterialAr) !== undefined &&
        materials.push({
          label: i18n.language === 'en' ? Material : MaterialAr,
          id: i18n.language === 'en' ? Material : MaterialAr,
        });

      let foundWidth = widthes.find((wid) => wid.label === Width);
      !foundWidth &&
        Width !== undefined &&
        widthes.push({ label: Width, id: Width });

      let foundLength = lengthes.find((len) => len.label === Length);
      !foundLength &&
        Length !== undefined &&
        lengthes.push({ label: Length, id: Length });

      let foundHeight = heights.find((height) => height.label === Height);
      !foundHeight &&
        Height !== undefined &&
        heights.push({ label: Height, id: Height });
    });

    materials.length > 0 && setMaterials(materials);
    widthes.length > 0 && setWidthes(widthes);
    colors.length > 0 && setColors(colors);
    lengthes.length > 0 && setLengthes(lengthes);
    heights.length > 0 && setHeights(heights);
  };

  useEffect(() => {
    allProducts && getUniqueFilters();
  }, [allProducts]);

  const sortStates = [
    {
      label: t('Newest'),
      condition: ['CreatedAt', 'desc'],
      id: t('Newest'),
    },
    {
      label: t('PriceLowToHigh'),
      condition: ['Price', 'asc'],
      id: t('PriceLowToHigh'),
    },
    {
      label: t('PriceHighToLow'),
      condition: ['Price', 'desc'],
      id: t('PriceHighToLow'),
    },
    {
      label: t('Name'),
      condition: ['Name', 'asc'],
      id: t('Name'),
    },
  ];

  const pricesStates = [
    {
      label: t('Max2000'),
      id: '2000',
    },
    {
      label: t('Max3000'),
      id: '3000',
    },
    {
      label: t('Max4000'),
      id: '4000',
    },
    {
      label: t('Max5000'),
      id: '5000',
    },
    {
      label: t('Max10000'),
      id: '10000',
    },
    {
      label: t('Max20000'),
      id: '20000',
    },
  ];

  return (
    <div className='col-12 col-lg-8 d-flex flex-nowrap scroll py-3 my-2'>
      {!sale && (
        <>
          <FilterButton title={t('Sort')} icon='fas fa-chevron-down' />
          <FilterDropList
            listName='Sort'
            checkType='radio'
            items={sortStates}
          />
        </>
      )}

      {colors && (
        <>
          <FilterButton title={t('Color')} icon='fas fa-chevron-down' />
          <FilterDropList
            listName={i18n.language === 'en' ? 'Color' : 'ColorAr'}
            checkType='radio'
            items={colors}
            title={t('Color')}
          />
        </>
      )}

      {!sale && (
        <>
          <FilterButton
            id='price-filter'
            title={t('Price')}
            icon='fas fa-chevron-down'
          />
          <FilterDropList
            listName='Price'
            checkType='radio'
            items={pricesStates}
          />
        </>
      )}

      {materials && (
        <>
          <FilterButton title={t('Material')} icon='fas fa-chevron-down' />
          <FilterDropList
            listName={i18n.language === 'en' ? 'Material' : 'MaterialAr'}
            checkType='radio'
            items={materials}
          />
        </>
      )}

      {widthes && (
        <>
          <FilterButton title={t('Width')} icon='fas fa-chevron-down' />
          <FilterDropList listName='Width' checkType='radio' items={widthes} />
        </>
      )}

      {lengthes && (
        <>
          <FilterButton title={t('Length')} icon='fas fa-chevron-down' />
          <FilterDropList
            listName='Length'
            checkType='radio'
            items={lengthes}
          />
        </>
      )}

      {heights && (
        <>
          <FilterButton title={t('Height')} icon='fas fa-chevron-down' />
          <FilterDropList listName='Height' checkType='radio' items={heights} />
        </>
      )}

      <FilterButton
        title={t('AllFilters')}
        icon='fas fa-filter'
        noDrop
        offcanvas
      />
      <FiltersMenu  
        sale={sale} 
        colors = {colors}
        materials ={materials}
        widthes = {widthes}        
        lengthes ={lengthes}
        heights = {heights}      
        sortStates={sortStates}
        pricesStates={pricesStates} 
        />
    </div>
  );
};

export default Filters;
