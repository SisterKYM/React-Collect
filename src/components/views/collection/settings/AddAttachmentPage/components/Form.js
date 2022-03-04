import {Field, reduxForm} from 'redux-form';
import {compose, withHandlers, withState} from 'recompose';
import {get} from 'lodash';
import React from 'react';

import {Button, NewFileInput} from 'elements';

const enhance = compose(
  withState('fileName', 'setFileName'),
  reduxForm({
    form: 'AddAttachmentForm',
  }),
  withHandlers({
    onChangeFile: props => (ev, file) => {
      const fileName = get(file, 'name', '');
      props.setFileName(fileName);
    },
  })
);

export default enhance(
  ({fileName, handleSubmit, onChangeFile, onSubmit, onDismiss}) => (
    <form onSubmit={handleSubmit(onSubmit)} className="add-attachment-wrapper">
      <Field
        component={NewFileInput}
        onChange={onChangeFile}
        name="file"
        style={{outline: 'none'}}
      >
        <div className="field-padding gray-600">
          <div>
            <p className="avenir-roman add-attachment">Add Attachment</p>
            {fileName && (
              <p className="avenir-light attachment-name pb2">{fileName}</p>
            )}
            {!fileName && (
              <div className="attachment-form-btns">
                <Button small heightSet type="button" className="pv2 ph4">
                  <span className="avenir-roman">Browse for File</span>
                </Button>
                <Button
                  small
                  heightSet
                  backgroundColorSet
                  type="button"
                  className="pv2 ph3 ml3 bg-light-gray"
                  onClick={e => {
                    e.stopPropagation();
                    onDismiss();
                  }}
                >
                  <span className="avenir-roman dark-grey">Cancel</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Field>
      {Boolean(fileName) && (
        <div className="attachment-form-btns">
          <Button small heightSet type="submit" className="pv2 ph3">
            <span className="avenir-roman">Add</span>
          </Button>
          <Button
            small
            heightSet
            backgroundColorSet
            type="button"
            className="pv2 ph3 ml3 bg-light-gray"
            onClick={() => onChangeFile(null, {})}
          >
            <span className="avenir-roman dark-grey">Cancel</span>
          </Button>
        </div>
      )}
      <style jsx>{`
        .add-attachment-wrapper {
          padding: 26px 0 36px 31px;
        }
        .add-attachment {
          font-size: 18px;
          line-height: 25px;
          padding-bottom: 10px;
          color: #414142;
        }
        .attachment-name {
          font-size: 14px;
          line-height: 18px;
        }
        .attachment-form-btns {
          margin-top: 11px;
        }
        :global(.attachment-form-btns button span) {
          font-size: 14px;
          font-weight: 100;
          line-height: 20px;
        }
      `}</style>
    </form>
  )
);
