import dotenv from 'dotenv';
dotenv.config();

import { envConfig as dev } from './env.dev';
import { envConfig as qa } from './env.qa';

const env = (process.env.TEST_ENV || 'dev') as keyof typeof environments;

const environments = {
  dev,
  qa
};

export const envConfig = environments[env] || dev;


