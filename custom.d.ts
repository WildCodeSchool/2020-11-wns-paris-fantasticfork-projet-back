declare namespace Express {
  export interface Request {
    isAuth?: boolean;
    userID?: string;
  }
}
