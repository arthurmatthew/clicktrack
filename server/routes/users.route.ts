import express from 'express';
import validateToken from '../middleware/validateToken.middleware';
import { get_username, login, register } from '../controllers/users.controller';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/getUsername', validateToken, get_username);

export default router;
