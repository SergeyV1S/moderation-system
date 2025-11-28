const express = require('express');
const cors = require('cors');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT || 8000;

console.log(process.env.VAPID_PUBLIC_KEY);

app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: [process.env.CLIENT_BASE_URL, "http://127.0.0.1:8080"],
    credentials: true
  }))

app.use('/api/v1', require('./src/routes/v1'));

app.get('/', (req, res) => {
  res.json({
    message: 'API сервер для модерации объявлений',
    version: '1.0.0'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Что-то пошло не так!',
    message: err.message
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint не найден',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;
