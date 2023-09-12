/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

export const removeScrollBar = () => {
  let element = document.getElementById('root');
  element.classList.remove('overflow-hidden__body');
};
export const addScrollBar = () => {
  let element = document.getElementById('root');
  element.classList.add('overflow-hidden__body');
};
