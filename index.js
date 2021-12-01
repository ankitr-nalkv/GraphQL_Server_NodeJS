var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
var cors = require('cors')
var { incidentsData } = require('./data');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        incident(id: Int!): incident
        incidents(keywords: String): [incident]
    },
    type Mutation {
      updateincidentkeywords(id: Int!, keywords: String!): incident
    },
    type incident {
        id: Int
        subject: String
        owner: String
        description: String
        keywords: String
        link: String
    }
`);


var getincident = function (args) {
  var id = args.id;
  return incidentsData.filter((incident) => {
    return incident.id == id;
  })[0];
};
var getincidents = function (args) {
  debugger;
  if (args.keywords) {
    var keywords = args.keywords;
    return incidentsData.filter((incident) => incident.keywords === keywords);
  } else {
    return incidentsData;
  }
};
var updateincidentkeywords = function ({ id, keywords }) {
  incidentsData.map((incident) => {
    if (incident.id === id) {
      incident.keywords = keywords;
      return incident;
    }
  });
  return incidentsData.filter((incident) => incident.id === id)[0];
};
var root = {
  incident: getincident,
  incidents: getincidents,
  updateincidentkeywords: updateincidentkeywords,
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
);
