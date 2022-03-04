import * as Yup from 'yup';
import {Form, Formik} from 'formik';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {injectStripe} from 'react-stripe-elements';
import React from 'react';
import _ from 'lodash';

import {
  GET_PAYMENT,
  GET_PAYMENT_SHIPMENT,
} from 'redux/modules/payments/constants';
import {GET_PAYMENT_ACCOUNTS} from 'redux/modules/paymentAccounts/constants';
import {StatefulView} from 'elements';
import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {
  getPayment,
  getPaymentShipment,
  purchaseShippingLabel,
} from 'redux/modules/payments/actions';
import {getPaymentAccounts} from 'redux/modules/paymentAccounts/actions';
import EasypostAddressHelpers from 'helpers/EasypostAddressHelpers';
import PrintShippingHelpers from 'helpers/PrintShippingHelpers';
import asyncConnect from 'helpers/asyncConnect';
import reduceLoadStatus from 'helpers/reduceLoadStatus';

import {PrintShippingLabelShipAddressForm} from '../../components';
import PrintShippingLabelFormContainer from './PrintShippingLabelFormContainer';

const INITIAL_SHIPMENT_VALUE = {
  serviceType: 'First',
  packageType: 'Parcel',
  tracking: true,
  signatureConfirmation: false,
  packageWeightOz: 0,
  packageWeightLbs: 0,
};

class PrintShippingLabelContainer extends React.PureComponent {
  getShipFromInitialValue = user => {
    const userReturnAddress = user.profile.returnAddress
      ? EasypostAddressHelpers.getAddressFromEasypostAddress(
          user.profile.returnAddress
        )
      : null;
    const initialAddress =
      !user.business_address || Object.keys(user.business_address).length === 0
        ? user.personal_address
        : user.business_address;

    return userReturnAddress
      ? {
          name: user.display_name,
          ...userReturnAddress,
          country: 'US',
        }
      : {
          name: user.display_name || '',
          street1: initialAddress.line1 || '',
          zip: initialAddress.postal_code || '',
          state: initialAddress.state || '',
          city: initialAddress.city || '',
          country: 'US',
        };
  };

  getStripeToken = async creditCard => {
    const res = await this.props.stripe.createToken({
      name: creditCard.name,
    });

    if (res.error) {
      this.props.onClearAlerts();
      this.props.onErrorAlert({
        title: 'Card incomplete',
        body: res.error.message,
      });
    }

    return res.token;
  };

  handleSubmit = async values => {
    const selectedRate = PrintShippingHelpers.getSelectedShipmentRate({
      rates: this.props.shipment.rates,
      service: values.shipment.serviceType,
    });

    if (!selectedRate) {
      return;
    }
    if (!values.savedCardId && !values.creditCard) {
      this.props.onClearAlerts();
      this.props.onErrorAlert({
        title: 'Error',
        body: 'Select payment method',
      });

      return;
    }

    let stripeToken = null;
    if (!values.savedCardId) {
      stripeToken = await this.getStripeToken(values.creditCard);
    }

    this.props.onPurchaseShippingLabel({
      collection: this.props.collectionId,
      payment: this.props.paymentId,
      selected_rate_id: selectedRate.id,
      savedCardId: values.savedCardId,
      stripeToken,
    });
  };

  renderForm = formik => {
    const {shipment} = this.props;
    const selectedRate =
      shipment && shipment.rates
        ? PrintShippingHelpers.getSelectedShipmentRate({
            rates: shipment.rates,
            service: formik.values.shipment.serviceType,
          })
        : null;

    return (
      <Form>
        <PrintShippingLabelFormContainer
          formik={formik}
          collectionId={this.props.collectionId}
          paymentId={this.props.paymentId}
          selectedRate={selectedRate}
          paymentTabMember={this.props.paymentTabMember}
          onRedirectToPrintShippingLabelSummaryPage={
            this.props.onRedirectToPrintShippingLabelSummaryPage
          }
        />
      </Form>
    );
  };

  render() {
    const {loadStatus, user} = this.props;

    return (
      <StatefulView
        resultCount={loadStatus === 'pending' ? 0 : 1}
        status={user ? loadStatus : 'pending'}
      >
        <Formik
          initialValues={{
            shipTo: this.props.initialShipToAddress,
            shipFrom: user ? this.getShipFromInitialValue(user) : null,
            shipment: INITIAL_SHIPMENT_VALUE,
          }}
          validationSchema={Yup.object().shape({
            shipTo: PrintShippingLabelShipAddressForm.validationSchema,
            shipFrom: PrintShippingLabelShipAddressForm.validationSchema,
          })}
          render={this.renderForm}
          onSubmit={this.handleSubmit}
        />
      </StatefulView>
    );
  }
}

const enhance = compose(
  injectStripe,
  asyncConnect(props => [
    {
      key: GET_PAYMENT,
      promise: getPayment,
      payload: {
        collection: props.collectionId,
        payment: props.paymentId,
      },
    },
    {
      key: GET_PAYMENT_SHIPMENT,
      promise: getPaymentShipment,
      payload: {
        collection: props.collectionId,
        payment: props.paymentId,
      },
    },
    {
      key: GET_PAYMENT_ACCOUNTS,
      promise: getPaymentAccounts,
    },
  ]),
  connect(
    ({async, session, payments: {payment, shipment}}) => {
      const paymentShipToAddress =
        payment &&
        payment.shipping_info &&
        payment.shipping_info.shipTo &&
        payment.shipping_info.shipTo.country === 'US'
          ? {
              ..._.omit(payment.shipping_info.shipTo, ['address']),
              street1: payment.shipping_info.shipTo.address,
            }
          : {
              country: 'US',
            };

      return {
        shipment,
        loadStatus: reduceLoadStatus([
          async.statuses[GET_PAYMENT],
          async.statuses[GET_PAYMENT_SHIPMENT],
        ]),
        paymentTabMember: payment ? payment.tab_member : null,
        initialShipToAddress: shipment
          ? EasypostAddressHelpers.getAddressFromEasypostAddress(
              shipment.shipTo
            )
          : paymentShipToAddress,
        user: session.user,
      };
    },
    dispatch => ({
      onPurchaseShippingLabel: payload =>
        dispatch(purchaseShippingLabel(payload)),
      onClearAlerts: () => dispatch(clearAlerts()),
      onErrorAlert: payload => dispatch(errorAlert(payload)),
    })
  )
);

const EnhancedPrintShippingLabelContainer = enhance(
  PrintShippingLabelContainer
);

export default EnhancedPrintShippingLabelContainer;
