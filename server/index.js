// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

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

app.get('/data/save', (req, res, next) => {
  SaveData();
});

app.get('/data/get', (req, res, next) => {
  GetData({ req, res, next });
});

cron.schedule('*/5 * * * *', () => {
  SaveData();
});

app.listen(3001, () => {
  console.log('Server running!');
});