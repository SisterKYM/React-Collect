import React from 'react';
import {PageTitle} from 'layout/components';
import Status from './Status';

const StatefulView = ({
  className,
  loading,
  title,
  status,
  resultCount,
  children,
  renderEmptyStateView,
}) => {
  const viewState = React.useMemo(() => {
    if ((!status || status === 'success') && resultCount > 0) {
      return 'OK';
    }
    if (status === 'failure') {
      return 'ERROR';
    }
    if (status === 'pending' || loading) {
      return 'LOADING';
    }

    return 'EMPTY';
  }, [loading, resultCount, status]);

  const content = React.useMemo(() => {
    switch (viewState) {
      case 'OK':
        return children;
      case 'LOADING':
      case 'ERROR':
        return (
          <div className="pa4 flex justify-center items-center">
            <Status status={loading ? 'pending' : status} />
          </div>
        );
      case 'EMPTY':
        return renderEmptyStateView ? renderEmptyStateView() : null;
      default:
        return null;
    }
  }, [children, loading, renderEmptyStateView, status, viewState]);

  return (
    <div className={className}>
      {!resultCount && title === 'Forms' && (
        <PageTitle className="ttc dark-grey">{title}</PageTitle>
      )}
      {content}
    </div>
  );
};

export default StatefulView;
