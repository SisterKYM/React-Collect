import {IoMdClose} from 'react-icons/io';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {errorAlert} from 'redux/modules/growl/actions';
import {Button, Input, Select, Status, Tooltip} from 'elements';

import SwitchBlock from './SwitchBlock';

const calculationMethodOptions = [
  {
    children: 'Fixed amount off',
    value: 'fixed',
  },
  {
    children: 'Percentage off',
    value: 'percentage',
  },
];

const SaveCodeForm = ({
  // form,
  status,
  // reset,
  browser,
  close,
  initialValues,
  // handleSubmit,
  onSubmit,
  discountId,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    calculationMethod: 'fixed',
    code: initialValues?.code || '',
    amount: initialValues?.amount || '',
    codeTouched: false,
    amountTouched: false,
    validationMinimumPurchase: false,
  });

  const handleChange = (field) => (event) => {
    if (field === 'amount' && Number.isNaN(event.target.value)) {
      return;
    }
    if (
      field === 'amount' &&
      get(state, 'calculationMethod', 'fixed') === 'percentage' &&
      event.target.value > 100
    ) {
      setState({
        ...state,
        amount: 100,
      });
    } else if (
      field === 'calculationMethod' &&
      event.target.value === 'percentage' &&
      get(state, 'amount', 0) > 100
    ) {
      setState({
        ...state,
        amount: 100,
        [field]: event.target.value,
      });
    } else {
      setState({
        ...state,
        [field]: event.target.value,
        [`${field}Touched`]:
          Boolean(event.target.value) && state[`${field}Touched`],
      });
    }
  };
  const updateSwitch = (value) => {
    if (state.appliesTo !== '' && value.appliesTo === state.appliesTo) {
      return setState({
        ...state,
        appliesTo: '',
      });
    }

    return setState({
      ...state,
      ...value,
      validationMinimumPurchase:
        value.applitesTo !== 'total_order_with_minimum' || value.minimumPurchase
          ? false
          : state.validationMinimumPurchase,
    });
  };
  const method = get(state, 'calculationMethod', 'fixed');
  const isBig = get(browser, 'greaterThan.small', false);
  const isPending = status === 'pending';

  const onSave = (state) => {
    if (
      state.code &&
      state.amount &&
      (state.appliesTo !== 'total_order_with_minimum' || state.minimumPurchase)
    ) {
      const format = /[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}-]/;
      if (format.test(state.code)) {
        dispatch(
          errorAlert({
            body: 'Code cannot include special characters (%, &, ", #, etc.)',
            title: 'Error',
          })
        );

        return;
      }
      onSubmit(state, null, {discountId});
      close();
    } else {
      setState({
        ...state,
        codeTouched: true,
        amountTouched: true,
        validationMinimumPurchase: true,
      });
    }
  };

  return (
    <div
      className="relative pa3 pr4 ba b--gray-300 br2"
      style={{maxWidth: 580}}
    >
      <div className="close-wrapper absolute">
        <Tooltip
          arrowPosition="83%"
          style={{
            bottom: 30,
            right: 0,
          }}
          text="Close"
        >
          <IoMdClose className="pointer dark-grey" onClick={close} />
        </Tooltip>
      </div>
      <div className="flex flex-wrap items-center">
        <div className={isBig ? 'w-40 mr2 flex-auto' : 'w-100 flex-auto'}>
          <Input
            small
            border
            borderRadius={0}
            onChange={handleChange('code')}
            placeholder="Enter Code (e.g. AB123)"
            value={get(state, 'code', '')}
            meta={
              state.code
                ? {}
                : {warning: 'Required', touched: state.codeTouched}
            }
          />
        </div>
        <div className={isBig ? 'w-30 mh2 flex-auto' : 'w-100 mt3 flex-auto'}>
          <Select
            style={{fontSize: 14}}
            value={state.calculationMethod}
            options={calculationMethodOptions}
            onChange={handleChange('calculationMethod')}
            placeholder="Discount Method"
          />
        </div>
        {Boolean(method) && (
          <div className={isBig ? 'w-10 ml2 flex-auto' : 'w-100 mt3 flex-auto'}>
            <Input
              small
              border
              borderRadius={0}
              onChange={handleChange('amount')}
              value={get(state, 'amount', '')}
              className={
                method === 'fixed'
                  ? 'number-dollar-currency'
                  : 'number-percentage'
              }
              placeholder={!(state.amount && state.amountTouched) ? '' : '0'}
              input={{
                type: 'number',
              }}
              meta={
                state.amount
                  ? {}
                  : {warning: 'Required', touched: state.amountTouched}
              }
            />
          </div>
        )}
      </div>
      {Boolean(method) && (
        <div className="mt3">
          <SwitchBlock
            browser={browser}
            cutFrom={
              method === get(calculationMethodOptions[1], 'value', '') ? 0 : 1
            }
            selected={get(state, 'appliesTo')}
            updateSwitch={updateSwitch}
            minimumPurchase={state.minimumPurchase}
            validationMinimumPurchase={state.validationMinimumPurchase}
          />
        </div>
      )}
      <div className="flex mt3 items-center">
        <Button small disabled={isPending} onClick={() => onSave(state)}>
          Save Code
        </Button>
        {Boolean(isPending) && (
          <div className="ml2">
            <Status status="pending" />
          </div>
        )}
      </div>
      <style jsx global>{`
        .close-wrapper {
          top: 5px;
          right: 5px;
        }
      `}</style>
    </div>
  );
};
/*
const enhance = reduxForm({
  onChange: (values, dispatch, props) => {
    if (!values.calculationMethod) {
      dispatch(props.change('amount', ''));
      dispatch(props.change(radioName, ''));
    }
    if (
      !values.calculationMethod ||
      values.appliesTo !== 'total_order_with_minimum'
    ) {
      dispatch(props.change(minimumPurchase, ''));
    }
    if (values.calculationMethod === 'percentage' && values.amount > 100) {
      dispatch(props.change('amount', 100));
    }
  },
  validate: values => {
    const errors = {};

    if (!values.code) {
      errors.code = formErrors.REQUIRED;
    }
    if (!values.calculationMethod) {
      errors.calculationMethod = formErrors.REQUIRED;
    } else if (!values.amount) {
      errors.amount = formErrors.REQUIRED;
    } else if (!values.appliesTo) {
      errors.appliesTo = formErrors.ASTERIX;
    } else if (
      values.appliesTo === 'total_order_with_minimum' &&
      !values.minimumPurchase
    ) {
      errors.minimumPurchase = formErrors.REQUIRED;
    }

    return errors;
  },
});
*/

const EnhancedSaveCodeForm = Object.assign(SaveCodeForm, {
  propTypes: {
    browser: PropTypes.object,
    close: PropTypes.func,
    form: PropTypes.string,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
  },
});

export default EnhancedSaveCodeForm;
