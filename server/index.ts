import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import db from './configs/db.config';

import users from './routes/users.route';
import server from './configs/server.config';

const app = express();
const databaseUrl = db.url;
const port = server.port;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/users', users);

mongoose
  .connect(databaseUrl as string)
  .then((_res) => {
    app.listen(port, () => {
      console.log('Listening on ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// console.log((databaseUrl as string) + mongoose + ' shut up typescript!');
// app.listen(port, () => {
//   console.log('Listening without DB on ' + port);
// });
