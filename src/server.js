"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const bodyParser = require("body-parser");
const schema_1 = require("./data/schema");
const GRAPHQL_PORT = 3000;
const graphQLServer = express();
graphQLServer.use('/graphql', bodyParser.json(), apollo_server_express_1.graphqlExpress({ schema: schema_1.default }));
graphQLServer.use('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`));
//# sourceMappingURL=server.js.map