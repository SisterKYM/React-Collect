import {FaUniversity} from 'react-icons/fa';
import {compose, pure, setDisplayName, setPropTypes} from 'recompose';
import React from 'react';

import {Status} from 'elements';
import {colors, scale} from 'theme/constants';

import {PROP_TYPES} from './config';

const enhance = compose(
  setDisplayName('views/user/components/Lists/ListItem'),
  setPropTypes(PROP_TYPES),
  pure
);

export default enhance(({item, deleteDisabled, onDelete, pending}) => (
  <li className="flex pa2 pr3 mt3 justify-between items-center bg-gray-200">
    <span className="image-wrapper mr2">
      {item.imgSrc ? (
        <img alt="" className="db mw-100" src={item.imgSrc} />
      ) : (
        <div className="flex justify-center items-center">
          <FaUniversity color={colors.darkGray} size={35} />
        </div>
      )}
    </span>
    <span className="cell-2">{item.name || item.nickname}</span>
    <span className="cell-3">*{item.last4}</span>
    <div className="cell-3 flex justify-end">
      {(() => {
        if (pending) {
          return <Status status="pending" />;
        }

        if (!deleteDisabled) {
          return (
            <span
              className="f6 fw7 tint pointer"
              onClick={() => onDelete(item)}
            >
              Delete
            </span>
          );
        }

        return null;
      })()}
    </div>
    <style jsx>{`
      .image-wrapper {
        height: ${scale[4] * 0.4}px;
        width: ${scale[4] * 0.4}px;
      }
      img {
        max-height: 100%;
      }
      .cell-2 {
        width: 42.6%;
      }
      .cell-3 {
        width: 19.6%;
      }
    `}</style>
  </li>
));
