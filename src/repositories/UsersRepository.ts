import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };
// Cuida da manipulação de dados da entidade para a tabela do banco