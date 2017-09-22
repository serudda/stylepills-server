"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
TODO: Este sistema de Log no recuerdo de donde lo saque, quedo incompleto
Asi que cuando decida incluir un logger mas robusto podemos arrancar del punto
de saber de donde saque este, para ver si lo continuamos
 */
const cluster = require("cluster");
const mkdirp = require("mkdirp");
const path = require("path");
const config_1 = require("../config/config");
const winston_1 = require("winston");
let configs = config_1.config.getLoggingConfig();
configs.file.filename = `${path.join(configs.directory, '../logs')}/${configs.file.filename}`;
if (cluster.isMaster) {
    mkdirp.sync(path.join(configs.directory, '../sequelize-express/logs'));
}
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