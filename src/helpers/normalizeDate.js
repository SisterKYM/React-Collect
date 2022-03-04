const normalizeDate = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (!value || Number.isNaN(parsed)) {
    return '';
  }
  const cleanedValue =
    value.length > 1 && value[0] === '0' && !Number.isNaN(Number(value[1]))
      ? `0${parsed}`
      : `${parsed}`;

  if (value.length < 3) {
    if (Number.isNaN(parsed)) {
      return '';
    }

    return cleanedValue;
  }
  if (value.length === 3) {
    if (value[2] === '/') {
      return value;
    }
    if (!Number.isNaN(Number(value[2]))) {
      const day = value.slice(0, 2);
      const month = value.slice(2);

      return `${day}/${month}`;
    }

    return value.slice(0, 2);
  }
  if (value.length < 6) {
    const splitted = value.split('/');
    const parsedMonth = Number.parseInt(splitted[1], 10);
    if (Number.isNaN(parsedMonth)) {
      splitted[1] = '';
    }

    return `${splitted[0]}/${splitted[1]}`;
  }
  if (value.length === 6) {
    if (value[5] === '/') {
      return value;
    }
    if (!Number.isNaN(Number(value[5]))) {
      return `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    return value.slice(0, 5);
  }
  const splitted = value.split('/');
  const parsedYear = Number.parseInt(splitted[2], 10);
  if (Number.isNaN(parsedYear)) {
    return `${splitted[0]}/${splitted[1]}/`;
  }

  return `${splitted[0]}/${splitted[1]}/${splitted[2]}`.slice(0, 10);
};

export default normalizeDate;
