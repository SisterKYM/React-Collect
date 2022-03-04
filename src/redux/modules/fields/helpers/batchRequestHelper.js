const batchRequestHelper = (fields, method, url) => ({
  sequential: true,
  ops: fields.map(({options, ...field}) => ({
    method,
    url: typeof url === 'function' ? url(field) : url,
    params: {
      field,
    },
  })),
});

export default batchRequestHelper;
