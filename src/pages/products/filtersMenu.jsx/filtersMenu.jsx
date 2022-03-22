import React from 'react';
import { useTranslation } from 'react-i18next';
import AccordionFilter from './accordionFilter';
import FilterHeader from './filterHeader';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters } from '../../../store/actions/productsList';

export default function FiltersMenu({
  sale,
  colors,
  materials,
  widthes,
  lengthes,
  heights,
  sortStates,
  pricesStates,
}) {
  const { t, i18n } = useTranslation();
  let { filteredList } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const clearHandler = () => {
    dispatch(clearFilters());
  };
  return (
    <div
      className='offcanvas offcanvas-end'
      tabIndex='-1'
      id='filter-menue'
      aria-labelledby='filter-menueLabel'
    >
      <FilterHeader />

      <div className='offcanvas-body'>
        <div className='accordion accordion-flush' id='accordionFlushExample'>
          {!sale && (
            <AccordionFilter
              title={t('Sort')}
              listName='Sort'
              items={sortStates}
            />
          )}

          {colors && (
            <AccordionFilter
              listName={i18n.language === 'en' ? 'Color' : 'ColorAr'}
              title={t('Color')}
              items={colors}
            />
          )}

          {!sale && (
            <AccordionFilter
              listName='Price'
              title={t('Price')}
              items={pricesStates}
            />
          )}

          {materials && (
            <AccordionFilter
              listName={i18n.language === 'en' ? 'Material' : 'MaterialAr'}
              title={t('Material')}
              items={materials}
            />
          )}

          {widthes && (
            <AccordionFilter
              listName={'Width'}
              title={t('Width')}
              items={widthes}
            />
          )}

          {lengthes && (
            <AccordionFilter
              listName={'Length'}
              title={t('Length')}
              items={lengthes}
            />
          )}

          {heights && (
            <AccordionFilter
              listName={'Height'}
              title={t('Height')}
              items={heights}
            />
          )}
        </div>
      </div>

      <div className='offcanvas-footer text-center'>
        <button
          className='rounded-pill py-1 col-5 clear-btn'
          onClick={clearHandler}
        >
          Clear all
        </button>
        <button className='border rounded-pill py-1 col-5 text-light view-btn'>
          View
          <span>{' ' + filteredList && filteredList?.length}</span>
        </button>
      </div>
    </div>
  );
}
