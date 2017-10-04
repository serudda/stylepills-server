// migrations/config/config.js
import { config } from '../../config/config';

let dbConfig = config.getDatabaseConfig();

module.exports = {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
};