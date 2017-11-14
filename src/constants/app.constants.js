"use strict";
/**
 * @desc App constants: Keep centralize every global app constant here
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* Server config */
exports.PORT = 4000;
/* Environments */
exports.LOCAL = 'local';
exports.DEV = 'development';
exports.PRD = 'production';
/* Base Endpoints */
exports.DATA = '/graphql';
exports.GRAPHIQL = '/graphiql';
exports.AUTH_GOOGLE = '/auth/google';
exports.AUTH_CALLBACK = '/callback';
exports.AUTH_LOGOUT = '/auth/logout';
/* Server Urls */
exports.LOCAL_SERVER_URL = 'http://localhost:4000';
exports.DEV_SERVER_URL = 'https://stylepills-server-dev.herokuapp.com';
exports.PRD_SERVER_URL = 'https://stylepills-server.herokuapp.com';
/* Data Base Endpoints */
exports.LOCAL_DATA_URL = `${exports.LOCAL_SERVER_URL}${exports.DATA}`;
exports.DEV_DATA_URL = `${exports.DEV_SERVER_URL}${exports.DATA}`;
exports.PRD_DATA_URL = `${exports.PRD_SERVER_URL}${exports.DATA}`;
/* Google Auth config */
exports.CLIENT_ID = '355460120650-1gcpiu5583f6fll4geif10l5jf8pk8u2.apps.googleusercontent.com';
exports.CLIENT_SECRET = 'nC_VvB1OnF6Y8m0qzpLH1TwD';
/* Google Auth Base Endpoints */
exports.LOCAL_AUTH_GOOGLE_URL = `${exports.LOCAL_SERVER_URL}${exports.AUTH_GOOGLE}`;
exports.DEV_AUTH_GOOGLE_URL = `${exports.DEV_SERVER_URL}${exports.AUTH_GOOGLE}`;
exports.PRD_AUTH_GOOGLE_URL = `${exports.PRD_SERVER_URL}${exports.AUTH_GOOGLE}`;
/* Google Auth Callback Base Endpoints */
exports.LOCAL_AUTH_GOOGLE_CALLBACK_URL = `${exports.LOCAL_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
exports.DEV_AUTH_GOOGLE_CALLBACK_URL = `${exports.DEV_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
exports.PRD_AUTH_GOOGLE_CALLBACK_URL = `${exports.PRD_AUTH_GOOGLE_URL}${exports.AUTH_CALLBACK}`;
/* Auth Logout Base Endpoints */
exports.LOCAL_AUTH_LOGOUT_URL = `${exports.LOCAL_SERVER_URL}${exports.AUTH_LOGOUT}`;
exports.DEV_AUTH_LOGOUT_URL = `${exports.DEV_SERVER_URL}${exports.AUTH_LOGOUT}`;
exports.PRD_AUTH_LOGOUT_URL = `${exports.PRD_SERVER_URL}${exports.AUTH_LOGOUT}`;
/* Search params */
exports.ATOM_SEARCH_LIMIT = 6;
exports.ATOM_SEARCH_ORDER_BY_DEFAULT = 'likes';
exports.ATOM_SEARCH_ORDER = 'DESC';
/* Username length */
exports.USERNAME_MIN_LENGTH = 8;
exports.USERNAME_MAX_LENGTH = 80;
/* Password length */
exports.PASSWORD_MIN_LENGTH = 8;
exports.PASSWORD_MAX_LENGTH = 80;
//# sourceMappingURL=app.constants.js.map