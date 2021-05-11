// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
const Roads = require('./Controllers/Roads');
const SaveIncidents = require('./Controllers/SaveIncidents');
const SaveRoads = require('./Controllers/SaveRoads');

// API status
app.get('/status', (req, res, next) => {
  res.send('API Status: Running');
});

app.get('/data/roads', (req, res, next) => {
  Roads({ req, res, next });
});

app.get('/save-roads', (req, res, next) => {
  SaveRoads({ req, res, next });
});

app.listen(3001, () => {
  console.log('Server running!');
});