import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {GET_PAYMENTS, UPDATE_PAYMENT} from 'redux/modules/payments/constants';
import {Status} from 'elements';
import {updatePayment} from 'redux/modules/payments/actions';

import {CollectionPaymentRow, NoPayments} from '../components';

class CollectionPaymentListContainer extends React.PureComponent {
  handleAddNote = (data) => {
    this.props.updatePayment({
      note: data.note,
      collection: this.props.collection.id,
      payment: data.payment,
    });
  };

  handlePaymentStatusChange = (data) => {
    this.props.updatePayment({
      collection: this.props.collection.id,
      payment: data.payment,
      status: data.status,
    });
  };

  renderPayment = (payment) => {
    const handleClickPaymentSummary = () => {
      this.props.onClickPaymentSummary(payment);
    };
    const handleClickRefunds = () => {
      this.props.onClickRefunds(payment);
    };
    const handleClickPrintOrder = () => {
      this.props.onClickPrintOrder(payment);
    };

    return (
      <CollectionPaymentRow
        key={payment.id}
        browser={this.props.browser}
        userBasic={this.props.userBasic}
        payment={payment}
        onAddNote={this.handleAddNote}
        updatePaymentStatus={this.props.updatePaymentStatus}
        onStatusChange={this.handlePaymentStatusChange}
        onClickPaymentSummary={handleClickPaymentSummary}
        onClickRefunds={handleClickRefunds}
        onClickPrintOrder={handleClickPrintOrder}
        onClickPrintShippingLabel={this.props.onClickPrintShippingLabel}
        onClickShippingSummary={this.props.onClickShippingSummary}
      />
    );
  };

  render() {
    const {getPaymentsStatus} = this.props;

    if (!getPaymentsStatus || getPaymentsStatus !== 'success') {
      return (
        <div className="flex w-100 pa5 justify-center">
          <Status
            status={getPaymentsStatus || 'pending'}
            messages={{
              failure: 'Cannot load payments, please try again.',
            }}
          />
        </div>
      );
    }

    if (this.props.noResult) {
      return <NoPayments collection={this.props.collection} />;
    }

    return this.props.payments.map(this.renderPayment);
  }
}

const enhance = compose(
  connect(
    (state) => ({
      browser: state?.browser,
      userBasic:
        !state?.session ||
        (!state.session.isTeamUser && !state.session.isProUser),
      updatePaymentStatus: state?.async?.statuses[UPDATE_PAYMENT],
      getPaymentsStatus: state?.payments?.payments?.length
        ? 'success'
        : state?.async?.statuses[GET_PAYMENTS],
    }),
    {
      updatePayment,
    }
  )
);

const EnhancedCollectionPaymentListContainer = enhance(
  CollectionPaymentListContainer
);

export default EnhancedCollectionPaymentListContainer;
