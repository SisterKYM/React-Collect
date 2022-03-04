import _ from 'lodash';
import queryString from 'query-string';

const parameterizeEndpoint = (endpoint, queryParams) => {
  const normalizeArray = arrayQueryParam =>
    arrayQueryParam.length === 0 ? undefined : arrayQueryParam.join('!!');

  const normalizeParam = param =>
    Array.isArray(param) ? normalizeArray(param) : param;

  const normalizedQueryParams = _.mapValues(
    _.pickBy(queryParams, param => Boolean(param) || param === false),
    param => normalizeParam(param)
  );

  const queryParamsStringified = queryString.stringify(normalizedQueryParams);

  return `${endpoint}?${queryParamsStringified}`;
};

const createQuery = method => ({endpoint, body, queryParams}) =>
  _.pickBy(
    {
      method,
      endpoint: parameterizeEndpoint(endpoint, queryParams),
      body,
    },
    Boolean
  );

const [createGetQuery, createPostQuery, createDeleteQuery] = [
  'GET',
  'POST',
  'DELETE',
].map(httpMethod => createQuery(httpMethod));

const createGetCollectionsQuery = () =>
  createGetQuery({endpoint: '/users/tabs'});

const createGetExternalAccountsQuery = () =>
  createGetQuery({endpoint: '/users/external_accounts'});

const createGetSubscriptionInvoicesQuery = () =>
  createGetQuery({endpoint: '/users/subscription/invoices'});

const createGetPaymentMethodsQuery = () =>
  createGetQuery({endpoint: '/users/payment_methods'});

const createPostPaymentMethodQuery = ({body}) =>
  createPostQuery({
    endpoint: '/users/payment_methods',
    body,
  });

const createDeletePaymentMethodQuery = ({paymentMethodId}) =>
  createDeleteQuery({endpoint: `/users/payment_methods/${paymentMethodId}`});

const createPostWithdrawalQuery = ({collectionId, body}) =>
  createPostQuery({
    endpoint: `/users/tabs/${collectionId}/withdrawals`,
    body,
  });

const createGetMarketplaceHomePageQuery = ({partnerId}) =>
  createGetQuery({
    endpoint: `/users/marketplace/home`,
    queryParams: {partnerId},
  });

const createGetMarketplaceItemsQuery = ({
  partnerId,
  catalogIds,
  sortBy,
  categoryNames,
  searchKeyword,
  page,
  perPage,
}) =>
  createGetQuery({
    endpoint: '/users/marketplace/items',
    queryParams: {
      partnerId,
      page,
      catalogIds,
      categoryNames,
      sort: sortBy.sort,
      direction: sortBy.direction,
      search: searchKeyword,
      per_page: perPage,
    },
  });

const createGetMarketplaceOrganizersQuery = ({
  partnerId,
  searchKeyword,
  sortBy,
  page,
  perPage,
}) =>
  createGetQuery({
    endpoint: `/users/marketplace/organizers`,
    queryParams: {
      partnerId,
      page,
      search: searchKeyword,
      sort: sortBy.sort,
      direction: sortBy.direction,
      per_page: perPage,
    },
  });

export {
  createDeletePaymentMethodQuery,
  createGetCollectionsQuery,
  createGetExternalAccountsQuery,
  createGetMarketplaceHomePageQuery,
  createGetMarketplaceItemsQuery,
  createGetMarketplaceOrganizersQuery,
  createGetPaymentMethodsQuery,
  createGetSubscriptionInvoicesQuery,
  createPostPaymentMethodQuery,
  createPostWithdrawalQuery,
};
