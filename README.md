# GraphQL_Server_NodeJS

This repo demonstrates use of graphql with nodejs and express. It uses expess-graphql to run graphql

The client part is build on Angular at this repo https://github.com/ankitr-nalkv/GraphQL-Angular

## BUILD

Build the code by running node index.js

## Example Queries

Below queries can be used as an example to run on graphiql interface when server is started
```
# All Incident data for list view in desktop
# query {
#   incidents {
#     id
#     subject
#     owner
#     description
#     keywords
#     link
#   }
# }

# All Incident data for list view in mobile
# query {
#   incidents {
#     id
#     subject
#     description
#   }
# }

# Update Incident
# mutation updateincidentTopic($id: Int!, $incid: incidentInput) {
#   updateIncident(id: $id, incid: $incid) {
#     ...courseFields
#   }
# }

# fragment courseFields on incident {
#   id
#   subject
#   description
#   keywords
#   link
#   owner
# }
```
