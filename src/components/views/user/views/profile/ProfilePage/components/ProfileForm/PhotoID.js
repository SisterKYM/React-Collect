import {FaTimesCircle} from 'react-icons/fa';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {FileInput} from 'elements';
import {ReactComponent as LittleCameraIcon} from 'theme/images/LittleCamera.svg';
import config from 'config';

const PhotoID = ({filePath, name, onDelete}) =>
  filePath ? (
    <div className="flex justify-center">
      <span className="relative">
        <img alt="ID" className="mw-100" src={filePath} />
        <FaTimesCircle
          className="close-icon absolute pointer"
          onClick={onDelete}
        />
      </span>
      <style jsx>{`
        :global(.close-icon) {
          top: 5px;
          right: 10px;
        }
      `}</style>
    </div>
  ) : (
    <Field
      name={name}
      className="w-100 bg-gray-300 br2 pointer"
      accept="image/jpeg,image/png,image/gif"
      component={FileInput}
    >
      <div className="flex pa2 items-center">
        <LittleCameraIcon className="dib h2" fill={config.colors.tint} />
        <span className="ml2">
          Upload Photo ID (e.g. Driver&#8217;s License)
        </span>
      </div>
    </Field>
  );

PhotoID.propTypes = {
  filePath: PropTypes.string,
  name: PropTypes.string,
  onDelete: PropTypes.func,
};

const EnhancedPhotoID = React.memo(PhotoID);

export default EnhancedPhotoID;
