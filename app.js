const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const { NotFoundError } = require('./helpers/errors');

const app = express();

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const dayRouter = require('./routes/day');
const dailyRateRouter = require('./routes/dailyRate');

const { errorHandler } = require('./helpers/apiHelpers');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 1000 }));
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/day', dayRouter);
app.use('/daily-rate', dailyRateRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// test heroku
app.use('/test', (req, res) => {
  res.end(`
  <div>
  <nav>
  <ul>
  <li>
  <a href="/test">1test1</a>
  </li>
  <li>
  <a href="/test2">2test2</a>
  </li>
  </ul>
  </nav>
  <h1>1test1</h1>
  </div>`);
});
app.use('/test2', (req, res) => {
  res.end(`
  <div>
  <nav>
  <ul>
  <li>
  <a href="/test">1test1</a>
  </li>
  <li>
  <a href="/test">2test2</a>
  </li>
  </ul>
  </nav>
  <h1>2test2</h1>
  </div>`);
});

// Ответ на всех урлы, которые не заматчились
app.use((req, res) => {
  throw new NotFoundError(`Not found`);
});

// app.use() // Обработчик всех ошибок - добавить
app.use(errorHandler);

module.exports = app;
