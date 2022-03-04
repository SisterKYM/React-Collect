import {Field, getFormValues, reduxForm} from 'redux-form';
import {compact, uniqueId} from 'lodash';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment-timezone';

import {Button, Input, LabelledSwitch, Tooltip} from 'elements';
import FieldActionBarDelete from 'theme/images/FieldActionBar-Delete.svg';
import FieldActionBarDuplicate from 'theme/images/FieldActionBar-Duplicate.svg';

import CollectionObjectFieldChoiceList from './CollectionObjectFieldChoiceList';
import CollectionObjectFieldDateInputPreview from './CollectionObjectFieldDateInputPreview';
import CollectionObjectFieldTimeInputPreview from './CollectionObjectFieldTimeInputPreview';
import CollectionObjectFieldTypeSelect from './CollectionObjectFieldTypeSelect';
import CollectionObjectFieldVerticalSeparator from './CollectionObjectFieldVerticalSeparator';
import CollectionObjectfieldPhoneNumberPreview from './CollectionObjectfieldPhoneNumberPreview';

const VALUES_DELIMITER = '|||';

const valuesToChoices = values =>
  values.split(VALUES_DELIMITER).map(value => ({
    value,
    id: uniqueId(),
  }));
const choicesToValues = choices =>
  compact(choices.map(({value}) => value)).join(VALUES_DELIMITER);

class CollectionObjectFieldForm extends React.PureComponent {
  state = {
    choices: valuesToChoices(
      this.props.initialValues.values
        ? `${this.props.initialValues.values}${VALUES_DELIMITER}`
        : ''
    ),
  };

  handleChangeChoices = choices => {
    this.setState({choices});
  };

  handleRemove = () => {
    this.props.onRemove(this.props.fieldId);
  };

  handleDuplicate = () => {
    this.props.onDuplicate({
      field: this.props.formValues,
      values: choicesToValues(this.state.choices),
    });
  };

  handleOnSubmit = values => {
    this.props.onSubmit({
      ...values,
      metadata: {
        ...values.metadata,
        fieldTypeMetadata: {
          timeZone: moment.tz.guess(),
        },
      },
      values: choicesToValues(this.state.choices),
      id: this.props.fieldId,
    });
  };

  onSave = values => {
    if (
      !(
        this.props &&
        this.props.formValues &&
        (this.props.formValues.field_type === 'multiple_choice' ||
          this.props.formValues.field_type === 'checkbox') &&
        this.state.choices.filter(choice => Boolean(choice.value)).length === 0
      )
    ) {
      this.props.handleSubmit(this.handleOnSubmit)(values);
    }
  };

  render() {
    const {formValues = {}} = this.props;
    const {field_type: fieldType} = formValues;

    return (
      <div className="pa3 bg-lighter-gray br2 f6">
        <div className="flex flex-wrap mb3">
          <Field
            autoFocus
            border
            className="w-100 w-auto-l flex-auto-l mr3-l f6"
            borderRadius
            name="name"
            component={Input}
            placeholder="Enter a question"
          />
          <Field
            className="field-type-select w-100 w-auto-l mt2 mt0-l"
            name="field_type"
            component={CollectionObjectFieldTypeSelect}
            collectionObjectType={this.props.collectionObjectType}
          />
        </div>
        {formValues.metadata &&
          formValues.metadata.description &&
          formValues.metadata.description.enabled && (
            <Field
              border
              className="dn db-ns w-80 mb3"
              borderRadius={false}
              name="metadata.description.value"
              component={Input}
              placeholder="Question description"
            />
          )}
        {(fieldType === 'multiple_choice' || fieldType === 'checkbox') && (
          <CollectionObjectFieldChoiceList
            checkboxVisible={fieldType === 'checkbox'}
            choices={this.state.choices}
            onChange={this.handleChangeChoices}
          />
        )}
        {fieldType === 'date' && (
          <CollectionObjectFieldDateInputPreview className="w-third mv3" />
        )}
        {fieldType === 'time' && (
          <CollectionObjectFieldTimeInputPreview className="w-third mv3" />
        )}
        {fieldType === 'phone' && (
          <CollectionObjectfieldPhoneNumberPreview className="w-third mv3" />
        )}
        <hr />
        <div className="flex flex-wrap mt3 justify-between">
          <div className="w-100 w-auto-ns mt3 mt0-ns order-1 order-0-ns">
            <Button small type="button" onClick={this.onSave}>
              Save
            </Button>
          </div>
          <div className="flex dark-grey">
            <Field
              id="required-switch"
              label="Required"
              name="required"
              small
              component={LabelledSwitch}
            />
            <div className="dn flex-ns">
              <CollectionObjectFieldVerticalSeparator />
              <Field
                id="description-switch"
                label="Description"
                name="metadata.description.enabled"
                small
                component={LabelledSwitch}
              />
            </div>
            <CollectionObjectFieldVerticalSeparator />
            <div
              className="flex items-center pointer"
              onClick={this.handleDuplicate}
            >
              <Tooltip
                arrowPosition={50}
                style={{
                  width: 100,
                  left: -40,
                  bottom: 40,
                }}
                text="Duplicate"
              >
                <img
                  className="icon"
                  alt="Duplicate"
                  src={FieldActionBarDuplicate}
                />
              </Tooltip>
            </div>
            <CollectionObjectFieldVerticalSeparator />
            <div
              className="flex items-center pointer"
              onClick={this.handleRemove}
            >
              <Tooltip
                arrowPosition={50}
                style={{
                  width: 100,
                  left: -40,
                  bottom: 40,
                }}
                text="Delete"
              >
                <img className="icon" alt="Delete" src={FieldActionBarDelete} />
              </Tooltip>
            </div>
          </div>
        </div>
        <style jsx>{`
          .icon {
            width: 16px;
            height: 16px;
          }
          @media (min-width: 60em) {
            :global(.field-type-select) {
              min-width: 200px;
            }
          }
        `}</style>
      </div>
    );
  }
}

const FORM_NAME = 'CollectionObjectFieldForm';

const enhance = compose(
  reduxForm({
    enableReinitialize: true,
    initialValues: {
      name: '',
      field_type: 'text',
      required: false,
    },
    validate: values => ({
      name: !values.name ? 'Required' : undefined,
    }),
  }),
  connect((state, props) => ({
    formValues: getFormValues(props.form)(state),
  }))
);

const EnhancedCollectionObjectFieldForm = Object.assign(
  enhance(CollectionObjectFieldForm),
  {
    formName: FORM_NAME,
  }
);

export default EnhancedCollectionObjectFieldForm;
