import {connect} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {
  CREATE_PAYMENT_SHIPMENT,
  PURCHASE_SHIPPING_LABEL,
} from 'redux/modules/payments/constants';
import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {createPaymentShipment} from 'redux/modules/payments/actions';
import EasypostAddressHelpers from 'helpers/EasypostAddressHelpers';
import PrintShippingHelpers from 'helpers/PrintShippingHelpers';

import {
  AddressCheckModal,
  PrintShippingInfoForm,
  PrintShippingLabelPayForm,
  PrintShippingLabelShipAddressForm,
} from '../../components';

const OZ_IN_LBS = 16;

class PrintShippingLabelFormContainer extends React.PureComponent {
  state = {
    amountsVisible: false,
    calculateShippingCostLoading: false,
    shipToAddressChecking: false,
    shipFromAddressChecking: false,
    addressCheckModalAddresses: null,
  };

  calculatingShippingCost = false;

  componentDidUpdate(prevProps) {
    const prevValues = prevProps.formik.values;
    const nextValues = this.props.formik.values;
    const {initialValues} = this.props.formik;

    if (
      prevProps.createPaymentShippingStatus !== 'success' &&
      this.props.createPaymentShippingStatus === 'success'
    ) {
      this.setState({amountsVisible: true});
    } else if (
      this.state.amountsVisible &&
      !_.isEqual(nextValues, initialValues) &&
      !_.isEqual(prevValues, initialValues) &&
      (!_.isEqual(prevValues.shipment, nextValues.shipment) ||
        !_.isEqual(prevValues.shipTo, nextValues.shipTo) ||
        !_.isEqual(prevValues.shipFrom, nextValues.shipFrom))
    ) {
      this.setState({amountsVisible: false});
    }

    if (
      prevProps.purchaseShippingLabelStatus !== 'success' &&
      this.props.purchaseShippingLabelStatus === 'success'
    ) {
      this.props.onRedirectToPrintShippingLabelSummaryPage();
    }
  }

  getParcelWeight = () => {
    const {
      formik: {values},
    } = this.props;
    const needsWeights = PrintShippingHelpers.getNeedsParcelWeight({
      packageType: values.shipment.packageType,
      service: values.shipment.serviceType,
    });

    if (needsWeights.oz || needsWeights.lbs) {
      const weightOz = Number.parseInt(values.shipment.packageWeightOz, 10);
      const weightLbs = Number.parseInt(values.shipment.packageWeightLbs, 10);
      const weight =
        (Number.isNaN(weightOz) ? 0 : weightOz) +
        (Number.isNaN(weightLbs) ? 0 : weightLbs * OZ_IN_LBS);

      return {
        weight,
        weightOz,
        weightLbs,
      };
    }
    const {
      weight: maxWeight,
      unit: maxWeightUnit,
    } = PrintShippingHelpers.getParcelMaxWeightForService(
      values.shipment.serviceType
    );
    const weightOz = maxWeightUnit === 'oz' ? maxWeight : 0;
    const weightLbs = maxWeightUnit === 'lbs' ? maxWeight : 0;
    const weight = weightOz + weightLbs * OZ_IN_LBS;

    return {
      weight,
      weightOz,
      weightLbs,
    };
  };

  setFieldValueAsync = async (fieldKey, value) => {
    this.props.formik.setFieldValue(fieldKey, value);

    // Hack to wait for new value to be applied
    // Pending https://github.com/jaredpalmer/formik/issues/529
    await Promise.resolve();
  };

  createPaymentShipment = ({weight, shipToAddress, shipFromAddress}) => {
    const {
      formik: {values},
    } = this.props;

    this.props.onCreatePaymentShipment({
      collection: this.props.collectionId,
      payment: this.props.paymentId,
      to_address: shipToAddress,
      from_address: shipFromAddress,
      parcel: {
        weight,
        predefined_package: values.shipment.packageType,
      },
      options: {
        delivery_confirmation: values.shipment.signatureConfirmation
          ? 'SIGNATURE'
          : null,
      },
      tracking: values.shipment.tracking,
    });
  };

  createEasypostShipToAddress = async () => {
    const {paymentTabMember} = this.props;

    return EasypostAddressHelpers.createEasyPostAddress({
      collectionId: this.props.collectionId,
      paymentId: this.props.paymentId,
      payload: {
        phone: paymentTabMember ? paymentTabMember.phone : undefined,
        email: paymentTabMember ? paymentTabMember.email : undefined,
        ...this.props.formik.values.shipTo,
      },
    });
  };

