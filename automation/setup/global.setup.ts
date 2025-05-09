import { request } from '@playwright/test';
import fs from 'fs';
import { Utils } from '../utils/utils';
import { UserPayload } from '../payloads/users/UsersPayload';
import { PostUserRequest } from '../requests/users/PostUserRequest';
import { LoginPayload } from '../payloads/login/loginPayload';
import { LoginRequest } from '../requests/login/LoginRequest';


async function globalSetup() {
  const apiContext = await request.newContext({
    baseURL: 'https://serverest.dev',
  });

  console.log('🚀 Running global setup...');

  // 1. Create user
  const userEmail = Utils.generateRandomEmail();

  const newUser = UserPayload.createUser({
    nome: 'Fulano da Silva',
    email: userEmail,
    password: 'teste',
    administrador: 'true',
  });

  const createResponse = await PostUserRequest.createUser(apiContext, newUser);
  const createBody = await createResponse.json();

  console.log('✅ User created:\n' + JSON.stringify(createBody, null, 2));

  // 2. Login
  const login = LoginPayload.login({
    email: userEmail,
    password: 'teste',
  });

  const loginResponse = await LoginRequest.login(apiContext, login);
  const loginBody = await loginResponse.json();

  const token = loginBody.authorization;
  console.log('🔐 Token obtained:', token);

  // 3. Save token and user to file
  fs.writeFileSync('global-token.json', JSON.stringify({
    token,
    user: {
      nome: newUser.nome,
      email: newUser.email,
      password: newUser.password,
      administrador: newUser.administrador,
      _id: createBody._id,
    },
  }, null, 2));

  console.log('💾 Token and user saved to global-token.json');
}

export default globalSetup;

