var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
var cors = require('cors')

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

var incidentsData = [
  {
    id: 1,
    subject: 'The Complete Node.js Developer incident',
    owner: 'Andrew Mead, Rob Percival',
    description:
      'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    keywords: 'Node.js',
    link: 'https://codingthesmartway.com/incidents/nodejs/',
  },
  {
    id: 2,
    subject: 'Node.js, Express & MongoDB Dev to Deployment',
    owner: 'Brad Traversy',
    description:
      'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    keywords: 'Node.js',
    link: 'https://codingthesmartway.com/incidents/nodejs-express-mongodb/',
  },
  {
    id: 3,
    subject: 'JavaScript: Understanding The Weird Parts',
    owner: 'Anthony Alicea',
    description:
      'An advanced JavaScript incident for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    keywords: 'JavaScript',
    link: 'https://codingthesmartway.com/incidents/understand-javascript/',
  },
];
var getincident = function (args) {
  var id = args.id;
  return incidentsData.filter((incident) => {
    return incident.id == id;
  })[0];
};
var getincidents = function (args) {
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
