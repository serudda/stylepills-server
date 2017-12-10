"use strict";
/************************************/
/*           DEPENDENCIES           */
/************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const winston_1 = require("winston");
const os = require("os");
const config_1 = require("../../config/config");
// -----------------------------------
let configs = config_1.config.getLoggingConfig();
configs.file.filename = `${path.join(configs.directory, '../logs')}/${configs.file.filename}`;
configs.error.filename = `${path.join(configs.directory, '../logs')}/${configs.error.filename}`;
let errorMeta = {
    hostname: os.hostname(),
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'local'
};
exports.logger = new winston_1.Logger({
    transports: [
        new winston_1.transports.File(configs.file),
        new winston_1.transports.Console(configs.console),
        new winston_1.transports.File(configs.error)
    ],
    exitOnError: false
});
exports.logger.on('error', (err) => {
    console.error('Error occurred', err);
});
exports.skip = (req, res) => {
    return res.statusCode >= 200;
};
exports.stream = {
    write: (message, encoding) => {
        exports.logger.info(message);
    }
};
exports.loggerMiddleware = (req, res, next) => {
    req.logger = exports.logger;
    next();
};
exports.exceptionMiddleware = (err, req, res, next) => {
    exports.logger.error(err.message, { stack: err.stack });
    next(err);
};
exports.logAndCrash = (err) => {
    exports.logger.error(err.message, { stack: err.stack });
    throw err;
};
//# sourceMappingURL=logger.js.map