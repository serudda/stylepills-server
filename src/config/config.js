"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***************************************/
/*            DEPENDENCIES             */
/***************************************/
const database_config_1 = require("./database.config");
const logging_config_1 = require("./logging.config");
const server_config_1 = require("./server.config");
/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class Config {
    /*       CONSTRUCTOR      */
    /**************************/
    constructor() {
        this._env = process.env.NODE_ENV || 'local';
        this._databaseConfig = database_config_1.databaseConfig(this._env);
        this._loggingConfig = logging_config_1.loggingConfig;
        this._serverConfig = server_config_1.serverConfig(this._env);
    }
    /*       METHODS       */
    /***********************/
    getEnv() {
        return this._env;
    }
    getDatabaseConfig() {
        return this._databaseConfig;
    }
    getLoggingConfig() {
        return this._loggingConfig;
    }
    getServerConfig() {
        return this._serverConfig;
    }
}
/* Export Config instance */
exports.config = new Config();
//# sourceMappingURL=config.js.map