import {useDropzone} from 'react-dropzone';
import cx from 'classnames';
import React from 'react';

const NewFileInput = ({
  className,
  style = {},
  errorStyle,
  meta = {},
  input,
  error,
  maxSize,
  accept,
  onChange,
  onDropRejected,
  children,
  ...props
}) => {
  const handleDrop = React.useCallback(
    files => {
      if (input) {
        input.onChange(files[0]);
      } else if (onChange) {
        onChange(files[0]);
      }
    },
    [input, onChange]
  );

  const {getRootProps, getInputProps} = useDropzone({
    maxSize,
    accept,
    onDrop: handleDrop,
    onDropRejected,
  });

  return (
    <div
      {...getRootProps({
        className: cx(meta.error && meta.touched && 'ba b--brand', className),
        style: {
          ...style,
        },
        ...props,
      })}
    >
      <input {...getInputProps()} />
      <div className="relative w-100">
        {children}
        {meta.touched && meta.error && (
          <span
            className="absolute top-0 right-0 bottom-0 flex mr2 items-center f6 brand"
            style={errorStyle}
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

const EnhancedFileInput = React.memo(NewFileInput);

export default EnhancedFileInput;
