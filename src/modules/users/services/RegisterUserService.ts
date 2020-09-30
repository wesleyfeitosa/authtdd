import { Repository } from 'typeorm';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IRegisterUserDTO from '@modules/users/dtos/IRegisterUserDTO';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import AppError from '@shared/errors/AppError';

class RegisterUserService {
  constructor(private usersRepository: Repository<User>) {}

  public async execute({
    name,
    email,
    password,
  }: IRegisterUserDTO): Promise<User> {
    const bcryptHashProvider = new BCryptHashProvider();

    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('User already exists.');
    }

    const hashedPassword = await bcryptHashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default RegisterUserService;
