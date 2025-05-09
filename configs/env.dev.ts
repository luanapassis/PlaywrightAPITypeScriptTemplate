import { config as SqlConfig } from 'mssql';

export const envConfig = {
  dbConfig: {
    user: 'dev_user',
    password: 'dev_pass',
    server: 'localhost',
    database: 'dev_db',
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  } as SqlConfig,
  testUser: {
    username: 'dev_user1',
    password: '123456',
  }
};
