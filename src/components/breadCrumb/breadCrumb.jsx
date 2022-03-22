import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({state}) => {
  const {type,name,subCatName}=state
    return (
        <div className="breadcrumb-container">
          <nav aria-label="breadcrumb" >
            <ol className="breadcrumb breadcrumb-list">
              <li className="breadcrumb-item">
                <Link className="bc-breadcrumb__link" to='./'>{type}</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link className="bc-breadcrumb__link" to='./' id='catg-b-crumb'>{name}</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link className="bc-breadcrumb__link" to='./' id='sub-b-crumb'>{subCatName}</Link>
              </li>
            </ol>
          </nav>
        </div> 
    );
}

export default Breadcrumb;
