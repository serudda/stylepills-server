/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import schema from './schema/index';

// CONSTANTS
const GRAPHQL_PORT = 3001;
const GRAPHQL_ROUTE = '/graphql';
const GRAPHIQL_ROUTE = '/graphiql';

const graphQLServer = express();


// INIT GRAPHQL SERVER
graphQLServer.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use(GRAPHIQL_ROUTE, graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));
