/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { config } from './config/config';

import schema from './schema/index';

import { models } from './models/index';
import { IUser, IUserInstance } from './models/user.model';
import { accessSync } from 'fs';

// VARIABLES
let serverConfig = config.getServerConfig();


// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || serverConfig.port;
const GRAPHQL_ROUTE = '/graphql';
const GRAPHIQL_ROUTE = '/graphiql';

// Transform Google profile into user object
const transformGoogleProfile = (user: any, profile: any, token: string) => {
    user.dataValues.email = profile.emails[0].value;
    user.dataValues.firstname = profile.name.givenName;
    user.dataValues.lastname = profile.name.familyName;
    user.dataValues.avatar = profile.image.url;
    
    return user;
};

// Generate JWT
const generateJWT = (user: IUserInstance, accessToken: string)  => {

    const token = jwt.sign({
        id: user.dataValues.id,
        token: accessToken
    }, serverConfig.auth.jwt.secret);

    return token;
};

// Register Google Passport strategy
passport.use(new GoogleStrategy(serverConfig.googleAuth,

    (accessToken, refreshToken, profile, done) => {

        console.log('REFRESH TOKEN: ', refreshToken);

        // asynchronous
        process.nextTick(() => {

             // Find if the user exists
            models.User.findOne<IUser>({
                include: [{
                    model: models.AuthenticationMethod,
                    where: { type: 'google', externalId: profile.id }
                }]
            }).then((user: IUserInstance) => {

                // If user exists
                if (user) {

                    return done(null, generateJWT(user, accessToken));

                // If user does not exists
                } else {
                    
                    // create a new User instance
                    let newUser = models.User.build(null, {include: [{
                        model: models.AuthenticationMethod
                    }]});
                    
                    newUser = transformGoogleProfile(newUser, profile._json, accessToken);
                    
                    // Create new User
                    newUser.save().then(() => {

                        // Save authenticaton method asociated to the new user
                        newUser.createAuthenticationMethod({
                            type: 'google',
                            externalId: profile.id,
                            token: accessToken,
                            displayName: profile.displayName
                        }).then(
                            () => {
                                console.log('USER CREATED SUCCESSFULL!');
                                done(null, generateJWT(newUser, accessToken));
                            }).catch(err => { 
                                // throw err;
                                return done(err);
                            });

                    }).catch(err => {
                        // throw err;
                        return done(err);
                    });
                }

            })
            .catch((err: any) => {

                if (err) { return done(err); }

            });

        });

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
  passport.authenticate('google', { failureRedirect: '/auth/google', failureFlash: true }),
  (req, res) => res.redirect('http://localhost:3000/explore?token=' + JSON.stringify(req.user)));

// LOGOUT
graphQLServer.get('/auth/logout', function(req: any, res: any){
    req.logout(); // provided by passport
    res.status(200).json({ status: 'OK', message: 'LOGOUT SUCCESSFULL!' });
});

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));


/*
    guides used to manage auth with passportJS: 
    https://scotch.io/tutorials/easy-node-authentication-setup-and-local
    http://rationalappdev.com/logging-into-react-native-apps-with-facebook-or-google/


    ----------------------------------------------------------------------------------

    ** ENTENDER MEJOR LAS ROUTE ANTES Y DESPUES DEL LOGIN **

    // Redirect the user to Google for authentication.  
    // When complete, Google will redirect the user back to the 
    // application at /auth/google/callback 
    graphQLServer.get(
        // Login url
        '/auth/google',
    
        // Save the url of the user's current page so the app can redirect back to
        // it after authorization
        (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
        },
    
        // Start OAuth 2 flow using Passport.js
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );


    // Google will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    graphQLServer.get(
        // OAuth 2 callback url. Use this url to configure your OAuth client in the
        // Google Developers console
        '/auth/google/callback',
    
        // Finish OAuth 2 flow using Passport.js
        passport.authenticate('google'),
    
        // Redirect back to the original page, if any
        (req, res) => {
        const redirect = req.session.oauth2return || '/';
        delete req.session.oauth2return;
        res.redirect(redirect);
        }
    );
    
*/