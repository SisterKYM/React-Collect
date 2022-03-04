import {Field} from 'redux-form';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';

import {CommonButton} from 'elements';

const ItemVariantsFormSectionUpgrade = () => {
  const history = useHistory();

  const formValues = useSelector(state =>
    state.form.ItemDetailsForm ? state.form.ItemDetailsForm.values : {}
  );

  return (
    <>
      <div className="measure mt2 f-small lh-copy avenir-roman gray-600">
        Upgrade to our <span className="avenir-heavy tint">PRO Plan</span> to
        add variants (e.g. sizing) and to drive sales with discount codes and
        built-in shipping.
      </div>
      <div className="flex mt4 items-center">
        <CommonButton
          className="pt-14 bg-tint white mr3"
          type="button"
          onClick={() => {
            history.push(`/user/billing/i/plans`, {
              formValues,
            });
          }}
        >
          Upgrade to PRO
        </CommonButton>
        <Field
          name="options.variants.enabled"
          component={field => (
            <CommonButton
              className="pt-14 gray-600 bg-gray-200"
              name="options.variants.enabled"
              type="button"
              onClick={() => {
                field.input.onChange(false);
              }}
            >
              Not now
            </CommonButton>
          )}
          type="button"
        >
          Not now
        </Field>
      </div>
    </>
  );
};

const EnhancedItemVariantsFormSectionUpgrade = React.memo(
  ItemVariantsFormSectionUpgrade
);

export default EnhancedItemVariantsFormSectionUpgrade;
