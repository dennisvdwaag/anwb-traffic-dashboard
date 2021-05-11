require('dotenv').config();
const fetch = require('node-fetch');

const Roads = ({ req, res, next }) => {
  fetch(`https://api.anwb.nl/v1/incidents?apikey=${ process.env.ANWB_APIKEY }&polylines=true&polylineBounds=true&totals=true`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    const roads = [];
    
    data.roads.forEach(roadData => {
      const road = {
        name: roadData.road,
        type: roadData.type,
        roadworks: [],
        jams: []
      };

      roadData.segments.forEach(segment => {
        if (undefined !== segment.roadworks) {
          segment.roadworks.forEach(roadworkData => {
            const roadwork = {
              id: roadworkData.id,
              label: roadworkData.label,
              from: {
                label: roadworkData.from,
                location: roadworkData.fromLoc
              },
              to: {
                label: roadworkData.to,
                location: roadworkData.toLoc
              },
              polyline: roadworkData.polyline,
              bounds: {
                southWest: {
                  lat: roadworkData.bounds ? roadworkData.bounds.southWest.lat : null,
                  lng: roadworkData.bounds ? roadworkData.bounds.southWest.lon : null
                },
                northEast: {
                  lat: roadworkData.bounds ? roadworkData.bounds.northEast.lat : null,
                  lng: roadworkData.bounds ? roadworkData.bounds.northEast.lon : null
                }
              },
              dates: {
                start: roadworkData.start,
                stop: roadworkData.stop
              },
              reason: roadworkData.reason
            };
    
            road.roadworks.push(roadwork);
          });
        }
  
        if (undefined !== segment.jams) {
          segment.jams.forEach(jamData => {
            const jam = {
              id: jamData.id,
              label: jamData.label,
              from: {
                label: jamData.from,
                location: jamData.fromLoc
              },
              to: {
                label: jamData.to,
                location: jamData.toLoc
              },
              polyline: jamData.polyline,
              bounds: {
                southWest: {
                  lat: jamData.bounds ? (jamData.bounds.southWest ? jamData.bounds.southWest.lat : jamData.bounds.lat ) : null,
                  lng: jamData.bounds ? (jamData.bounds.southWest ? jamData.bounds.southWest.lon : jamData.bounds.lon ) : null
                },
                northEast: {
                  lat: jamData.bounds ? (jamData.bounds.northEast ? jamData.bounds.northEast.lat : jamData.bounds.lat ) : null,
                  lng: jamData.bounds ? (jamData.bounds.northEast ? jamData.bounds.northEast.lon : jamData.bounds.lon ) : null
                }
              },
              dates: {
                start: jamData.start,
                stop: jamData.stop
              },
              distance: jamData.distance,
              delay: jamData.delay,
              reason: jamData.reason,
            };
    
            road.jams.push(jam);
          });
        }
      });

      roads.push(road);
    });

    res.send(roads);
  });
}

module.exports = Roads;