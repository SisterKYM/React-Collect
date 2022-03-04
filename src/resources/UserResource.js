import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class UserResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/user');

  static getKey() {
    return 'UserResource';
  }

  static updateShape() {
    return {
      ...this.partialUpdateShape(),
      schema: {
        user: this.schema,
      },
      fetch: (params, body) => this.fetch('patch', 'user', body),
    };
  }

  static resetPasswordShape() {
    return {
      ...this.partialUpdateShape(),
      schema: {
        user: this.schema,
      },
      getFetchKey: () => 'password/reset',
      fetch: (params, body) => this.fetch('post', 'password/reset', body),
    };
  }

  static verifyCodeShape() {
    return {
      ...this.partialUpdateShape(),
      schema: {
        user: this.schema,
      },
      getFetchKey: () => 'users/verify/code',
      fetch: (params, body) => this.fetch('post', 'users/verify/code', body),
    };
  }

  static checkSubscriptionsShape() {
    return {
      ...this.partialUpdateShape(),
      schema: {
        user: this.schema,
      },
      getFetchKey: () => 'users/subscription/check',
      fetch: (params, body) =>
        this.fetch('patch', 'users/subscription/check', body),
    };
  }
}

export default UserResource;
