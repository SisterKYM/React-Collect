import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class ManagerResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/managers');

  static getKey() {
    return 'ManagerResource';
  }

  static inviteShape() {
    return {
      ...this.createShape(),
      fetch: (params, body) =>
        this.fetch('post', getCheddarUpApiUrl('/users/managers'), body),
    };
  }

  static remindShape() {
    return {
      ...this.createShape(),
      fetch: (params, body) =>
        this.fetch(
          'post',
          getCheddarUpApiUrl(`/users/managers/${params.manager}/remind`),
          body
        ),
    };
  }

  static removeShape() {
    return {
      ...this.listShape(),
      fetch: (params, body) =>
        this.fetch(
          'post',
          getCheddarUpApiUrl(`/users/managers/${params.manager}/delete`),
          body
        ),
    };
  }

  static updateShape() {
    return {
      ...super.updateShape(),
      fetch: (params, body) =>
        this.fetch(
          'patch',
          getCheddarUpApiUrl(`/users/managers/${params.manager}`),
          body
        ),
    };
  }
}

export default ManagerResource;
