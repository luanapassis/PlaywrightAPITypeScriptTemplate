import { test, expect, request } from '@playwright/test';
import { AssertionUtils } from '../../utils/AssertionUtils';
import { CartPayload } from '../../payloads/cart/CartPayload';
import { PostCartRequest } from '../../requests/cart/PostCartRequest';
import { GetProductStep } from '../../steps/products/GetProductStep';

test('POST /cart - Create new cart successfully', async () => {
  const apiContext = await request.newContext({    
  });

  const productId = await GetProductStep.getFirstProductIdByQuery(apiContext, {
    nome: 'logi' //other parameters are optional
  });

  const newCart = CartPayload.creatCart({
    produtos: [
      { idProduto: productId, quantidade: 1 }
    ]
  });

  const response = await PostCartRequest.createCart(apiContext, newCart);
  expect(response.status()).toBe(201);
  const responseBody = await response.json();  

  await AssertionUtils.assertAll([
    () => expect(responseBody.message).toBe('Cadastro realizado com sucesso'),
    () => expect(responseBody).toHaveProperty('_id'),
    () => expect(typeof responseBody._id).toBe('string'),
    () => expect(responseBody._id.length).toBeGreaterThan(0),
  ]);

});