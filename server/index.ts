import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
