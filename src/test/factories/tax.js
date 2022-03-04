import {Factory} from 'rosie';
import {random, range} from 'lodash';
import faker from 'faker';

const applied = ['all', 'none', 'some'];

export default new Factory()
  .attr('applied_to', applied[random(0, applied.length - 1)])
  .attr('applicable_items', ['applied_to'], appliedTo =>
    appliedTo === 'some'
      ? range(1, random(3, 5)).map(() => faker.random.number())
      : null
  )
  .attr('name', faker.lorem.words)
  .attr('rate', random(1, 99) / 100);
