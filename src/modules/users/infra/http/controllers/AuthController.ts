import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import IRegisterUserDTO from '@modules/users/dtos/IRegisterUserDTO';
import IAuthenticateUserDTO from '@modules/users/dtos/IAuthenticateUserDTO';
import RegisterUserService from '@modules/users/services/RegisterUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import User from '@modules/users/infra/typeorm/entities/User';

class AuthController {
  private usersRepository = getRepository(User);

  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const registerUserService = new RegisterUserService(this.usersRepository);

    const { name, email, password }: IRegisterUserDTO = request.body;

    const user = await registerUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const authenticateUserService = new AuthenticateUserService();

    const { email, password }: IAuthenticateUserDTO = request.body;

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export default AuthController;
