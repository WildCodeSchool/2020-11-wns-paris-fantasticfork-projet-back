declare namespace Express {
  export interface Request {
    isAuth?: boolean;
    userID?: string;
    Context?: Request;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_LIFE_TIME: string;
  }
}
