require('dotenv').config();
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

const SaveRoads = async ({ req, res, next }) => {
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/anwb-dashboard?retryWrites=true&w=majority&useUnifiedTopology=true`;
  const client = new MongoClient(uri);
  let operations = [];

  try {
    await client.connect();
    const db = client.db('anwb-dashboard');

    await fetch('http://localhost:3001/data/roads')
      .then(data => data.json())
      .then(async response => {
        response.forEach(road => {
          operations.push(
            {
              updateOne: {
                filter: {
                  name: road.name
                },
                update: {
                  $set: { 
                    name: road.name,
                    type: road.type
                  }
                },
                upsert: true
              }
            }
          );
        });

        await db.collection('roads').bulkWrite(operations, {
          ordered: false
        });
      });

    await client.close();

  } catch (e) {
    console.error(e);
  } finally {
    res.send('Done!');
  }
}

module.exports = SaveRoads;