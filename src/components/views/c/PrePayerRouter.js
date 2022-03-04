import {Route, Redirect, generatePath} from 'react-router-dom';
import useStatefulResource from 'hooks/useStatefulResource';
import NotFoundPage from 'views/NotFoundPage';
import React from 'react';
import PendingPage from 'views/PendingPage';

import PublicCollectionResource from 'resources/PublicCollectionResource';

import PayerRouter from './PayerRouter';

const PrePayerRouter = ({match}) => {
  const slug = match.params.collection;

  const {loading, error: fetchCollectionError} = useStatefulResource(
    PublicCollectionResource.detailShape(),
    {
      slug: match.params.collection,
    }
  );

  if (slug && slug.trim() !== slug) {
    return (
      <Redirect
        to={generatePath('/c/:collection', {
          collection: slug.trim(),
        })}
      />
    );
  }

  if (loading) {
    return <Route component={PendingPage} />;
  }
  if (fetchCollectionError) {
    return <Route component={NotFoundPage} />;
  }

  return <Route component={PayerRouter} />;
};

export default PrePayerRouter;
