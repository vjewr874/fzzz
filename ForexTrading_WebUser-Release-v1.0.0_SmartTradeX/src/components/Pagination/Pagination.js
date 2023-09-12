/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './styles/pagination.scss';
function Pagination(props) {
  return (
    <div id={'pagination'}>
      <div className={'container-pagination'}>
        <div
          className={`btn-pagination ${props?.page <= 0 ? 'disabled' : ''}`}
          onClick={() => props?.handleChangePage('prev')}
        >
          {'<'}
        </div>
        <p className={'pagination-number'}>
          {props?.page ? props?.page + 1 : 1}/{props.totalRecords ? props.totalRecords : 167}
        </p>
        <div
          className={`btn-pagination ${props?.page + 1 >= props?.totalRecords ? 'disabled' : ''}`}
          onClick={() => props?.handleChangePage('next')}
        >
          {'>'}
        </div>
      </div>
    </div>
  );
}
export default Pagination;
