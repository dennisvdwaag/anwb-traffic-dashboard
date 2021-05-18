// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
const { MongoClient } = require('mongodb');

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

// Connect to the database
const connectDatabase = async () => {
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/anwb-dashboard?retryWrites=true&w=majority&useUnifiedTopology=true`;
  const client = new MongoClient(uri);

  await client.connect();

  return client;
}

connectDatabase()
.then(client => {
  // Save data on startup
  SaveData(client);

  app.get('/data/get', (req, res, next) => {
    GetData({ req, res, next, client});
  });
  
  cron.schedule('*/5 * * * *', () => {
    SaveData(client);
  });
})
.catch(err => {
  console.warn(err);
});


// API status
app.get('/status', (req, res, next) => {
  res.send('API Status: Running');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

app.listen(3001, () => {
  console.log('Server running!');
});