import {Factory} from 'rosie';
import faker from 'faker';

export default new Factory().sequence('id').attr('status', faker.lorem.word);
