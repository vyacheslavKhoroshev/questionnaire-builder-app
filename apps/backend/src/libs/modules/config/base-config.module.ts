import { config as loadEnv } from 'dotenv';
import type { EnvironmentSchema } from './libs/types/environment-schema.type';
import type { AppEnvironment } from './libs/types/app-environment.type';
import { config } from './config';

class BaseConfig {
  public readonly ENV: EnvironmentSchema;

  public constructor() {
    loadEnv();

    const env = process.env;

    const APP_ENVIRONMENT = (env.NODE_ENV ?? 'development') as AppEnvironment;
    const APP_HOST = env.HOST ?? 'localhost';
    const APP_PORT = Number(env.PORT ?? 3001);
    const APP_CORS_ORIGINS = env.CORS_ORIGINS ?? '';

    const DATABASE_URL = env.DATABASE_URL ?? '';
    const DB_POOL_MIN = Number(env.DB_POOL_MIN ?? 0);
    const DB_POOL_MAX = Number(env.DB_POOL_MAX ?? 10);

    this.ENV = {
      APP: {
        ENVIRONMENT: APP_ENVIRONMENT,
        HOST: APP_HOST,
        PORT: APP_PORT,
        CORS_ORIGINS: APP_CORS_ORIGINS,
      },
      DB: {
        URL: DATABASE_URL,
        POOL_MIN: DB_POOL_MIN,
        POOL_MAX: DB_POOL_MAX,
      },
    };
  }
}

export { BaseConfig };
