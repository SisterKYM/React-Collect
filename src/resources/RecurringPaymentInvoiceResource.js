import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class RecurringPaymentInvoiceResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/recurring_payment_invoices');

  static getKey() {
    return 'RecurringPaymentInvoiceResource';
  }

  static retryShape() {
    return {
      ...super.updateShape(),
      getFetchKey: (params) =>
        `/users/recurring_payment_invoices/${params.invoiceId}/retry`,
      fetch: (params) =>
        this.fetch(
          'post',
          `/users/recurring_payment_invoices/${params.invoiceId}/retry`,
          {}
        ),
    };
  }
}

export default RecurringPaymentInvoiceResource;
