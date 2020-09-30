import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import IRegisterUserDTO from '@modules/users/dtos/IRegisterUserDTO';
import IAuthenticateUserDTO from '@modules/users/dtos/IAuthenticateUserDTO';
import RegisterUserService from '@modules/users/services/RegisterUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class AuthController {
  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usersRepository = new UsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const registerUserService = new RegisterUserService(
      usersRepository,
      bcryptHashProvider,
    );

    const { name, email, password }: IRegisterUserDTO = request.body;

    const user = await registerUserService.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      bcryptHashProvider,
    );

    const { email, password }: IAuthenticateUserDTO = request.body;

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default AuthController;
