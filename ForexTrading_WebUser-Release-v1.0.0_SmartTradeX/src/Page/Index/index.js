/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect } from 'react';
import Banner from './banner';
import Outer from './outer';
import Welcome from './welcome';
import ListPackage from './listPackage';
import Demo from './demo';
import OurMembers from './ourMembers';
import Customers from './customers';
import Partners from './partners';

function Index(props) {
  useEffect(() => {
    window.AOS.init();
  }, []);

  return (
    <div className="home">
      <Banner />
      <Outer />
      <Welcome />
      <Demo />
      <ListPackage />
      <OurMembers />
      <Partners />
      <Customers />
    </div>
  );
}
export default Index;
