"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const config_1 = require("../../config/config");
const winston_1 = require("winston");
let configs = config_1.config.getLoggingConfig();
configs.file.filename = `${path.join(configs.directory, '../logs')}/${configs.file.filename}`;
exports.logger = new winston_1.Logger({
    transports: [
        new winston_1.transports.File(configs.file),
        new winston_1.transports.Console(configs.console)
    ],
    exitOnError: false
});
exports.skip = (req, res) => {
    return res.statusCode >= 200;
};
exports.stream = {
    write: (message, encoding) => {
        exports.logger.info(message);
    }
};
//# sourceMappingURL=logger.js.map