/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

export function countSecFromMin(str) {
  return parseInt(str.substring(8, 10)) * 60 + parseInt(str.substring(10, 12));
}
