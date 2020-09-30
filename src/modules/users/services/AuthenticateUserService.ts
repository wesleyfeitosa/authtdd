import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import IAuthenticateUserDTO from '@modules/users/dtos/IAuthenticateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import authConfig from '@config/AuthConfig';

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IResponse> {
    const usersRepository = getRepository(User);
    const bcryptHashProvider = new BCryptHashProvider();

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination');
    }

    const passwordMatched = await bcryptHashProvider.compareHash(
      password,
      user.password_hash,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
