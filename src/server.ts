/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { Engine } from 'apollo-engine';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as passport from 'passport';

import * as appConfig from './core/constants/app.constants';
import { config } from './config/config';

import { logger, exceptionMiddleware, loggerMiddleware, logAndCrash } from './core/utils/logger';
import routes from './core/routes/routes';

import schema from './schema/index';

import { Auth } from './core/auth/auth';

// -----------------------------------


// VARIABLES
let accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
let serverConfig = config.getServerConfig();

// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || serverConfig.port;

// EXPRESS INSTANCE
const graphQLServer = express();

// ADD CORS
graphQLServer.use('*', cors());

// Configure Apollo Engine
const engine = new Engine({
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
engine.start();

// ADD CUSTOM MIDDLEWARES (LOGGER, EXCEPTION AND APOLLO ENGINE TRACING)
graphQLServer.use(loggerMiddleware);
graphQLServer.use(exceptionMiddleware);
graphQLServer.use(engine.expressMiddleware());
graphQLServer.use(morgan('combined', {stream: accessLogStream}));
process.on('uncaughtException', logAndCrash);

// INIT PASSPORT
let auth = new Auth(passport);
graphQLServer.use(passport.initialize());
graphQLServer.use(passport.session());

// INIT GRAPHQL SERVER
graphQLServer.use(appConfig.DATA, bodyParser.json(), graphqlExpress({ 
    schema,
    context: {},
    tracing: true
}));
graphQLServer.use(appConfig.GRAPHIQL, graphiqlExpress({ endpointURL: appConfig.DATA }));

// INIT ROUTES
routes(graphQLServer, passport);

// LAUNCH GRAPHQL SERVER
graphQLServer.listen(GRAPHQL_PORT, () => logger.info(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));