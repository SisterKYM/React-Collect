import {useDispatch} from 'react-redux';
import {Field} from 'redux-form';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import React from 'react';

import {
  BankAccountFormSection,
  BankAccountSelectRow,
  BigCheckbox,
  CommonButton,
  CreditCardFormSection,
  CreditCardSelectRow,
  Status,
} from 'elements';
import SubscriptionUtils from 'helpers/SubscriptionUtils';
import {readApiError} from 'helpers/apiResponseHelpers';
import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {currency} from 'helpers/numbers';
import usePrevious from 'hooks/usePrevious';

import CheckoutDiscountCode from './CheckoutDiscountCode';

const renderCreditCardSelectRow = (creditCard) => (
  <CreditCardSelectRow
    key={creditCard.id}
    className="mb3"
    creditCard={creditCard}
    selectControl={
      <Field
        name="creditCardId"
        type="radio"
        value={creditCard.id}
        component={BigCheckbox}
      />
    }
  />
);

const renderBankAccountSelectRow = (bankAccount) => (
  <BankAccountSelectRow
    key={bankAccount.id}
    bankAccount={bankAccount}
    selectControl={
      <Field
        type="radio"
        name="bankAccountId"
        value={bankAccount.id}
        component={BigCheckbox}
      />
    }
  />
);

const renderNewMethodField = ({input, onLabel, offLabel}) => {
  const handleClick = () => {
    input.onChange(!input.value);
  };

  return (
    <div className="mb3 f7 tint pointer" onClick={handleClick}>
      {input.value ? onLabel : offLabel}
    </div>
  );
};

const PaymentMethodFormSection = ({
  className,
  loading,
  method,
  newMethod,
  creditCards,
  bankAccounts,
  plan,
}) => {
  const dispatch = useDispatch();

  const [discountData, setDiscountData] = React.useState({
    planCost: 0,
    discount: 0,
    total: 0,
    description: '',
  });
  const location = useLocation();
  const queryParams = React.useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);
  const [coupon, setCoupon] = React.useState('');
  const [queryCouponApplied, setQueryCouponApplied] = React.useState(false);
  const previousPlan = usePrevious(plan);
  const [discountLoading, setDiscountLoading] = React.useState(false);
  const [applied, setApplied] = React.useState('');
  React.useEffect(() => {
    if (
      queryParams?.code &&
      (queryParams?.validPlans || []).includes(plan.value)
    ) {
      setCoupon(queryParams?.code);
    }
    if (
      queryParams?.code &&
      coupon === queryParams?.code &&
      !queryCouponApplied
    ) {
      handleApply();
      setQueryCouponApplied(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, coupon, plan.value, queryCouponApplied]);
  const onChangeValue = React.useCallback(
    (value) => {
      setCoupon(value.code);
      setApplied(false);
    },
    [setCoupon, setApplied]
  );
  React.useEffect(() => {
    if (
      plan?.value &&
      previousPlan?.value &&
      plan.value !== previousPlan.value
    ) {
      onChangeValue({code: ''});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, previousPlan]);
  const handleApply = React.useCallback(async () => {
    try {
      setDiscountLoading(true);
      const {data} = await SubscriptionUtils.validatePromoCode({
        plan: plan.value,
        coupon,
      });
      setDiscountData(data);
      setApplied(true);
    } catch (error) {
      dispatch(clearAlerts());
      const errorMessage = readApiError(error, {
        invalid_promo: `Promo code is invalid. Please try re-entering the code.`,
      });
      dispatch(
        errorAlert({
          title: 'Sorry!',
          body: errorMessage,
        })
      );
    } finally {
      setDiscountLoading(false);
    }
  }, [plan, coupon, dispatch]);

  return (
    <div className={className}>
      <div className="flex flex-wrap">
        <div className="w-100 w-50-ns pa2 gray-600">
          <div className="mb4 text-18 avenir-roman">Payment Method</div>
          <Field
            className="mb3"
            type="radio"
            name="method"
            label="Credit Card"
            value="card"
            labelClassName="text-16"
            size={22}
            component={BigCheckbox}
          />
          <Field
            className="mb3"
            type="radio"
            name="method"
            label="eCheck"
            value="echeck"
            labelClassName="text-16"
            size={22}
            component={BigCheckbox}
          />
          <div
            className="text-14 avenir-light gray-600"
            style={{maxWidth: '165px'}}
          >
            Your payment method will be saved and your subscription will auto
            renew at the end of the term. Cancel anytime from Account Settings.
          </div>
        </div>
        <div className="w-100 w-50-ns pa2 gray-600">
          {method === 'card' ? (
            <>
              {newMethod ? (
                <CreditCardFormSection nameFieldHidden zipFieldHidden />
              ) : (
                creditCards.map((x) => renderCreditCardSelectRow(x))
              )}
              {creditCards.length !== 0 && (
                <Field
                  name="newMethod"
                  component={renderNewMethodField}
                  onLabel="Use Saved Card"
                  offLabel="Use New Card"
                />
              )}
            </>
          ) : (
            <>
              {bankAccounts.length === 0 || newMethod ? (
                <BankAccountFormSection />
              ) : (
                bankAccounts.map((x) => renderBankAccountSelectRow(x))
              )}
              {bankAccounts.length !== 0 && (
                <Field
                  name="newMethod"
                  component={renderNewMethodField}
                  onLabel="Use Saved Account"
                  offLabel="Use New Account"
                />
              )}
            </>
          )}
          <div className="promo-code-wrapper b--gray-300 mb3">
            <CheckoutDiscountCode
              loading={discountLoading}
              applied={applied}
              value={{code: coupon}}
              onApply={handleApply}
              onReset={onChangeValue}
              plan={plan.value}
              onChangeValue={onChangeValue}
            />
            {applied && (
              <div className="mb3">
                <div className="flex justify-between text-16">
                  <div className="avenir-roman gray-700">{coupon}</div>
                  <div className="avenir-light gray-600">
                    -{currency(discountData.discount)}
                  </div>
                </div>
                <div className="avenir-light-oblique text-14">
                  {discountData.description}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between avenir-roman gray-600 mb3 text-16">
            <div>Total:</div>
            <div className="avenir-heavy">
              {currency(!applied ? plan.price : discountData.total)}
            </div>
          </div>
          {loading ? (
            <Status status="pending" />
          ) : (
            <CommonButton className="pt-16 avenir-roman w-100 bg-brand white">
              Pay Now
            </CommonButton>
          )}
        </div>
      </div>
      <style jsx>{`
        .promo-code-wrapper {
          border-bottom-width: 1px;
          border-bottom-style: solid;
        }
      `}</style>
    </div>
  );
};

const EnhancedPaymentMethodFormSection = React.memo(PaymentMethodFormSection);

export default EnhancedPaymentMethodFormSection;
