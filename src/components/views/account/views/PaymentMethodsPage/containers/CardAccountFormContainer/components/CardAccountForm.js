import React, {useCallback, useEffect, useRef} from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

import {FormikInput, CommonButton} from 'elements';
import {CardElement} from 'elements/Stripe';

import {useStripe} from '../providers';

const initialValues = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const CardAccountForm = ({submitSucceeded, onSubmit, onCancel}) => {
  const cardCvcRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardNumberRef = useRef(null);

  useEffect(() => {
    if (
      submitSucceeded &&
      cardCvcRef.current &&
      cardExpiryRef.current &&
      cardNumberRef.current
    ) {
      cardCvcRef.current.clear();
      cardExpiryRef.current.clear();
      cardNumberRef.current.clear();
    }
  }, [submitSucceeded]);

  const handleCardNumberElementReady = useCallback((ref) => {
    cardNumberRef.current = ref;
  }, []);
  const handleCardExpiryElementReady = useCallback((ref) => {
    cardExpiryRef.current = ref;
  }, []);
  const handleCardCvcElementReady = useCallback((ref) => {
    cardCvcRef.current = ref;
  }, []);

  const stripe = useStripe();

  const handleSubmitForm = useCallback(
    async (values) => {
      const res = await stripe.createToken();
      await onSubmit(values, res);
    },
    [onSubmit, stripe]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({isSubmitting}) => (
        <Form>
          <div className="input-group">
            <label htmlFor="orgName" className="db mb1 text-14">
              Name on Card
            </label>
            <Field
              id="name"
              className="br2 mb3 text-16"
              name="name"
              border
              component={FormikInput}
            />
          </div>
          <div className="input-group">
            <div className="avenir-roman mb1 text-14">Card Number</div>
            <CardElement
              border
              className="mb3 br2"
              placeholder="Card Number"
              onReady={handleCardNumberElementReady}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex-fill mr3">
              <div className="input-group">
                <div className="avenir-roman mb1 text-14">Expiration Date</div>
                <CardElement
                  border
                  className="mb3 br2"
                  placeholder="MM/YY"
                  type="expiry"
                  onReady={handleCardExpiryElementReady}
                />
              </div>
            </div>
            <div className="flex-fill">
              <div className="input-group">
                <div className="avenir-roman mb1 text-14">Security Code</div>
                <CardElement
                  border
                  className="mb3 br2"
                  placeholder="CVC"
                  type="cvc"
                  onReady={handleCardCvcElementReady}
                />
              </div>
            </div>
          </div>
          <div className="flex mt3-5 items-center justify-between">
            <CommonButton
              className="bg-tint pt-16 white w-50"
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </CommonButton>
            <div className="text-16 tint pointer" onClick={onCancel}>
              Cancel
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EnhancedCardAccountForm = React.memo(CardAccountForm);

export default EnhancedCardAccountForm;
