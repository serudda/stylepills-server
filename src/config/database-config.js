"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************/
/*            DATABASE CONFIG           */
/****************************************/
function databaseConfig(env) {
    // Get Port and Host from DATABASE_URL config var
    let match = null;
    let host = null;
    let port = null;
    if (env === 'production' ||
        env === 'development') {
        match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
        host = match[3];
        port = match[4];
    }
    switch (env) {
        case 'local':
            return {
                username: 'sergioruizdavila',
                password: 'admin',
                database: 'stylepills_dev',
                host: '127.0.0.1',
                port: process.env.PORT || 5432,
                dialect: 'postgres',
                logging: true
            };
        case 'development':
            return {
                use_env_variable: 'DATABASE_URL',
                username: 'ucltubusynwrsu',
                password: 'f14c4838c1b7af63fbf45f25799e8c45f319a1f4c618142f19d09fb019a8eb60',
                database: 'dcgfiqehd78k6c',
                port: port,
                host: host,
                dialect: 'postgres',
                logging: true
            };
        case 'production':
            return {
                use_env_variable: 'DATABASE_URL',
                username: 'lgitfxqxcmmqox',
                password: 'dbd65a1bc01384d08aa148ecb8e0e937b2ed15214c15e09c9a79f6e4f87661d1',
                database: 'd6g22ske5oult0',
                port: port,
                host: host,
                dialect: 'postgres',
                logging: true
            };
        default:
            return {
                username: 'sergioruizdavila',
                password: 'admin',
                database: 'stylepills_dev',
                host: '127.0.0.1',
                port: process.env.PORT || 5432,
                dialect: 'postgres',
                logging: true
            };
    }
}
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database-config.js.map