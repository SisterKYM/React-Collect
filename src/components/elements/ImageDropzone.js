import {useDropzone} from 'react-dropzone';
import React from 'react';
import cx from 'classnames';

const MAX_IMAGE_SIZE = 20 * 1000 * 1000;

const ImageDropzone = ({
  className,
  disabled,
  children,
  onWillChange,
  onChange,
}) => {
  const handleDrop = React.useCallback(
    (acceptedFiles, _rejectFiles, event) => {
      const changeAllowed = !onWillChange || onWillChange();

      if (changeAllowed) {
        onChange(acceptedFiles[0], event);
      }
    },
    [onChange, onWillChange]
  );

  const handleClick = React.useCallback(
    event => {
      if (onWillChange && !onWillChange()) {
        event.preventDefault();
      }
    },
    [onWillChange]
  );

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    maxSize: MAX_IMAGE_SIZE,
    disabled,
    onDrop: handleDrop,
    onClick: handleClick,
  });

  return (
    <div
      {...getRootProps({
        className: cx(
          'flex flex-column flex-wrap justify-center items-center',
          className
        ),
      })}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

const EnhancedImageDropzone = React.memo(ImageDropzone);

export default EnhancedImageDropzone;
