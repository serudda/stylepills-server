/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { config } from './config/config';

import schema from './schema/index';

import { models } from './models/index';
import { IUser, IUserInstance } from './models/user.model';

// VARIABLES
let serverConfig = config.getServerConfig();


// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || 4000;
const GRAPHQL_ROUTE = '/graphql';
const GRAPHIQL_ROUTE = '/graphiql';

// Transform Google profile into user object
const transformGoogleProfile = (user: IUserInstance, profile: any) => {
    user.dataValues.email = profile.emails[0].value;
    user.dataValues.firstname = profile.name.givenName;
    user.dataValues.lastname = profile.name.familyName;
    user.dataValues.avatar = profile._json.picture;
    
    return user;
};

// Register Google Passport strategy
passport.use(new GoogleStrategy(serverConfig.googleAuth,

    (accessToken, refreshToken, profile, done) => {

        console.log('ACCESSTOKEN: ', accessToken);
        console.log('REFRESHTOKEN: ', refreshToken);
        console.log('PROFILE: ', profile);
        console.log('EMAIL: ', profile.emails[0].value);

        models.User.findOne<IUser>({where: {googleId: profile.id}}).then(
            (user: IUserInstance) => {

                if (user) {
                    return done(null, user);
                } else {
                    
                    let newUser = models.User.build();
                    
                    newUser = transformGoogleProfile(newUser, profile._json);

                    console.log('NEWUSER: ', newUser);
                    
                    newUser.save().then(() => {
                        return done(null, newUser);
                    }).catch(err => {
                        throw err;
                    });
                }
                
            })
            .catch((err: any) => {

                if (err) { return done(err); }
                
              }
        );
  }

));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// EXPRESS INSTANCE
const graphQLServer = express();

// ADD CORS
graphQLServer.use('*', cors());

// INIT PASSPORT
graphQLServer.use(passport.initialize());
graphQLServer.use(passport.session());

// INIT GRAPHQL SERVER
graphQLServer.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use(GRAPHIQL_ROUTE, graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));

// SET UP GOOGLE AUTH ROUTES
graphQLServer.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// MANAGE REDIRECTION AFTER LOGIN OR SIGNUP
graphQLServer.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));
