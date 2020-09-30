import RegisterUserService from './RegisterUserService';

describe('Authentication', () => {
  const registerUserService = new RegisterUserService();

  it('should be able to register a new user', async () => {
    const user = await registerUserService.execute({
      email: 'jwesleydasilva@gmail.com',
      name: 'wesley',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });
});
