import { Request } from 'express';

interface IUser {
  id: string;
  username: string;
}

interface IRequestUser extends Request {
  user: IUser;
}

export default IRequestUser;
