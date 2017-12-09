"use strict";
/************************************/
/*           DEPENDENCIES           */
/************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
/****************************************/
/*            LOGGING CONFIG            */
/****************************************/
exports.loggingConfig = {
    file: {
        level: 'silly',
        filename: 'all-logs.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: true,
        prettyPrint: true,
        humanReadableUnhandledException: true,
        timestamp: () => {
            return moment.utc().format();
        }
    },
    console: {
        level: 'silly',
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true,
        humanReadableUnhandledException: true,
        timestamp: () => {
            return moment.utc().format();
        }
    },
    error: {
        name: 'ErrorHandler',
        level: 'error',
        filename: 'errors.log',
        handleExceptions: true,
        colorize: true,
        maxsize: 5242880,
        maxFiles: 5,
        tailable: true,
        zippedArchive: false,
        timestamp: () => {
            return moment.utc().format();
        }
    },
    directory: __dirname
};
//# sourceMappingURL=logging.config.js.map