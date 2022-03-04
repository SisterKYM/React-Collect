import React, {useCallback, useState} from 'react';

import {CollectionsLayout, CollectionsMobileLayout} from 'layout';

import {
  PaymentsList,
  PaymentsListActions,
  PaymentsListHeader,
} from './components';

const PaymentsPage = () => {
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortOption, setSortOption] = useState({});
  const updateSortOption = useCallback((newSortOption) => {
    setSortOption((prevSortOption) => {
      if (newSortOption.value === prevSortOption.value) {
        setSortDirection((prevSortDirection) =>
          prevSortDirection === 'asc' ? 'desc' : 'asc'
        );

        return prevSortOption;
      }

      return newSortOption;
    });
  }, []);

  const [input, setInput] = useState('');
  const onInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);
  const clearInput = useCallback(() => {
    setInput('');
  }, []);

  return (
    <>
      <div className="dn db-ns">
        <CollectionsLayout>
          <h1 className="title avenir-roman dark-grey">Payment History</h1>
          <div className="flex-fill horizontal-flex">
            <div className="flex-fill vertical-flex">
              <div className="payments">
                <div className="payments-list-actions">
                  <PaymentsListActions
                    sortOption={sortOption}
                    updateSortOption={updateSortOption}
                    input={input}
                    onInputChange={onInputChange}
                    clearInput={clearInput}
                  />
                </div>
                <div className="payments-list-header text-12 avenir-roman dark-grey">
                  <PaymentsListHeader />
                </div>
                <div className="payments-list text-12 avenir-roman dark-grey">
                  <PaymentsList
                    sortOption={sortOption}
                    sortDirection={sortDirection}
                    input={input}
                  />
                </div>
              </div>
            </div>
            <div className="right-side" />
          </div>
        </CollectionsLayout>
      </div>
      <div className="dn-ns">
        <CollectionsMobileLayout>
          <h1 className="title avenir-roman dark-grey ph4 pt4">
            Payment History
          </h1>
          <div className="mh4 overflow-auto">
            <div className="payments">
              <div className="payments-list-actions">
                <PaymentsListActions
                  sortOption={sortOption}
                  updateSortOption={updateSortOption}
                  input={input}
                  onInputChange={onInputChange}
                  clearInput={clearInput}
                />
              </div>
              <div className="payments-list-header text-12 avenir-roman dark-grey">
                <PaymentsListHeader />
              </div>
              <div className="payments-list text-12 avenir-roman dark-grey">
                <PaymentsList
                  sortOption={sortOption}
                  sortDirection={sortDirection}
                  input={input}
                />
              </div>
            </div>
          </div>
        </CollectionsMobileLayout>
      </div>
      <style jsx>{`
        .payments {
          min-width: 600px;
          border: 1px solid #eaedf3;
          background-color: white;
        }
        .payments-list-header,
        .payments-list-actions {
          border-bottom: 1px solid #eaedf3;
        }
        .payments-list-actions {
          padding: 25px 24px 15px;
        }
        .payments-list-header {
          padding: 7px 15px 9px 35px;
        }
        .right-side {
          width: 20rem;
          margin-left: 1.5rem;
        }
      `}</style>
    </>
  );
};

const EnhancedPaymentsPage = React.memo(PaymentsPage);

export default EnhancedPaymentsPage;
