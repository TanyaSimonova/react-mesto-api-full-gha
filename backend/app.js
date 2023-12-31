const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const limiter = require('./middlewares/limiter');
const NotFound = require('./errors/NotFound');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const REGEX_URL = require('./utils/constants');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
}).then(() => console.log('DB CONNECT'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(limiter);
app.use(helmet());

app.use(requestLogger);

// роут для краш-тест сервера (необходимо удалить)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEX_URL),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.use(cardRouter);
app.use(userRouter);
app.use('*', (req, res, next) => next(new NotFound('Page not found')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
