import { AppEnvironment } from './app-environment.type';

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: AppEnvironment;
    HOST: string;
    PORT: number;
  };
  DB: {
    URL: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
};

export { type EnvironmentSchema };
