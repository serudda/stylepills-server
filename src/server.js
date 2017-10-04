"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const index_1 = require("./schema/index");
// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || 4000;
const GRAPHQL_ROUTE = '/graphql';
const GRAPHIQL_ROUTE = '/graphiql';
// EXPRESS INSTANCE
const graphQLServer = express();
// ADD CORS
graphQLServer.use('*', cors());
// INIT GRAPHQL SERVER
graphQLServer.use(GRAPHQL_ROUTE, bodyParser.json(), apollo_server_express_1.graphqlExpress({ schema: index_1.default }));
graphQLServer.use(GRAPHIQL_ROUTE, apollo_server_express_1.graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`));
//# sourceMappingURL=server.js.map