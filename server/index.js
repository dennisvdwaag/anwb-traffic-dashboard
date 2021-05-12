// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

// Declare express app
const app = express();

// Set Headers
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Controllers
const SaveData = require('./Controllers/SaveData');
const GetData = require('./Controllers/GetData');

SaveData();

// API status
app.get('/status', (req, res, next) => {
  res.send('API Status: Running');
});

app.get('/data/get', (req, res, next) => {
  GetData({ req, res, next });
});

cron.schedule('*/5 * * * *', () => {
  SaveData();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

app.listen(3001, () => {
  console.log('Server running!');
});