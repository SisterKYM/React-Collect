import {SketchField, Tools} from 'react-sketch';
import React from 'react';
import cx from 'classnames';

import {ErrorMessage} from 'elements/Input';
import Touchable from 'elements/Touchable';

const CollectionObjectFieldSignatureInput = ({
  name,
  className,
  inputClassName,
  borderBrand,
  disabled,
  meta,
  input,
  value,
  onChange,
}) => {
  const sketchFieldRef = React.useRef(null);

  const [isEmpty, setIsEmpty] = React.useState(true);
  const [submittedDataUrl, setSubmittedDataUrl] = React.useState(null);

  const errorMessage = meta.error || meta.warning;
  const errorMessageVisible = errorMessage && meta.touched;

  React.useEffect(() => {
    const realValue = value || input.value;

    if (realValue) {
      sketchFieldRef.current.clear();
      sketchFieldRef.current.addImg(realValue, {
        left: 0,
        top: 0,
        scale: 1,
      });

      setIsEmpty(false);
      setSubmittedDataUrl(realValue);
    }
  }, [value, input.value]);

  return (
    <div className={cx('overflow-hidden', className)}>
      <div
        className={cx(
          'ba',
          errorMessageVisible || borderBrand ? 'b--brand' : 'b--gray-300',
          inputClassName
        )}
        style={{
          pointerEvents: submittedDataUrl ? 'none' : undefined,
        }}
      >
        <SketchField
          ref={sketchFieldRef}
          name={name}
          width={disabled ? '' : null}
          height={disabled ? 120 : 200}
          widthCorrection={0}
          undoSteps={0}
          tool={Tools.Pencil}
          onChange={() => {
            if (!sketchFieldRef.current) {
              return;
            }

            const canUndo = sketchFieldRef.current.canUndo();

            if (!canUndo !== isEmpty) {
              setIsEmpty(!canUndo);
            }
          }}
        />
      </div>
      {!disabled && (
        <div className="flex mt3">
          <div className="relative overflow-hidden">
            <ErrorMessage show={errorMessageVisible} message={errorMessage} />
          </div>
          {!submittedDataUrl && (
            <Touchable
              className="mr3 white bg-tint"
              size="MEDIUM"
              disabled={isEmpty}
              onClick={() => {
                const dataUrl = sketchFieldRef.current.toDataURL();

                setSubmittedDataUrl(dataUrl);

                if (onChange) {
                  onChange(dataUrl);
                } else {
                  input.onChange(dataUrl);
                }
              }}
            >
              Submit Signature
            </Touchable>
          )}
          <Touchable
            className="gray-600 bg-gray-300"
            size="MEDIUM"
            onClick={() => {
              sketchFieldRef.current.clear();

              setIsEmpty(true);
              setSubmittedDataUrl(null);

              if (onChange) {
                onChange(null);
              } else {
                input.onChange(null);
              }
            }}
          >
            {submittedDataUrl ? 'Reset' : 'Clear'}
          </Touchable>
        </div>
      )}
    </div>
  );
};

const EnhancedCollectionObjectFieldSignatureInput = Object.assign(
  React.memo(CollectionObjectFieldSignatureInput),
  {
    defaultProps: {
      meta: {},
      input: {},
    },
  }
);

export default EnhancedCollectionObjectFieldSignatureInput;
