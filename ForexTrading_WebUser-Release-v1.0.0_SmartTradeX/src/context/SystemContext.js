/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { handleGetAppConfigurationSuccess } from 'actions/appAction';
import moment from 'moment';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SystemConfiguration from 'services/systemConfiguration';

export const SystemContext = createContext(null);

export function SystemProvider({ children }) {
  const system = useSelector(state => state.app?.config);
  return <SystemContext.Provider value={{ system }}>{children}</SystemContext.Provider>;
}

export function useSystem() {
  return useContext(SystemContext);
}
