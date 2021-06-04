import { Response } from 'express';

const sendRefreshToken = (res: Response, refreshToken: string): Response => {
  return res.cookie('jid', refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
    path: '/refresh_token',
  });
};

export default sendRefreshToken;
