import React from 'react';
import { useTranslation } from 'react-i18next';
import FilterDropList from '../../../components/filterDropList/FilterDropList';

export default function AccordionFilter({ listName, items, title }) {
  const { t } = useTranslation();
  return (
    <div className='accordion-item'>
      <button
        className='accordion-button fw-bold filter-acc'
        style={{ background: 'white', color: 'black' }}
        type='button'
        data-bs-toggle='collapse'
        data-bs-target={'#' + listName}
        aria-expanded='false'
        aria-controls='flush-collapseOne'
      >
        {title}
      </button>

      <FilterDropList
        listName={listName}
        checkType='radio'
        items={items}
        accordion
      />
    </div>
  );
}
