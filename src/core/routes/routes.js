"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig = require("./../constants/app.constants");
const config_1 = require("./../../config/config");
const logger_1 = require("./../utils/logger");
// -----------------------------------
/************************************/
/*            INTERFACES            */
/************************************/
/************************************/
/*  APP ROUTES (NO GRAPHQL ROUTES)  */
/************************************/
function default_1(app, passport) {
    let serverConfig = config_1.config.getServerConfig();
    const BASE_AUTH_GOOGLE_CALLBACK = `${appConfig.AUTH_GOOGLE}${appConfig.AUTH_CALLBACK}`;
    // =====================================
    // GOOGLE AUTH ROUTES ==================
    // =====================================
    app.get(appConfig.AUTH_GOOGLE, passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    // ===============================================
    // GOOGLE AUTH REDIRECTION AFTER LOGIN OR SIGNUP =
    // ===============================================
    app.get(BASE_AUTH_GOOGLE_CALLBACK, passport.authenticate('google', { failureRedirect: appConfig.AUTH_GOOGLE, failureFlash: true }), (req, res) => {
        // LOG
        logger_1.logger.log('info', 'Google Auth: Log In finished');
        res.redirect(`${serverConfig.googleAuth.redirectURL}${JSON.stringify(req.user)}`);
    });
    // =========================
    // LOG OUT =================
    // =========================
    app.get(appConfig.AUTH_LOGOUT, function (req, res) {
        // LOG
        logger_1.logger.log('info', 'Log Out request');
        req.logout(); // provided by passport
        res.status(200).json({ status: 'OK', message: 'LOGOUT SUCCESSFULL!' });
    });
}
exports.default = default_1;
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
//# sourceMappingURL=routes.js.map