import 'dotenv/config';
const db = {
  user: process.env.MONGO_DB_USER,
  password: process.env.MONGO_DB_PASS,
  url: process.env.MONGO_DB_URL,
};

export default db;
