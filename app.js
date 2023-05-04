const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const routes = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    // ID from mongoshell
    _id: '6452a9019eb51e7aa91a3c30',
  };

  next();
});

app.use(routes);

// after mongoshell:
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
