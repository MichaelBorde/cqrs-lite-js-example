import { Repository } from '../repository';
import { Person } from './person';

export interface PersonRepository extends Repository<Person> {}