  createEasypostShipFromAddress = async () =>
    EasypostAddressHelpers.createEasyPostAddress({
      collectionId: this.props.collectionId,
      paymentId: this.props.paymentId,
      payload: {
        email: this.props.userEmail,
        ...this.props.formik.values.shipFrom,
      },
    });

  validateWeightAndRates = () => {
    const {weight, weightOz} = this.getParcelWeight();
    const {
      formik: {values},
    } = this.props;

    if (!values.shipment) {
      return false;
    }
    if (!weight || weight <= 0) {
      this.props.onClearAlerts();
      this.props.onErrorAlert({
        title: 'Error',
        body: 'Weight is invalid',
      });

      return false;
    }
    if (values.shipment.serviceType === 'First' && weightOz > 15.99) {
      this.props.onClearAlerts();
      this.props.onErrorAlert({
        title: 'Error',
        body: 'Package is too heavy for First class mail',
      });

      return false;
    }

    return true;
  };

  handleCalculateShippingCost = async () => {
    const {weight} = this.getParcelWeight();
    const errors = await this.props.formik.validateForm();

    if (Object.keys(errors).length !== 0) {
      this.props.formik.setTouched(errors);
      this.handleCheckAddressError(
        'Address incomplete',
        errors.shipTo ? 'Ship To Address' : 'Ship From Address'
      );

      return;
    }
    if (!this.validateWeightAndRates()) {
      return;
    }

    this.calculatingShippingCost = true;
    this.setState({calculateShippingCostLoading: true});

    try {
      const shipToAddress = await this.handleCheckShipToAddress({
        alertsHidden: true,
      });
      if (shipToAddress) {
        const shipFromAddress = await this.handleCheckShipFromAddress({
          alertsHidden: true,
        });

        if (shipFromAddress) {
          this.createPaymentShipment({
            weight,
            shipToAddress,
            shipFromAddress,
          });
        }
      }
    } finally {
      this.calculatingShippingCost = false;
      this.setState({calculateShippingCostLoading: false});
    }
  };

  handleCheckAddressError = (error, source) => {
    this.props.onClearAlerts();
    this.props.onErrorAlert({
      title: `Error in ${source}`,
      body: error,
    });
  };

  handleCheckAddressSuccess = ({addresses, alertsHidden}) => {
    if (addresses.easypost.autocorrected) {
      this.setState({addressCheckModalAddresses: addresses});

      throw new Error('Address autocorrected');
    } else if (!alertsHidden) {
      this.props.onClearAlerts();
      this.props.onSuccessAlert({
        title: 'Success',
        body: 'Your address looks correct.',
      });
    }
  };

  handleCheckShipToAddress = async ({alertsHidden} = {alertsHidden: false}) => {
    try {
      this.setState({shipToAddressChecking: true});

      const address = await this.createEasypostShipToAddress();

      this.handleCheckAddressSuccess({
        addresses: {
          origin: this.props.formik.values.shipTo,
          easypost: address,
          mode: 'shipTo',
        },
        alertsHidden,
      });

      return address;
    } catch (err) {
      const {address: addressError, street2, ...formErrors} = err;

      if (addressError || street2) {
        this.handleCheckAddressError(
          addressError || street2,
          'Ship To Address'
        );
      } else if (Object.keys(formErrors).length !== 0 && !alertsHidden) {
        this.handleCheckAddressError('Address incomplete', 'Ship To Address');
      }

      this.props.formik.setFieldError('shipTo', formErrors);

      return undefined;
    } finally {
      this.setState({shipToAddressChecking: false});
    }
  };

  handleCheckShipFromAddress = async (
    {alertsHidden} = {alertsHidden: false}
  ) => {
    try {
      this.setState({shipFromAddressChecking: true});

      const address = await this.createEasypostShipFromAddress();

      this.handleCheckAddressSuccess({
        addresses: {
          origin: this.props.formik.values.shipFrom,
          easypost: address,
          mode: 'shipFrom',
        },
        alertsHidden,
      });

      return address;
    } catch (err) {
      const {address: addressError, street2, ...formErrors} = err;

      if (addressError || street2) {
        this.handleCheckAddressError(
          addressError || street2,
          'Ship From Address'
        );
      } else if (Object.keys(formErrors).length !== 0 && !alertsHidden) {
        this.handleCheckAddressError('Address incomplete', 'Ship From Address');
      }

      this.props.formik.setFieldError('shipFrom', formErrors);

      return undefined;
    } finally {
      this.setState({shipFromAddressChecking: false});
    }
  };

  handleUseEasypostShipFromAddress = async (easypostAddress) => {
    const address = EasypostAddressHelpers.getAddressFromEasypostAddress(
      easypostAddress
    );
    await this.setFieldValueAsync('shipFrom', address);
    this.setState({addressCheckModalAddresses: null});

    if (this.calculatingShippingCost) {
      this.handleCalculateShippingCost();
    }
  };

