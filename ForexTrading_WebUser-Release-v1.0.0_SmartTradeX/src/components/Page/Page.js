/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Header from './components/Header/Header';
import React from 'react';
function Page(props) {
  return (
    <>
      <Header headerRight={props?.headerRight} {...props} />
      <div style={{ paddingBottom: '48px' }} />
      {props?.children}
    </>
  );
}
export default Page;
