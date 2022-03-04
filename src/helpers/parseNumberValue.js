const parseNumberValue = (value, {float} = {float: true}) =>
  float
    ? value && Number.parseFloat(value.replace(/\$|,/g, ''))
    : value && Number.parseInt(value.replace(/,/g, ''), 10);

export default parseNumberValue;
