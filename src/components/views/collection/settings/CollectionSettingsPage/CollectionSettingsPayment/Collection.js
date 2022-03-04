import React, {useCallback, useState} from 'react';
import {useFetcher} from 'rest-hooks';

import {Input} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsCollection = ({collection}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    displayTotalCollected: collection.display_total_collected || false,
    displayCollectingGoal: collection.options?.paymentGoal?.enabled || false,
    goalAmount: collection.options?.paymentGoal?.value || '',
    goalAmountTouched: false,
    displayMemberList: collection.display_member_list || false,
  });
  const handleChange = useCallback(
    (field) => (value) => {
      if (field === 'goalAmount') {
        const goalAmount = Number(value.target.value);
        updateCollection(
          {id: collection.id},
          {
            options: {
              paymentGoal: {
                enabled: true,
                value: goalAmount,
              },
            },
          }
        );
        setState({
          ...state,
          [field]: value.target.value,
        });
      } else {
        setState({
          ...state,
          [field]: value,
          ...(field === 'displayCollectingGoal' && value
            ? {
                displayTotalCollected: true,
              }
            : {}),
        });
      }
    },
    [collection.id, state, updateCollection]
  );

  const handleBlur = useCallback(
    (field) => () => {
      setState({
        ...state,
        [`${field}Touched`]: true,
      });
    },
    [state]
  );

  const handleToggle = (event) => {
    const field = Object.keys(event)[0];
    if (field === 'displayCollectingGoal') {
      updateCollection(
        {id: collection.id},
        {
          options: {
            paymentGoal: {
              enabled: event[field],
            },
          },
        }
      );
    } else {
      updateCollection({id: collection.id}, event);
    }
  };

  return (
    <>
      <SwitchExpandField
        collection={collection}
        label="Make total collected public"
        id="collection-settings-collection-total"
        input={{
          name: 'display_total_collected',
          value: state.displayTotalCollected || state.displayCollectingGoal,
          onChange: handleChange('displayTotalCollected'),
        }}
        body={
          <div className="mt3 mb1 text-14 dark-grey">
            The total collected to date will be shown on your collection page
          </div>
        }
        onToggle={handleToggle}
      />
      <SwitchExpandField
        collection={collection}
        label="Set a collecting or fundraising goal"
        id="collection-settings-collection-goal"
        input={{
          name: 'displayCollectingGoal',
          value: state.displayCollectingGoal,
          onChange: handleChange('displayCollectingGoal'),
        }}
        body={
          <div className="mt3 mb1 text-14 dark-grey">
            Encourage current and potential donors with a progress bar on your
            collection page.
            <div className="goal-amount-input w-third-l flex-l flex-column mt3">
              <div className="avenir-roman text-12 dark-grey">Goal Amount</div>
              <Input
                border
                className="mr2-l mv2 text-14 number-dollar-currency"
                style={{height: 36}}
                placeholder="0"
                type="number"
                value={state.goalAmount}
                onBlur={handleBlur('goalAmount')}
                onChange={handleChange('goalAmount')}
                meta={
                  state.goalAmount
                    ? {}
                    : {warning: 'Required', touched: state.costTouched}
                }
              />
            </div>
            <style jsx>{`
              .goal-amount-input {
                max-width: 200px;
              }
            `}</style>
          </div>
        }
        onToggle={handleToggle}
      />
      <SwitchExpandField
        collection={collection}
        label="Make list of payers public (names only)"
        id="collection-settings-collection-list"
        input={{
          name: 'display_member_list',
          value: state.displayMemberList,
          onChange: handleChange('displayMemberList'),
        }}
        body={
          <div className="mt3 mb1 text-14 dark-grey">
            The first and last names of payers will be shown—no amounts or
            emails will be visible.
          </div>
        }
        onToggle={handleToggle}
      />
    </>
  );
};

export default CollectionSettingsCollection;
