/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import { routes } from 'App';
import { injectIntl } from 'react-intl';

function MenuPromotion(props) {
  const { history, intl } = props;
  const { pathname } = history.location;
  const [isActive, setIsActive] = useState(pathname);
  const activeMenu = path => {
    setIsActive(path);
    history.push(path);
  };
  const menus = [
    {
      path: routes.promotion.path,
      title: 'Tổng quan',
    },
    {
      path: routes.myTeam.path,
      title: intl.formatMessage({ id: 'my_team' }),
    },
    {
      path: routes.historyPromotion.path,
      title: intl.formatMessage({ id: 'history_receive' }),
    },
    {
      path: routes.tuturial.path,
      title: intl.formatMessage({ id: 'intro' }),
    },
  ];
  const renderMenu = () => {
    return menus.map((menu, index) => {
      return (
        <li key={index} className={isActive === menu.path ? 'active' : ''} onClick={() => activeMenu(menu.path)}>
          {menu.title}
        </li>
      );
    });
  };
  return (
    <nav className="promotion__nav sticky-top">
      <ul className="list-unstyled d-flex justify-content-between px-3 py-2">{renderMenu()}</ul>
    </nav>
  );
}

export default injectIntl(MenuPromotion);
