const normalizeAmount = (value) => {
  const val = value.toString().replace(/[^\d.]/g, '');
  const numeral = Number.parseFloat(val);
  const fixedString = numeral.toFixed(2);
  const fixed = Number.parseFloat(fixedString);
  if (numeral === fixed || Number.isNaN(numeral)) {
    return val;
  }

  return fixedString;
};

export default normalizeAmount;
