import {Factory} from 'rosie';
import {times} from 'lodash';
import faker from 'faker';

import ItemQuestionFieldFactory from './field';

export default new Factory()
  .sequence('id')
  .attr('name', faker.lorem.words)
  .attr('amount', faker.random.number)
  .attr('position', faker.random.number)
  .attr('parent_id', faker.random.number)
  .attr('image', () => ({
    image_file: {
      url: faker.image.imageUrl(),
    },
  }))
  .attr('category', () => ({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
  }))
  .attr(
    'fields',
    times(3, i =>
      i !== 2
        ? ItemQuestionFieldFactory.build()
        : ItemQuestionFieldFactory.build({field_type: 'multiple_choice'})
    )
  );
