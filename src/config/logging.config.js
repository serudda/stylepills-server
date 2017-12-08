"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        colorize: true
    },
    console: {
        level: 'silly',
        handleExceptions: true,
        json: false,
        colorize: true
    },
    directory: __dirname
};
//# sourceMappingURL=logging.config.js.map