import { NotFoundException } from '@nestjs/common';
import { createHmac } from 'crypto';

export const PasswordMaker = (
  pwd: string,
): { password: string; salt: string } => {
  const salt: string = Math.round(new Date().valueOf() + Math.random()) + '';
  const password: string = createHmac('sha512', process.env.CRYPTO)
    .update(pwd + salt)
    .digest('hex');
  return { password, salt };
};

export const PasswordDecoding = (pwd: {
  password: string;
  salt: string;
  userPassword: string;
}) => {
  const { password, salt, userPassword } = pwd;
  const check: string = createHmac('sha512', process.env.CRYPTO)
    .update(password + salt)
    .digest('hex');
  if (check === userPassword) {
    return true;
  }
  throw new NotFoundException();
};