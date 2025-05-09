import { test, expect, request } from '@playwright/test';
import { PostPetRequest } from '../../requests/pet/PostPetRequest';
import { AssertionUtils } from '../../utils/AssertionUtils';
import { PetPayload } from '../../payloads/pet/PetPayload';

test('POST /pet - Create new pet successfully', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://petstore.swagger.io/v2',
  });

  const newPet = PetPayload.createPet({
    id: Date.now(),
    category: { id: 1, name: 'dog' },
    name: 'Toby',
    photoUrls: ['toby1.jpg', 'toby2.jpg'],
    tags: [{ id: 1, name: 'friendly' },{ id: 2, name: 'viralata' }],
    status: 'available',
  });

  const response = await PostPetRequest.createPet(apiContext, newPet);


  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  
  expect(responseBody).toEqual(expect.objectContaining({
    id: newPet.id,
    category: expect.objectContaining({
      id: 1,
      name: 'dog',
    }),
    name: 'Toby',
    photoUrls: ['toby1.jpg', 'toby2.jpg'],
    tags: expect.arrayContaining([
      expect.objectContaining({ id: 1, name: 'friendly' }),
      expect.objectContaining({ id: 2, name: 'viralata' }),
    ]),
    status: 'available',
  }));
  expect(responseBody.tags).toHaveLength(2);
  expect(responseBody.photoUrls).toHaveLength(2);

});

test('POST /pet - Create new pet successfully with assert all failling', async () => {
    const apiContext = await request.newContext({
      baseURL: 'https://petstore.swagger.io/v2',
    });
  
    const newPet = PetPayload.createPet({
      id: Date.now(),
      category: { id: 1, name: 'dog' },
      name: 'Toby',
      photoUrls: ['toby1.jpg', 'toby2.jpg'],
      tags: [{ id: 1, name: 'frindly' },{ id: 2, name: 'viralata' }],
      status: 'available',
    });
  
    const response = await PostPetRequest.createPet(apiContext, newPet);
  
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
    
    await AssertionUtils.assertAll([
        () => expect(response.status()).toBe(200),
        () => expect(responseBody.id).toBe(newPet.id),
        () => expect(responseBody.name).toBe(newPet.name),
        () => expect(responseBody.status).toBe('availables'),
        () => expect(responseBody.tags).toHaveLength(1),
        () =>
          expect(responseBody.tags).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: 1, name: 'frindly' }),
              expect.objectContaining({ id: 2, name: 'viralata' }),
            ])
          ),
      ]);
  
    
  
  });
  


