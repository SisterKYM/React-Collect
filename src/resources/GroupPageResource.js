import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class GroupPageResource extends CheddarUpResource {
  static getKey() {
    return 'GroupPageResource';
  }

  static showOnlyActiveCollectionsShape() {
    return {
      ...super.partialUpdateShape(),
      schema: {
        user: this.asSchema(),
      },
      getFetchKey: () => getCheddarUpApiUrl(`/user`),
      fetch: (params, body) =>
        this.fetch('patch', getCheddarUpApiUrl(`/user`), {
          profile: {
            uiClientFlags: {
              groupPage: {
                showInactive: !body.onlyActiveCollectionsVisible,
              },
            },
          },
        }),
    };
  }

  static updateSettingsShape() {
    return {
      ...super.updateShape(),
      schema: {
        user: this.asSchema(),
      },
      getFetchKey: () => getCheddarUpApiUrl(`/user`),
      fetch: (params, body) =>
        this.fetch('patch', getCheddarUpApiUrl(`/user`), {
          profile: {
            uiClientFlags: {
              groupPage: {
                ...body,
              },
            },
          },
        }),
    };
  }

  static updateGroupPageLogo() {
    return {
      ...super.updateShape(),
      schema: {
        user: this.asSchema(),
      },
      getFetchKey: () => getCheddarUpApiUrl(`/user`),
      fetch: (params, body) =>
        this.fetch('patch', getCheddarUpApiUrl(`/user`), {
          group_page_logo_id: body.id,
        }),
    };
  }

  static updateCategoriesShape() {
    return {
      ...super.updateShape(),
      schema: {
        user: this.asSchema(),
      },
      getFetchKey: () => getCheddarUpApiUrl(`/user`),
      fetch: (params, body) =>
        this.fetch('patch', getCheddarUpApiUrl(`/user`), {
          profile: {
            uiClientFlags: {
              groupPage: {
                categories: body.categories,
              },
            },
          },
        }),
    };
  }

  static updateSlugShape() {
    return {
      ...super.updateShape(),
      schema: {
        user: this.asSchema(),
      },
      getFetchKey: () => getCheddarUpApiUrl(`/user`),
      fetch: (params, body) =>
        this.fetch('patch', getCheddarUpApiUrl(`/user`), {
          slug: body.slug,
        }),
    };
  }
}

export default GroupPageResource;
