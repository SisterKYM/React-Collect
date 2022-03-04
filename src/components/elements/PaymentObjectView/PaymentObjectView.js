import {Link} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import {CommonButton, Status} from 'elements';

import CollectionObjectFieldViewFields from './CollectionObjectFieldViewFields';

const ActionBarAnimaedWrapper = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

const PaymentObjectView = ({
  readOnly,
  loading,
  dirty,
  // tabMember,
  paymentObject,
  fields = [],
  printFieldViewsPath,
  onCancel,
}) => {
  const tabObject = paymentObject.tab_item || paymentObject.tab_form;

  return (
    <>
      <div className="pb3 mb3 f6 lh-copy avenir-roman bb b--gray-300">
        {Boolean(printFieldViewsPath) && (
          <p className="avenir-roman tint pointer">
            <Link to={printFieldViewsPath} target="_blank">
              Print Responses
            </Link>
          </p>
        )}
      </div>
      {paymentObject.detail.variant &&
        paymentObject.detail.variant.optionValues.length !== 0 && (
          <div className="pb3 mb3 f6 lh-copy avenir-light bb b--gray-300">
            {Object.entries(paymentObject.detail.variant.optionValues).map(
              variant => (
                <div className="mb1" key={variant[0]}>
                  <strong>{variant[0]}</strong>
                  <p>{variant[1]}</p>
                </div>
              )
            )}
          </div>
        )}
      {Boolean(tabObject.description) && (
        <div className="pb3 mb3 f6 lh-copy avenir-light bb b--gray-300">
          {tabObject.description}
        </div>
      )}
      <CollectionObjectFieldViewFields
        className="pb3"
        readOnly={readOnly}
        fields={fields}
        fieldViews={paymentObject.item_field_views || []}
      />
      <PoseGroup>
        {dirty && (
          <ActionBarAnimaedWrapper
            key="actionBar"
            className="sticky bottom-0 left-0 right-0 flex pa3 justify-end items-center bt b--gray-300 bg-gray-200"
          >
            {loading ? (
              <Status status="pending" />
            ) : (
              <>
                <CommonButton
                  className="pt-14 mr3 f6 avenir-roman bg-transparent gray-600 pointer"
                  onClick={onCancel}
                >
                  Cancel
                </CommonButton>
                <CommonButton
                  className="pt-14 f6 avenir-roman bg-tint white pointer"
                  type="submit"
                >
                  Save
                </CommonButton>
              </>
            )}
          </ActionBarAnimaedWrapper>
        )}
      </PoseGroup>
    </>
  );
};

const EnhancedPaymentObjectView = React.memo(PaymentObjectView);

export default EnhancedPaymentObjectView;
