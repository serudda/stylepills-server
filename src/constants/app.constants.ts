/**
 * @desc App constants: Keep centralize every global app constant here 
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */

/* Server config */
export const PORT = 4000;

/* Environments */
export const LOCAL = 'local';
export const DEV = 'development';
export const PRD = 'production';

/* Base Endpoints */
export const DATA = '/graphql';
export const GRAPHIQL = '/graphiql';
export const AUTH_GOOGLE = '/auth/google';
export const AUTH_CALLBACK = '/callback';
export const AUTH_LOGOUT = '/auth/logout';

/* Server Urls */
export const LOCAL_SERVER_URL = 'http://localhost:4000';
export const DEV_SERVER_URL = 'https://stylepills-server-dev.herokuapp.com';
export const PRD_SERVER_URL = 'https://stylepills-server.herokuapp.com';

/* Data Base Endpoints */
export const LOCAL_DATA_URL = `${LOCAL_SERVER_URL}${DATA}`;
export const DEV_DATA_URL = `${DEV_SERVER_URL}${DATA}`;
export const PRD_DATA_URL = `${PRD_SERVER_URL}${DATA}`;

/* Google Auth config */
export const CLIENT_ID = '355460120650-1gcpiu5583f6fll4geif10l5jf8pk8u2.apps.googleusercontent.com';
export const CLIENT_SECRET = 'nC_VvB1OnF6Y8m0qzpLH1TwD';

/* Google Auth Base Endpoints */
export const LOCAL_AUTH_GOOGLE_URL = `${LOCAL_SERVER_URL}${AUTH_GOOGLE}`;
export const DEV_AUTH_GOOGLE_URL = `${DEV_SERVER_URL}${AUTH_GOOGLE}`;
export const PRD_AUTH_GOOGLE_URL = `${PRD_SERVER_URL}${AUTH_GOOGLE}`;

/* Google Auth Callback Base Endpoints */
export const LOCAL_AUTH_GOOGLE_CALLBACK_URL = `${LOCAL_AUTH_GOOGLE_URL}${AUTH_CALLBACK}`;
export const DEV_AUTH_GOOGLE_CALLBACK_URL = `${DEV_AUTH_GOOGLE_URL}${AUTH_CALLBACK}`;
export const PRD_AUTH_GOOGLE_CALLBACK_URL = `${PRD_AUTH_GOOGLE_URL}${AUTH_CALLBACK}`;

/* Auth Logout Base Endpoints */
export const LOCAL_AUTH_LOGOUT_URL = `${LOCAL_SERVER_URL}${AUTH_LOGOUT}`;
export const DEV_AUTH_LOGOUT_URL = `${DEV_SERVER_URL}${AUTH_LOGOUT}`;
export const PRD_AUTH_LOGOUT_URL = `${PRD_SERVER_URL}${AUTH_LOGOUT}`;

/* Search params */
export const ATOM_SEARCH_LIMIT = 6;
export const ATOM_SEARCH_ORDER_BY_DEFAULT = 'likes';
export const ATOM_SEARCH_ORDER = 'DESC';

/* Username length */
export const USERNAME_MIN_LENGTH = 8;
export const USERNAME_MAX_LENGTH = 80;

/* Password length */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 80;