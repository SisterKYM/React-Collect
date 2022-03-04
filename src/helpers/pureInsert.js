import {fill} from 'lodash';

const pureInsert = (arr, idx, element) => {
  const originArrHead = arr.slice(0, idx);
  const nextArrHead =
    originArrHead.length < idx
      ? [
          ...originArrHead,
          ...fill(new Array(idx - originArrHead.length), undefined),
        ]
      : originArrHead;

  return [...nextArrHead, element, ...arr.slice(idx + 1)];
};

export default pureInsert;
