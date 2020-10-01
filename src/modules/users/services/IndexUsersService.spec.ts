import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IndexUsersService from './IndexUsersService';
import RegisterUserService from './RegisterUserService';

let indexUsers: IndexUsersService;
let fakeUsersRepository: FakeUsersRepository;
let registerUser: RegisterUserService;
let fakeHashProvider: FakeHashProvider;

describe('Index Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    indexUsers = new IndexUsersService(fakeUsersRepository);
    registerUser = new RegisterUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to return all users', async () => {
    await registerUser.execute({
      email: 'joa@gmail.com',
      name: 'joao',
      password: '123123',
    });

    await registerUser.execute({
      email: 'gui@gmail.com',
      name: 'gui',
      password: '123123',
    });

    const users = await indexUsers.execute();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toEqual('joao');
    expect(users).toHaveLength(2);
  });

  it('should be able to return a array', async () => {
    const users = await indexUsers.execute();

    expect(users).not.toBeUndefined();
  });
});
