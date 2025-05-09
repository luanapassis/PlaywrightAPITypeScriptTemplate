import { test, expect, request } from '@playwright/test';
import { GetUserByIdRequest } from '../../requests/users/GetUserById';

test('Get invalid user by id', async () => {
  const apiContext = await request.newContext({
  });

  const userId = '999uPY0cbmQhpEz1';

  const response = await GetUserByIdRequest.getUserById(apiContext, userId);
  const responseBody = await response.json();


  expect(response.status()).toBe(400);
  expect(responseBody.message).toBe('Usuário não encontrado');
});
