require('dotenv').config();
const { MongoClient } = require('mongodb');

const SaveIncidents = async ({ req, res, next }) => {
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
          road.jams.forEach(jam => {
            operations.push(
              {
                updateOne: {
                  filter: {
                    id: jam.id
                  },
                  update: {
                    $set: {
                      id: jam.id,
                      name: jam.name,
                      type: jam.type
                    },
                    $upset: {

                    }
                  },
                  upsert: true
                }
              }
            );
          });
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

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = SaveIncidents;