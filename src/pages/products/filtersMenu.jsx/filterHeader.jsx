import React from "react";
import { useTranslation } from "react-i18next";

export default function FilterHeader() {
  const {t} = useTranslation();
  return (
    <div className="offcanvas-header border">
      <h5 className="offcanvas-title m-auto" id="filter-menue-Label">
       {t('FilterHeader')}
      </h5>
      <button
        type="button"
        className="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
  );
}
