"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const passport = require("passport");
const appConfig = require("./core/constants/app.constants");
const config_1 = require("./config/config");
const logger_1 = require("./core/utils/logger");
const routes_1 = require("./core/routes/routes");
const index_1 = require("./schema/index");
const auth_1 = require("./core/auth/auth");
// -----------------------------------
// VARIABLES
let accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', { flags: 'a' });
let serverConfig = config_1.config.getServerConfig();
// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || serverConfig.port;
// EXPRESS INSTANCE
const graphQLServer = express();
// ADD CORS
graphQLServer.use('*', cors());
// Configure Apollo Engine
/* NOTE: It has an open issue: https://github.com/apollographql/apollo-engine-js/issues/66
For that reason was neccesary to disabled temporary */
/*const engine = new Engine({
    graphqlPort: parseInt(process.env.PORT, 10) || serverConfig.port,
    engineConfig: {
        apiKey: 'service:sruda-stylepills-production:SqjTHDVozUZ1VrirYhcpIw',
        logging: {
            level: 'info'
        }
    },
    endpoint: appConfig.DATA,
    dumpTraffic: true
});
engine.start();*/
// ADD CUSTOM MIDDLEWARES (LOGGER, EXCEPTION AND APOLLO ENGINE TRACING)
graphQLServer.use(logger_1.loggerMiddleware);
graphQLServer.use(logger_1.exceptionMiddleware);
/* NOTE: It has an open issue: https://github.com/apollographql/apollo-engine-js/issues/66
For that reason was neccesary to disabled temporary */
// graphQLServer.use(engine.expressMiddleware());
graphQLServer.use(morgan('combined', { stream: accessLogStream }));
process.on('uncaughtException', logger_1.logAndCrash);
// INIT PASSPORT
let auth = new auth_1.Auth(passport);
graphQLServer.use(passport.initialize());
graphQLServer.use(passport.session());
// INIT GRAPHQL SERVER
graphQLServer.use(appConfig.DATA, bodyParser.json(), apollo_server_express_1.graphqlExpress({
    schema: index_1.default,
    context: {},
    tracing: true
}));
graphQLServer.use(appConfig.GRAPHIQL, apollo_server_express_1.graphiqlExpress({ endpointURL: appConfig.DATA }));
// INIT ROUTES
routes_1.default(graphQLServer, passport);
// LAUNCH GRAPHQL SERVER
graphQLServer.listen(GRAPHQL_PORT, () => logger_1.logger.info(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`));
//# sourceMappingURL=server.js.map