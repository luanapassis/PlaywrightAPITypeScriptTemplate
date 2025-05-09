import { config as SqlConfig } from 'mssql';

export const envConfig = {
  dbConfig: {
    user: 'SA',
    password: 'StrongPassw0rd!',
    server: '127.0.0.1',
    port: 1433,
    database: 'AppDatabase',
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  } as SqlConfig,
  testUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  }
};