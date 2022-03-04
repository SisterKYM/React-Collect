import {Factory} from 'rosie';
import faker from 'faker';

export default new Factory()
  .sequence('id')
  .attr('email', faker.internet.email)
  .attr('first_name', faker.name.firstName)
  .attr('last_name', faker.name.lastName)
  .attr('created_at', faker.date.past)
  .attr('updated_at', faker.date.recent)
  .attr('display_name', faker.internet.userName)
  .attr('address', faker.address.streetAddress)
  .attr('city', faker.address.city)
  .attr('state', faker.address.state)
  .attr('zip', faker.address.zip)
  .attr('phone', faker.address.phoneNumber)
  .attr('country', faker.address.country)
  .attr('profile_pic', () => ({
    url: faker.image.imageUrl(),
  }))
  .attr('withdrawal_data', () => ({
    total_available_balance: faker.random.number(),
    transfers_enabled: faker.random.boolean(),
  }));
