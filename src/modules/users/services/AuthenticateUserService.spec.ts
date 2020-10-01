import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import RegisterUserService from './RegisterUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let registerUser: RegisterUserService;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    registerUser = new RegisterUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to login', async () => {
    const user = await registerUser.execute({
      email: 'joedoe@email.com',
      name: 'joedoe',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'joedoe@email.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'joedoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with credentials wrong', async () => {
    await registerUser.execute({
      email: 'joedoe@email.com',
      name: 'joedoe',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'joedoe@email.com',
        password: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
