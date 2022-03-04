import React from 'react';
import Select from 'react-select';

import {borderColor, borderWidth, colors, inputHeight} from 'theme/constants';
import CheckboxesIcon from 'theme/images/Checkboxes.svg';
import DateIcon from 'theme/images/Date.svg';
import ESignatureIcon from 'theme/images/eSignature.svg';
import MultipleChoiceIcon from 'theme/images/MultipleChoice.svg';
import OpenTextIcon from 'theme/images/OpenText.svg';
import PhoneNumberIcon from 'theme/images/PhoneNumber.svg';
import TimeIcon from 'theme/images/Time.svg';

import CollectionObjectFieldTypeSelectOption from './CollectionObjectFieldTypeSelectOption';
import CollectionObjectFieldTypeSelectSingleValue from './CollectionObjectFieldTypeSelectSingleValue';

const fieldTypeSelectOptions = [
  {
    icon: OpenTextIcon,
    label: 'Open Text',
    value: 'text',
  },
  {
    icon: MultipleChoiceIcon,
    label: 'Multiple Choice',
    value: 'multiple_choice',
  },
  {
    icon: CheckboxesIcon,
    label: 'Checkboxes',
    value: 'checkbox',
  },
  {
    icon: DateIcon,
    label: 'Date',
    value: 'date',
  },
  {
    icon: PhoneNumberIcon,
    label: 'Phone Number',
    value: 'phone',
  },
  {
    icon: TimeIcon,
    label: 'Time',
    value: 'time',
  },
  {
    icon: ESignatureIcon,
    label: 'eSignature',
    value: 'signature',
  },
];

const getOptionsForCollectionObjectType = (collectionObjectType) =>
  collectionObjectType === 'FORM'
    ? fieldTypeSelectOptions
    : fieldTypeSelectOptions.filter(({value}) => value !== 'signature');

class CollectionObjectFieldTypeSelect extends React.PureComponent {
  selectStyles = {
    container: (base) => ({
      ...base,
      zIndex: '8',
    }),
    control: (base) => ({
      ...base,
      height: inputHeight,
      borderColor,
      borderWidth,
      borderRadius: '0.25rem',
      boxShadow: 'none',
      '&:hover': {
        borderRadius: 0,
        borderColor,
        borderWidth,
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      width: 0,
    }),
    menu: (base) => ({
      ...base,
      borderColor,
      borderWidth,
      borderRadius: 0,
    }),
    input: (base) => ({
      ...base,
      boxShadow: 'none',
    }),
    option: (base) => ({
      ...base,
      height: inputHeight,
      display: 'flex',
      alignItems: 'center',
      color: colors.black,
      backgroundColor: colors.white,
      '&:hover': {
        backgroundColor: colors.lightGray,
      },
    }),
  };

  getValue = () =>
    this.props.value || this.props.input ? this.props.input.value : undefined;

  handleChange = ({value}) => {
    const onChange =
      this.props.onChange || this.props.input
        ? this.props.input.onChange
        : undefined;

    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const options = getOptionsForCollectionObjectType(
      this.props.collectionObjectType
    );
    const valueOption = options.find(
      (option) => option.value === this.getValue()
    );

    return (
      <Select
        styles={this.selectStyles}
        className={this.props.className}
        isSearchable={false}
        components={{
          Option: CollectionObjectFieldTypeSelectOption,
          SingleValue: CollectionObjectFieldTypeSelectSingleValue,
        }}
        options={options}
        value={valueOption}
        onChange={this.handleChange}
      />
    );
  }
}

export default CollectionObjectFieldTypeSelect;
