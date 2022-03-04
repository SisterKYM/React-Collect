import {Factory} from 'rosie';
import faker from 'faker';

export default new Factory()
  .sequence('id')
  .sequence('tab_id')
  .attr('name', faker.fake('{{name.firstName}} {{name.lastName}}'))
  .attr('invited_email', faker.internet.email)
  .attr('accepted_at', faker.date.past)
  .attr('invited_at', faker.date.recent)
  .attr('access', {receive_messages: faker.random.boolean})
  .attr('errors', {});
