import {Resource} from 'rest-hooks';
import apiClient from 'helpers/apiClient';

class CheddarUpResource extends Resource {
  static async fetch(method, url, body) {
    const response = await apiClient[method](url, body);

    return response.data;
  }

  id = null;

  pk() {
    return this.id;
  }
}

export default CheddarUpResource;
