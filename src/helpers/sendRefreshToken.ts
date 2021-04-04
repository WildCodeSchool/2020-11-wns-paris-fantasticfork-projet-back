import { Response } from 'express';

const sendRefreshToken = (res: Response, refreshToken: string): Response => {
  return res.cookie('jid', refreshToken, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

export default sendRefreshToken;
