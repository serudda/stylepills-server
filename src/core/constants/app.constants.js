"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @desc App constants: Keep centralize every global app constant here
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */
const { NODE_ENV = 'local' } = process.env;
/* Server config */
exports.PORT = 4000;
/* DEBUG */
exports.DEBUG = NODE_ENV === 'local';
/* Environments */
exports.LOCAL = 'local';
exports.DEV = 'development';
exports.STAGING = 'staging';
exports.PRD = 'production';
exports.ALPHA = 'alpha';
exports.BETA = 'beta';
/* Base Endpoints */
exports.DATA = '/graphql';
exports.GRAPHIQL = '/graphiql';
exports.AUTH_GOOGLE = '/auth/google';
exports.AUTH_CALLBACK = '/callback';
exports.AUTH_LOGOUT = '/auth/logout';
/* Server Urls */
exports.LOCAL_SERVER_URL = 'http://localhost:4000';
exports.DEV_SERVER_URL = 'https://stylepills-server-dev.herokuapp.com';
exports.STAGING_SERVER_URL = 'https://stylepill-server-staging.herokuapp.com';
exports.PRD_SERVER_URL = 'https://stylepills-server.herokuapp.com';
/* Client Urls */
exports.LOCAL_CLIENT_URL = 'http://localhost:3000';
exports.DEV_CLIENT_URL = 'https://stylepills-dev.netlify.com';
exports.STAGING_CLIENT_URL = 'https://staging.stylepill.io';
exports.PRD_CLIENT_URL = 'http://stylepills.co';
exports.ALPHA_CLIENT_URL = 'https://alpha.stylepill.io';
exports.BETA_CLIENT_URL = 'https://beta.stylepill.io';
/* Data Base Endpoints */
exports.LOCAL_DATA_URL = `${exports.LOCAL_SERVER_URL}${exports.DATA}`;
exports.DEV_DATA_URL = `${exports.DEV_SERVER_URL}${exports.DATA}`;
exports.STAGING_DATA_URL = `${exports.STAGING_SERVER_URL}${exports.DATA}`;
exports.PRD_DATA_URL = `${exports.PRD_SERVER_URL}${exports.DATA}`;
/* Google Auth config */
exports.CLIENT_ID = '355460120650-1gcpiu5583f6fll4geif10l5jf8pk8u2.apps.googleusercontent.com';
exports.CLIENT_SECRET = 'nC_VvB1OnF6Y8m0qzpLH1TwD';
/* Google Auth Base Endpoints */
exports.LOCAL_AUTH_GOOGLE_URL = `${exports.LOCAL_SERVER_URL}${exports.AUTH_GOOGLE}`;
exports.DEV_AUTH_GOOGLE_URL = `${exports.DEV_SERVER_URL}${exports.AUTH_GOOGLE}`;
exports.STAGING_AUTH_GOOGLE_URL = `${exports.STAGING_SERVER_URL}${exports.AUTH_GOOGLE}`;
exports.PRD_AUTH_GOOGLE_URL = `${exports.PRD_SERVER_URL}${exports.AUTH_GOOGLE}`;
/* Google Auth Callback Base Endpoints */
exports.LOCAL_AUTH_GOOGLE_CALLBACK_URL = `${exports.LOCAL_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
exports.DEV_AUTH_GOOGLE_CALLBACK_URL = `${exports.DEV_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
exports.STAGING_AUTH_GOOGLE_CALLBACK_URL = `${exports.STAGING_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
exports.PRD_AUTH_GOOGLE_CALLBACK_URL = `${exports.PRD_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
/* Google redirect when user signed up successful */
exports.LOCAL_GOOGLE_AUTH_REDIRECT_URL = `${exports.LOCAL_CLIENT_URL}?token=`;
exports.DEV_GOOGLE_AUTH_REDIRECT_URL = `${exports.DEV_CLIENT_URL}?token=`;
exports.STAGING_GOOGLE_AUTH_REDIRECT_URL = `${exports.STAGING_CLIENT_URL}?token=`;
exports.PRD_GOOGLE_AUTH_REDIRECT_URL = `${exports.PRD_CLIENT_URL}?token=`;
exports.ALPHA_GOOGLE_AUTH_REDIRECT_URL = `${exports.ALPHA_CLIENT_URL}?token=`;
exports.BETA_GOOGLE_AUTH_REDIRECT_URL = `${exports.BETA_CLIENT_URL}?token=`;
/* Auth Logout Base Endpoints */
exports.LOCAL_AUTH_LOGOUT_URL = `${exports.LOCAL_SERVER_URL}${exports.AUTH_LOGOUT}`;
exports.DEV_AUTH_LOGOUT_URL = `${exports.DEV_SERVER_URL}${exports.AUTH_LOGOUT}`;
exports.STAGING_AUTH_LOGOUT_URL = `${exports.STAGING_SERVER_URL}${exports.AUTH_LOGOUT}`;
exports.PRD_AUTH_LOGOUT_URL = `${exports.PRD_SERVER_URL}${exports.AUTH_LOGOUT}`;
/* Search params */
exports.ATOM_SEARCH_LIMIT = 9;
exports.ATOM_SEARCH_ORDER_BY_DEFAULT = 'likes';
exports.ATOM_SEARCH_ORDER = 'DESC';
/* Username length */
exports.USERNAME_MIN_LENGTH = 8;
exports.USERNAME_MAX_LENGTH = 80;
/* Password length */
exports.PASSWORD_MIN_LENGTH = 8;
exports.PASSWORD_MAX_LENGTH = 80;
//# sourceMappingURL=app.constants.js.map