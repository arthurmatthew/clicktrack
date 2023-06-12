import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import IRequestUser from '../types/IRequestUser';
import jwtc from '../configs/jwt.config';

export async function login(req: Request, res: Response) {
  const username = (req.body.username as string).toLowerCase();
  const password = req.body.password as string;

  const databaseUser = await User.findOne({ username: username });

  if (!databaseUser) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const authorized = await bcrypt.compare(password, databaseUser.password);

  if (!authorized) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const payload = {
    id: databaseUser._id,
    username: databaseUser.username,
  };

  jwt.sign(
    payload,
    jwtc.secret as string,
    { expiresIn: parseInt(jwtc.expires as string) },
    (err, token) => {
      if (err)
        return res.status(500).json({ message: 'Internal server error' });
      return res
        .status(200)
        .json({ message: 'Login Success', token: 'Bearer ' + token });
    }
  );
}

export async function register(req: Request, res: Response) {
  const username = (req.body.username as string).toLowerCase();
  const email = (req.body.email as string).toLowerCase();
  const password = req.body.password as string;

  const usernameTaken = await User.findOne({ username: username });
  const emailTaken = await User.findOne({ email: email });

  if (usernameTaken) {
    return res
      .status(409)
      .json({ message: 'This user has already registered.' });
  }
  if (emailTaken) {
    return res
      .status(409)
      .json({ message: 'This user has already registered.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const databaseUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  databaseUser.save();
  res.status(200).json({ message: 'Success' });
}

export async function get_username(req: Request, res: Response) {
  res.status(200).json({ username: (req as IRequestUser).user.username });
}
