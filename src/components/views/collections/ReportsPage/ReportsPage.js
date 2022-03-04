import React, {useState, useCallback} from 'react';

import {apiClient} from 'helpers';
import {CollectionsLayout, CollectionsMobileLayout} from 'layout';

import {
  GenerateReportModal,
  CollectionReportCard,
  AccountReportCard,
} from './components';

const ReportsPage = () => {
  const downloadAccountWideReport = useCallback(() => {
    apiClient
      .fetchAndSave({
        url: `users/exports/account.xlsx`,
        fileName: `account.xlsx`,
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [searchModalVisible, setGenerateReportModalVisible] = useState(false);
  const hideGenerateReportModal = useCallback(() => {
    setGenerateReportModalVisible(false);
  }, []);
  const showGenerateReportModal = useCallback(() => {
    setGenerateReportModalVisible(true);
  }, []);

  return (
    <>
      <div className="dn db-ns">
        <CollectionsLayout>
          <h1 className="title avenir-roman dark-grey">Reports</h1>
          <div className="flex-fill horizontal-flex">
            <div className="flex-fill vertical-flex">
              <CollectionReportCard
                showGenerateReportModal={showGenerateReportModal}
              />
              <AccountReportCard
                downloadAccountWideReport={downloadAccountWideReport}
              />
            </div>
            <div className="right-side" />
          </div>
          {searchModalVisible && (
            <GenerateReportModal onDismiss={hideGenerateReportModal} />
          )}
          <style jsx>{`
            .right-side {
              width: 20rem;
              margin-left: 1.5rem;
            }
          `}</style>
        </CollectionsLayout>
      </div>
      <div className="dn-ns">
        <CollectionsMobileLayout>
          <h1 className="title avenir-roman dark-grey pt4 ph4">Reports</h1>
          <CollectionReportCard
            showGenerateReportModal={showGenerateReportModal}
          />
          <AccountReportCard
            downloadAccountWideReport={downloadAccountWideReport}
          />
          {searchModalVisible && (
            <GenerateReportModal onDismiss={hideGenerateReportModal} isMobile />
          )}
        </CollectionsMobileLayout>
      </div>
    </>
  );
};

const EnhancedReportsPage = React.memo(ReportsPage);

export default EnhancedReportsPage;
