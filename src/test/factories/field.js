import {Factory} from 'rosie';
import _ from 'lodash';
import faker from 'faker';

export default new Factory()
  .sequence('id')
  .sequence('position')
  .attr('field_type', _.sample(['text', 'multiple_choice']))
  .attr('name', faker.random.word())
  .attr('values', ['field_type'], fieldType => {
    const options = [];

    if (fieldType === 'multiple_choice') {
      options.push(..._.times(_.random(1, 10), faker.random.word));
    }

    return options.join('|||');
  })
  .attr('required', true);
