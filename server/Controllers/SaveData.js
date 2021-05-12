require('dotenv').config();
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/anwb-dashboard?retryWrites=true&w=majority&useUnifiedTopology=true`;
const client = new MongoClient(uri);

const SaveData = () => {
  let roadOps = [];
  let incidentOps = [];

  fetch(`https://api.anwb.nl/v1/incidents?apikey=${ process.env.ANWB_APIKEY }&polylines=true&polylineBounds=true&totals=true`, {
    method: 'GET'
  })
  .then(data => data.json())
  .then(async response => {
    try {
      await client.connect();
      const db = client.db('anwb-dashboard');
      const dateNow = new Date();

      response.roads.forEach(road => {
        roadOps.push(
          {
            updateOne: {
              filter: {
                name: road.road
              },
              update: {
                $set: { 
                  name: road.road,
                  type: road.type,
                  number: parseInt(road.road.substring(1))
                }
              },
              upsert: true
            }
          }
        );

        road.segments.forEach(segment => {
          if (undefined !== segment.roadworks) {
            segment.roadworks.forEach(roadwork => {
              incidentOps.push(
                {
                  updateOne: {
                    filter: {
                      extid: roadwork.id
                    },
                    update: {
                      $set: {
                        updated_at: dateNow
                      },
                      $setOnInsert: { 
                        extid: roadwork.id,
                        road: road.road,
                        type: 'roadwork',
                        label: roadwork.label,
                        from: {
                          label: roadwork.from,
                          location: roadwork.fromLoc
                        },
                        to: {
                          label: roadwork.to,
                          location: roadwork.toLoc
                        },
                        polyline: roadwork.polyline,
                        bounds: {
                          southWest: {
                            lat: roadwork.bounds ? roadwork.bounds.southWest.lat : null,
                            lng: roadwork.bounds ? roadwork.bounds.southWest.lon : null
                          },
                          northEast: {
                            lat: roadwork.bounds ? roadwork.bounds.northEast.lat : null,
                            lng: roadwork.bounds ? roadwork.bounds.northEast.lon : null
                          }
                        },
                        startDate: roadwork.start ? new Date(roadwork.start) : dateNow,
                        stopDate: roadwork.stop ? new Date(roadwork.stop) : null,
                        reason: roadwork.reason,
                        created_at: dateNow,
                        removed: false
                      }
                    },
                    upsert: true
                  }
                }
              );
            });
          }
    
          if (undefined !== segment.jams) {
            segment.jams.forEach(jam => {
              incidentOps.push(
                {
                  updateOne: {
                    filter: {
                      extid: jam.id
                    },
                    update: {
                      $set: {
                        updated_at: dateNow
                      },
                      $setOnInsert: { 
                        extid: jam.id,
                        road: road.road,
                        type: 'jam',
                        label: jam.label,
                        from: {
                          label: jam.from,
                          location: jam.fromLoc
                        },
                        to: {
                          label: jam.to,
                          location: jam.toLoc
                        },
                        polyline: jam.polyline,
                        bounds: {
                          southWest: {
                            lat: jam.bounds ? (jam.bounds.southWest ? jam.bounds.southWest.lat : jam.bounds.lat ) : null,
                            lng: jam.bounds ? (jam.bounds.southWest ? jam.bounds.southWest.lon : jam.bounds.lon ) : null
                          },
                          northEast: {
                            lat: jam.bounds ? (jam.bounds.northEast ? jam.bounds.northEast.lat : jam.bounds.lat ) : null,
                            lng: jam.bounds ? (jam.bounds.northEast ? jam.bounds.northEast.lon : jam.bounds.lon ) : null
                          }
                        },
                        startDate: jam.start ? new Date(jam.start) : dateNow,
                        stopDate: jam.stop ? new Date(jam.stop) : null,
                        distance: jam.distance,
                        delay: jam.delay,
                        reason: jam.reason,
                        created_at: dateNow,
                        removed: false
                      }
                    },
                    upsert: true
                  }
                }
              );
            });
          }
        });
      });

      await db.collection('roads').bulkWrite(roadOps, {
        ordered: false
      });

      await db.collection('incidents').bulkWrite(incidentOps, {
        ordered: false
      });

      await updateRemovedIncidents(dateNow, db);

    } catch(err) {
      console.error(err);
    } finally {
        console.log('Cronjon done');
    }
  });
}

const updateRemovedIncidents = async (updatedAt, db) => {
  await db.collection('incidents').updateMany(
    {
      updated_at: { $lt: updatedAt }
    },
    {
      $set: {
        removed: true,
        stopDate: updatedAt,
      }
    }
  );
}

module.exports = SaveData;