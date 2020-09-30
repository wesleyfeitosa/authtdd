import IRegisterUserDTO from '@modules/users/dtos/IRegisterUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IRegisterUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
