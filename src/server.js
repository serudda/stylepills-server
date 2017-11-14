"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passport_google_oauth_1 = require("passport-google-oauth");
const appConfig = require("./constants/app.constants");
const config_1 = require("./config/config");
const functionsUtil_1 = require("./utils/functionsUtil");
const index_1 = require("./schema/index");
const index_2 = require("./models/index");
// VARIABLES
let serverConfig = config_1.config.getServerConfig();
// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || serverConfig.port;
const BASE_AUTH_GOOGLE_CALLBACK = `${appConfig.AUTH_GOOGLE}${appConfig.AUTH_CALLBACK}`;
const REDIRECT_URL = 'http://localhost:3000/explore?token=';
// Transform Google profile into user object
const transformGoogleProfile = (user, profile, token) => {
    user.dataValues.email = profile.emails[0].value;
    user.dataValues.firstname = profile.name.givenName;
    user.dataValues.lastname = profile.name.familyName;
    user.dataValues.avatar = profile.image.url;
    return user;
};
// Generate JWT
const generateJWT = (user, accessToken) => {
    const token = jwt.sign({
        id: user.dataValues.id,
        token: accessToken
    }, serverConfig.auth.jwt.secret);
    return token;
};
// Register Google Passport strategy
passport.use(new passport_google_oauth_1.OAuth2Strategy(serverConfig.googleAuth, (accessToken, refreshToken, profile, done) => {
    // asynchronous
    process.nextTick(() => {
        // Find if the user exists
        index_2.models.User.findOne({
            include: [{
                    model: index_2.models.AuthenticationMethod,
                    where: { type: 'google', externalId: profile.id }
                }]
        }).then((user) => {
            // If user exists
            if (user) {
                return done(null, generateJWT(user, accessToken));
                // If user does not exists
            }
            else {
                // create a new User instance
                let newUser = index_2.models.User.build(null, { include: [{
                            model: index_2.models.AuthenticationMethod
                        }] });
                newUser = transformGoogleProfile(newUser, profile._json, accessToken);
                // generate username
                let { firstname, lastname } = newUser.dataValues;
                newUser.dataValues.username = functionsUtil_1.functionsUtil.generateUsername(firstname, lastname);
                // Create new User
                newUser.save().then(() => {
                    // Save authenticaton method asociated to the new user
                    newUser.createAuthenticationMethod({
                        type: 'google',
                        externalId: profile.id,
                        token: accessToken,
                        displayName: profile.displayName
                    }).then(() => {
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
            .catch((err) => {
            if (err) {
                return done(err);
            }
        });
    });
}));
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
graphQLServer.use(appConfig.DATA, bodyParser.json(), apollo_server_express_1.graphqlExpress({ schema: index_1.default }));
graphQLServer.use(appConfig.GRAPHIQL, apollo_server_express_1.graphiqlExpress({ endpointURL: appConfig.DATA }));
// SET UP GOOGLE AUTH ROUTES
graphQLServer.get(appConfig.AUTH_GOOGLE, passport.authenticate('google', { scope: ['profile', 'email'] }));
// MANAGE REDIRECTION AFTER LOGIN OR SIGNUP
graphQLServer.get(BASE_AUTH_GOOGLE_CALLBACK, passport.authenticate('google', { failureRedirect: appConfig.AUTH_GOOGLE, failureFlash: true }), (req, res) => res.redirect(`${REDIRECT_URL}${JSON.stringify(req.user)}`));
// LOGOUT
graphQLServer.get(appConfig.AUTH_LOGOUT, function (req, res) {
    req.logout(); // provided by passport
    res.status(200).json({ status: 'OK', message: 'LOGOUT SUCCESSFULL!' });
});
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`));
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
//# sourceMappingURL=server.js.map