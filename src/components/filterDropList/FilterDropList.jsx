import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../store/actions/productsList';
import FilterListItem from './filterListItem';

const FilterDropList = (props) => {
  const { listName, accordion, items } = props;

  let { filters, filteredList } = useSelector((state) => state.products);
  const dispatsh = useDispatch();

  const [selectedOPtion, setSelectedOp] = useState('');

  const chooseOption = async (newValue) => {
    let updateFilters = {};

    setSelectedOp(newValue?.id ? newValue.id : newValue);
    if (listName === 'Sort') {
      updateFilters = { ...filters, Sort: newValue.condition };
    } else if (listName === 'Price') {
      updateFilters = {
        ...filters,
        Price: ['Price', '<=', parseInt(newValue)],
      };
    } else {
      updateFilters = { ...filters, [listName]: [listName, '==', newValue] };
    }

    dispatsh(await updateFilter(updateFilters));
  };

  useEffect(() => {
    !filteredList && setSelectedOp('');
  }, [filters]);

  return (
    <>
      {accordion ? (
        <div
          id={listName}
          className='accordion-collapse collapse'
          aria-labelledby='flush-headingOne'
          data-bs-parent='#accordionFlushExample'
        >
          <ul className='w-100 px-3'>
            {items.map((item, index) => (
              <FilterListItem
                key={index}
                label={item.label}
                id={item.id}
                condition={item.condition}
                selectedOPtion={selectedOPtion}
                chooseOption={chooseOption}
                {...props}
              />
            ))}
          </ul>
        </div>
      ) : (
        <ul
          className='dropdown-menu my-2 indx1'
          style={{ width: '250px' }}
          aria-labelledby='dropdownMenu'
        >
          {items.map((item, index) => (
            <FilterListItem
              key={index}
              label={item.label}
              id={item.id}
              condition={item.condition}
              selectedOPtion={selectedOPtion}
              chooseOption={chooseOption}
              {...props}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default FilterDropList;