  handleUseEasypostShipToAddress = async (easypostAddress) => {
    const address = EasypostAddressHelpers.getAddressFromEasypostAddress(
      easypostAddress
    );
    await this.setFieldValueAsync('shipTo', address);
    this.setState({addressCheckModalAddresses: null});

    if (this.calculatingShippingCost) {
      this.handleCalculateShippingCost();
    }
  };

  handleDismissAddressCheckModal = () => {
    this.setState({addressCheckModalAddresses: null});
  };

  render() {
    const {selectedRate, formik} = this.props;
    const {addressCheckModalAddresses} = this.state;
    const signatureAmount = PrintShippingHelpers.getSignatureConfirmationAmountForService(
      selectedRate ? selectedRate.service : formik.values.shipment.serviceType
    );

    return (
      <>
        <div className="flex flex-wrap mb3 items-start">
          <div className="w-100 w-50-ns mb3 mb0-ns pr3-ns">
            <PrintShippingLabelShipAddressForm
              className="w-100"
              namePrefix="shipTo"
              title="Ship to"
              countries={[
                {
                  value: 'US',
                  children: 'United States',
                },
              ]}
              loading={this.state.shipToAddressChecking}
              values={formik.values}
              isSubmitting={formik.isSubmitting}
              onCheck={this.handleCheckShipToAddress}
            />
          </div>
          <PrintShippingLabelShipAddressForm
            className="w-100 w-50-ns"
            namePrefix="shipFrom"
            title="Ship from"
            countries={[
              {
                value: 'US',
                children: 'United States',
              },
            ]}
            loading={this.state.shipFromAddressChecking}
            values={formik.values}
            isSubmitting={formik.isSubmitting}
            onCheck={this.handleCheckShipFromAddress}
          />
        </div>
        <PrintShippingInfoForm
          className="mb3"
          signatureAmount={signatureAmount}
          {...formik}
        />
        <div className="flex justify-end">
          <PrintShippingLabelPayForm
            className="w-100 w-40-ns"
            formik={this.props.formik}
            amountsVisible={this.state.amountsVisible}
            amounts={{
              postage: selectedRate
                ? Number.parseFloat(selectedRate.rate) -
                  (formik.values.shipment.signatureConfirmation
                    ? signatureAmount
                    : 0)
                : 0,
              signature: formik.values.shipment.signatureConfirmation
                ? signatureAmount
                : null,
            }}
            creditCards={this.props.creditCards}
            calculateShippingCostDisabled={
              this.props.createPaymentShippingStatus === 'pending' ||
              this.state.calculateShippingCostLoading
            }
            calculateShippingCostLoading={
              this.props.createPaymentShippingStatus === 'pending' ||
              this.state.calculateShippingCostLoading
            }
            payLoading={
              this.props.purchaseShippingLabelStatus === 'pending' ||
              this.state.creditCardTokenCreating
            }
            onCalculateShippingCost={this.handleCalculateShippingCost}
          />
        </div>
        {addressCheckModalAddresses && (
          <AddressCheckModal
            easypostAddress={addressCheckModalAddresses.easypost}
            originAddress={addressCheckModalAddresses.origin}
            onUseEasypostAddress={
              addressCheckModalAddresses.mode === 'shipTo'
                ? this.handleUseEasypostShipToAddress
                : this.handleUseEasypostShipFromAddress
            }
            onDismiss={this.handleDismissAddressCheckModal}
          />
        )}
      </>
    );
  }
}

const enhance = connect(
  ({async, session, paymentAccounts: {paymentAccounts}}) => ({
    createPaymentShippingStatus: async.statuses[CREATE_PAYMENT_SHIPMENT],
    purchaseShippingLabelStatus: async.statuses[PURCHASE_SHIPPING_LABEL],
    userEmail: session.user ? session.user.email : null,
    shipFromAddress:
      session.user && session.user ? session.user.profile.returnAddress : null,
    creditCards: (paymentAccounts && paymentAccounts.cards) || [],
  }),
  (dispatch) => ({
    onCreatePaymentShipment: (payload) =>
      dispatch(createPaymentShipment(payload)),
    onClearAlerts: () => dispatch(clearAlerts()),
    onErrorAlert: (payload) => dispatch(errorAlert(payload)),
    onSuccessAlert: (payload) => dispatch(successAlert(payload)),
  })
);

const EnhancedPrintShippingLabelFormContainer = enhance(
  PrintShippingLabelFormContainer
);

export default EnhancedPrintShippingLabelFormContainer;
