import RegisterUserService from './RegisterUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let registerUser: RegisterUserService;

describe('Register User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    registerUser = new RegisterUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to register a new user', async () => {
    const user = await registerUser.execute({
      email: 'jwesleydasilva@gmail.com',
      name: 'wesley',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jwesleydasilva@gmail.com');
  });

  it('should not be able to create two user with same email', async () => {
    await registerUser.execute({
      email: 'jwesleydasilva@gmail.com',
      name: 'wesley',
      password: '123123',
    });

    await expect(
      registerUser.execute({
        email: 'jwesleydasilva@gmail.com',
        name: 'wesley',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
