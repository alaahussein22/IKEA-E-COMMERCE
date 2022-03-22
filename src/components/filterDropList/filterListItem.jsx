import React from 'react';

const FilterListItem = ({
  id,
  label,
  listName,
  checkType,
  condition,
  chooseOption,
  selectedOPtion,
  accordion,
}) => {
  return (
    <div
      className={`dropdown-item d-flex flex-row align-items-center justify-content-between ${
        accordion ? 'padA' : ''
      }`}
    >
      <label className='form-check-label' htmlFor={id}>
        {label}
      </label>
      <div className='form-check'>
        <input
          className='form-check-input'
          type={checkType ? checkType : 'radio'}
          name={listName}
          id={id}
          value={id}
          checked={selectedOPtion === id}
          onChange={() => chooseOption(condition ? { id, condition } : id)}
        />
      </div>
    </div>
  );
};

export default FilterListItem;
