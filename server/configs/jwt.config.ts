import 'dotenv/config';
const jwtc = {
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
};

export default jwtc;
