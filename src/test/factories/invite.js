import {Factory} from 'rosie';
import faker from 'faker';

export default new Factory()
  .sequence('id')
  .attr('name', faker.name.findName)
  .attr('email', faker.internet.email)
  .attr('totalPayments', faker.random.number)
  .attr('paid', faker.random.boolean)
  .attr('sentAt', faker.date.past);
