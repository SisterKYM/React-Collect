import FileSaver from 'file-saver';
import axios from 'axios';

import config from 'config';

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
  headers: {
    'Client-Id': config.clientId,
  },
});
instance.fetchAndSave = async ({url, fileName}) => {
  const response = await instance.get(url, {
    timeout: 90000,
    responseType: 'blob',
  });
  await FileSaver.saveAs(response.data, fileName);
};
instance.batch = async (requests) => {
  const {
    data: {results},
  } = await instance.patch('batch', {
    ops: requests,
    sequential: true,
  });
  const failures = [];
  results.forEach((result, index) => {
    if (result.status >= 400) {
      failures.push({
        url: requests[index],
        status: result.status,
        response: result.body,
      });
    }
  });
  if (failures.length !== 0) {
    throw failures;
  }

  return results.map((result) => result.body);
};

export default instance;
