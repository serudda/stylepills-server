"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************/
/*            SERVER CONFIG             */
/****************************************/
exports.serverConfig = {
    port: 3000,
    session: {
        secret: 'stylepills_db',
        name: 'stylepills-server',
        resave: false,
        saveUninitialized: false,
        proxy: false
    }
};
//# sourceMappingURL=server-config.js.map