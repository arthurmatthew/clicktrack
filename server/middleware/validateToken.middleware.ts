import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import IRequestUser from '../types/IRequestUser';
import jwtc from '../configs/jwt.config';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  // Bearer <token> - > split - > <token>
  const token = (req.headers['x-access-token'] as string).split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Error validating', loggedIn: false });
  }

  jwt.verify(token, jwtc.secret as string, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ message: 'Error validating', loggedIn: false });
    (req as IRequestUser).user = {
      id: (decoded as JwtPayload).id,
      username: (decoded as JwtPayload).username,
    };
    next();
  });
};

export default validateToken;
