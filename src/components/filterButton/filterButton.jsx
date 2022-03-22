import React from 'react';

const FilterButton = ({ noDrop, title, icon ,onClick,offcanvas}) => {
  return (
    <button
      type='button'
      className='btn btn-light filter-btn'
      data-bs-toggle={offcanvas?'offcanvas': noDrop?'':'dropdown'}
      href={offcanvas && "#filter-menue"}
      onClick={onClick&&onClick}
    >
      {title}
      {icon && <i className={icon}></i>}
    </button>
  );
};

export default FilterButton;
