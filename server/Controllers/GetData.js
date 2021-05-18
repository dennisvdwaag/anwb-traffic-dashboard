require('dotenv').config();

const GetData = async ({ req, res, next, client }) => {
  const db = client.db('anwb-dashboard');

  const date = new Date(req.query.filter);
  let incidentQuery, roadworkQuery, jamQuery;

  if (req.query.filter === 'null') {
    incidentQuery = [
      { $eq: [ '$road', '$$name' ] },
      { $eq: [ '$removed', false ] },
    ];

    roadworkQuery = [
      { $eq: [ '$type', 'roadwork' ] },
      { $eq: [ '$road', '$$name' ] },
      { $eq: [ '$removed', false ] }
    ];

    jamQuery = [
      { $eq: [ '$type', 'jam' ] },
      { $eq: [ '$road', '$$name' ] },
      { $eq: [ '$removed', false ] }
    ];
  } else {
    incidentQuery = [
      { $eq: [ '$road', '$$name' ] },
      {
        $and: [
          {
            $or: [
              { $gte: [ '$stopDate', date ] },
              { $eq: [ '$stopDate', null ] }
            ]
          },
          {
            $or: [
              { $lte: [ '$startDate', date ] },
              { $eq: [ '$startDate', null ] },
            ]
          }
        ]
      }
    ];

    roadworkQuery = [
      { $eq: [ '$type', 'roadwork' ] },
      { $eq: [ '$road', '$$name' ] },
      {
        $and: [
          {
            $or: [
              { $gte: [ '$stopDate', date ] },
              { $eq: [ '$stopDate', null ] }
            ]
          },
          {
            $or: [
              { $lte: [ '$startDate', date ] },
              { $eq: [ '$startDate', null ] },
            ]
          }
        ]
      }
    ];

    jamQuery = [
      { $eq: [ '$type', 'jam' ] },
      { $eq: [ '$road', '$$name' ] },
      {
        $and: [
          {
            $or: [
              { $gte: [ '$stopDate', date ] },
              { $eq: [ '$stopDate', null ] }
            ]
          },
          {
            $or: [
              { $lte: [ '$startDate', date ] },
            ]
          }
        ]
      }
    ];
  }

  const roads = await db.collection('roads').aggregate(
    [
      {
        $sort: { 'type': 1, 'number': 1 }
      },

      {
        // Inner join on all incidents
        $lookup: {
          from: 'incidents',
          let: { name: '$name' },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: incidentQuery
                }
              },
            },
            {
              $sort: { 'type': -1 }
            }
          ],

          as: 'incidents',
        },
      },

      // Counting the roadwork incidents
      {
        $lookup: {
          from: 'incidents',
          let: { name: '$name' },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: roadworkQuery
                }
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ],
          as: 'roadwork_amount'
        }
      },

      // Counting the jam incidents
      {
        $lookup: {
          from: 'incidents',
          let: { name: '$name' },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: jamQuery
                }
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ],
          as: 'jam_amount'
        }
      },
    ]
  ).toArray();

  res.send(roads);
}

module.exports = GetData;