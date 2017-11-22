/*
TODO: Este sistema de Log no recuerdo de donde lo saque, quedo incompleto
Asi que cuando decida incluir un logger mas robusto podemos arrancar del punto
de saber de donde saque este, para ver si lo continuamos
 */
import * as cluster from 'cluster';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { config } from '../../config/config';
import { transports, Logger } from 'winston';
import { Request, Response } from 'express';

let configs = config.getLoggingConfig();
configs.file.filename = `${path.join(configs.directory, '../logs')}/${configs.file.filename}`;

if (cluster.isMaster) {
    mkdirp.sync(path.join(configs.directory, '../sequelize-express/logs'));
}

export const logger = new Logger({
    transports: [
        new transports.File(configs.file),
        new transports.Console(configs.console)
    ],
    exitOnError: false
});

export const skip = (req: Request, res: Response): boolean => {
    return res.statusCode >= 200;
};

export const stream = {
    write: (message: string, encoding: string): void => {
        logger.info(message);
    }
};