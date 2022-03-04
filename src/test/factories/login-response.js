import {Factory} from 'rosie';
import faker from 'faker';

import UserFactory from 'test/factories/user';

export default new Factory()
  .attr('user', () => UserFactory.build())
  .attr('capabilities', () => ({
    subscribed_to_pro: faker.random.boolean(),
    subscribed_to_team: faker.random.boolean(),
    can_upload_catalogs: faker.random.boolean(),
    can_access_themes: faker.random.boolean(),
  }))
  .attr('organization', () => faker.lorem.words());
