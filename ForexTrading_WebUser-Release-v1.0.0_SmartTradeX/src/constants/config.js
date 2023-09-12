/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

export const MIN_STAKING = 10000;
export const STACKING_ACTIVITY_STATUS = {
  NEW: 0,
  STAKING: 10,
  CANCELED: 20,
  COMPLETED: 30,
};

export const STAKING_ACTIVITY_STATUS_STRING = {
  [STACKING_ACTIVITY_STATUS.NEW]: 'staking_new',
  [STACKING_ACTIVITY_STATUS.STAKING]: 'staking_staking',
  [STACKING_ACTIVITY_STATUS.CANCELED]: 'staking_cancel',
  [STACKING_ACTIVITY_STATUS.COMPLETED]: 'staking_completed',
};
