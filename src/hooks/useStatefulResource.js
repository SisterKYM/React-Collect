import {useRetrieve, useCache, useError} from 'rest-hooks';

const hasUsableData = (resource, fetchShape) =>
  !((fetchShape.options && fetchShape.options.invalidIfStale) || !resource);

const useStatefulResource = (fetchShape, params) => {
  const maybePromise = useRetrieve(fetchShape, params);
  const resource = useCache(fetchShape, params);

  const loading =
    !hasUsableData(resource, fetchShape) &&
    maybePromise &&
    typeof maybePromise.then === 'function';

  const error = useError(fetchShape, params, resource);

  return {
    data: resource,
    loading,
    error,
  };
};

export default useStatefulResource;
