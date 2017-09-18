"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingConfig = {
    file: {
        level: 'error',
        filename: 'stylepills_db.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 100,
        colorize: false
    },
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true
    },
    directory: __dirname
};
//# sourceMappingURL=logging-config.js.map