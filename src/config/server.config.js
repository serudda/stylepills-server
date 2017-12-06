"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const appConfig = require("./../core/constants/app.constants");
function _getCallBackUrl(env) {
    switch (env) {
        case appConfig.LOCAL:
            return appConfig.LOCAL_AUTH_GOOGLE_CALLBACK_URL;
        case appConfig.DEV:
            return appConfig.DEV_AUTH_GOOGLE_CALLBACK_URL;
        case appConfig.PRD:
            return appConfig.PRD_AUTH_GOOGLE_CALLBACK_URL;
        default:
            return appConfig.LOCAL_AUTH_GOOGLE_CALLBACK_URL;
    }
}
function _getRedirectUrl(env) {
    switch (env) {
        case appConfig.LOCAL: {
            console.log('LOCAL');
            return appConfig.LOCAL_GOOGLE_AUTH_REDIRECT_URL;
        }
        case appConfig.DEV:
            return appConfig.DEV_GOOGLE_AUTH_REDIRECT_URL;
        case appConfig.PRD:
            return appConfig.PRD_GOOGLE_AUTH_REDIRECT_URL;
        case appConfig.ALPHA: {
            console.log('ALPHA', appConfig.ALPHA_GOOGLE_AUTH_REDIRECT_URL);
            return appConfig.ALPHA_GOOGLE_AUTH_REDIRECT_URL;
        }
        case appConfig.BETA:
            return appConfig.BETA_GOOGLE_AUTH_REDIRECT_URL;
        default: {
            console.log('DEFAULT', appConfig.LOCAL_GOOGLE_AUTH_REDIRECT_URL);
            return appConfig.LOCAL_GOOGLE_AUTH_REDIRECT_URL;
        }
    }
}
/****************************************/
/*            SERVER CONFIG             */
/****************************************/
function serverConfig(env) {
    console.log('ENV: ', env);
    return {
        port: appConfig.PORT,
        auth: {
            jwt: {
                secret: process.env.JWT_SECRET || 'This is the futureee!!!'
            }
        },
        googleAuth: {
            clientID: appConfig.CLIENT_ID,
            clientSecret: appConfig.CLIENT_SECRET,
            callbackURL: _getCallBackUrl(env),
            redirectURL: _getRedirectUrl(env)
        }
    };
}
exports.serverConfig = serverConfig;
//# sourceMappingURL=server.config.js.map