import {useQuery} from 'react-fetching-library';
import React from 'react';
import _ from 'lodash';

const usePagination = ({createQuery, perPage = 20}, clearItemsDeps) => {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState([]);

  const query = React.useMemo(
    () =>
      createQuery({
        page,
        perPage,
      }),
    [createQuery, page, perPage]
  );
  const queryRes = useQuery(query);

  React.useEffect(
    () => {
      setPage(1);
      setItems([]);
    },
    Array.isArray(clearItemsDeps) ? clearItemsDeps : [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  React.useEffect(() => {
    if (queryRes.payload) {
      setItems(prevItems =>
        _.uniqBy([...prevItems, ...queryRes.payload.data], 'id')
      );
    }
  }, [queryRes.payload]);

  const fetchMore = () => {
    setPage(prevFetchOrganizersQueryPage => prevFetchOrganizersQueryPage + 1);
  };

  return {
    items,
    fetchMore,
    queryRes,
  };
};

export default usePagination;
