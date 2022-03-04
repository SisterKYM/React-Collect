import React, {useState} from 'react';
import {IoMdClose} from 'react-icons/io';
import {get} from 'lodash';
import cx from 'classnames';

import {Button, Input, SelectGrouped} from 'elements';
import PropTypes from 'prop-types';

const TaxForm = ({
  browser,
  onDismiss,
  initialValues,
  optionsCategorized,
  optionsNoCategorized,
  onSubmit,
}) => {
  const isLessSmall = get(browser, 'lessThan.small', false);
  const isGreaterSmall = get(browser, 'greaterThan.small', false);
  const isSmall = get(browser, 'is.small', false);
  const textCx = cx(
    isLessSmall && 'w-100 mt3',
    isSmall && 'ml2',
    isGreaterSmall && ''
  );

  const [state, setState] = useState({
    amount: initialValues.amount || '',
    apply: initialValues.apply || 'None',
    name: initialValues.name || '',
    amountTouched: false,
    nameTouched: false,
  });

  const handleChange = field => event => {
    if (field === 'apply') {
      return setState({
        ...state,
        [field]: event,
      });
    }

    return setState({
      ...state,
      [field]: event.target.value,
      [`${field}Touched`]:
        Boolean(event.target.value) && state[`${field}Touched`],
    });
  };

  const handleSubmit = () => {
    if (state.name && state.amount) {
      onSubmit(state);
    } else {
      setState({
        ...state,
        amountTouched: true,
        nameTouched: true,
      });
    }
  };

  return (
    <>
      <div className="tax-form-wrapper relative flex flex-wrap ba b--gray-300 br2 justify-between">
        <IoMdClose
          className="edit-close-icon absolute pointer dark-grey"
          onClick={onDismiss}
        />
        <div
          className={
            !isLessSmall ? 'flex flex-column justify-between w-100' : 'w-100'
          }
        >
          <div className={cx(isGreaterSmall && 'flex justify-between')}>
            <div className={cx(textCx, isGreaterSmall ? 'w-75 ma0' : 'w-100')}>
              <Input
                small
                border
                borderRadius={4}
                value={state.name}
                onChange={handleChange('name')}
                meta={
                  state.name
                    ? {}
                    : {warning: 'Required', touched: state.nameTouched}
                }
                placeholder="Name"
              />
            </div>
            <div className={cx(textCx, isGreaterSmall ? 'w-25 ml2' : 'w-100')}>
              <Input
                small
                border
                borderRadius={4}
                value={state.amount}
                onChange={handleChange('amount')}
                meta={
                  state.amount
                    ? {}
                    : {warning: 'Required', touched: state.amountTouched}
                }
                placeholder="0"
                className="number-percentage"
              />
            </div>
          </div>
          <div className={cx(textCx, isGreaterSmall && 'w-100')}>
            <SelectGrouped
              small
              border
              borderRadius
              input={{
                name: 'tax_apply',
                value: state.apply,
                onChange: handleChange('apply'),
              }}
              meta={{error: {}}}
              optionsCategorized={optionsCategorized}
              optionsNoCategorized={optionsNoCategorized}
              placeholder="Apply tax to items"
            />
          </div>
        </div>
      </div>
      <div className="mt3">
        <Button small className="w4 mr2" onClick={handleSubmit}>
          Save Tax
        </Button>
      </div>
      <style jsx>{`
        .tax-form-wrapper {
          max-width: 554px;
          min-height: 135px;
          padding: 24px 39px 23px 24px;
        }
        .tax-form-wrapper :global(.number-percentage) {
          padding-left: 14px;
        }
        :global(.edit-close-icon) {
          right: 5px;
          top: 5px;
        }
      `}</style>
    </>
  );
};

const EnhancedTaxForm = Object.assign(React.memo(TaxForm), {
  propTypes: {
    initialValues: PropTypes.object,
    browser: PropTypes.object.isRequired,
    optionsCategorized: PropTypes.array.isRequired,
    optionsNoCategorized: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  },
  defaultProps: {
    initialValues: {
      amount: null,
      apply: 'All',
      name: '',
    },
  },
});

export default EnhancedTaxForm;
