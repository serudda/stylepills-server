"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const passport_google_oauth_1 = require("passport-google-oauth");
const config_1 = require("./config/config");
const index_1 = require("./schema/index");
const index_2 = require("./models/index");
// VARIABLES
let serverConfig = config_1.config.getServerConfig();
// CONSTANTS
const GRAPHQL_PORT = process.env.PORT || 4000;
const GRAPHQL_ROUTE = '/graphql';
const GRAPHIQL_ROUTE = '/graphiql';
// Transform Google profile into user object
const transformGoogleProfile = (user, profile, token) => {
    user.dataValues.email = profile.emails[0].value;
    user.dataValues.firstname = profile.name.givenName;
    user.dataValues.lastname = profile.name.familyName;
    user.dataValues.avatar = profile.image.url;
    return user;
};
// Register Google Passport strategy
passport.use(new passport_google_oauth_1.OAuth2Strategy(serverConfig.googleAuth, (accessToken, refreshToken, profile, done) => {
    // Find if the user exists
    index_2.models.User.findOne({
        include: [{
                model: index_2.models.AuthenticationMethod,
                where: { type: 'google', externalId: profile.id }
            }]
    }).then((user) => {
        // If user exists
        if (user) {
            return done(null, user);
            // If user does not exists
        }
        else {
            // create a new User instance
            let newUser = index_2.models.User.build(null, { include: [{
                        model: index_2.models.AuthenticationMethod
                    }] });
            newUser = transformGoogleProfile(newUser, profile._json, accessToken);
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
                    done(null, newUser);
                }).catch(err => {
                    throw err;
                });
            }).catch(err => {
                throw err;
            });
        }
    })
        .catch((err) => {
        if (err) {
            return done(err);
        }
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
graphQLServer.use(GRAPHQL_ROUTE, bodyParser.json(), apollo_server_express_1.graphqlExpress({ schema: index_1.default }));
graphQLServer.use(GRAPHIQL_ROUTE, apollo_server_express_1.graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));
// SET UP GOOGLE AUTH ROUTES
graphQLServer.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// MANAGE REDIRECTION AFTER LOGIN OR SIGNUP
graphQLServer.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google' }), (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`));
//# sourceMappingURL=server.js.map