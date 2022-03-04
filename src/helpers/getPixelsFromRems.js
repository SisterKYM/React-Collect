const getPixelsFromRems = (rems) =>
  rems * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);

export default getPixelsFromRems;
