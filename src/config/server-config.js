"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************/
/*            SERVER CONFIG             */
/****************************************/
exports.serverConfig = {
    port: 4000,
    auth: {
        jwt: {
            secret: process.env.JWT_SECRET || 'This is the futureee!!!'
        }
    },
    googleAuth: {
        clientID: '355460120650-1gcpiu5583f6fll4geif10l5jf8pk8u2.apps.googleusercontent.com',
        clientSecret: 'nC_VvB1OnF6Y8m0qzpLH1TwD',
        callbackURL: 'http://localhost:4000/auth/google/callback'
    }
};
//# sourceMappingURL=server-config.js.map