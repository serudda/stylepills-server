/************************************/
/*           DEPENDENCIES           */
/************************************/

import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { transports, Logger } from 'winston';
import { Request, Response, NextFunction, Errback } from 'express';
import * as moment from 'moment';
import * as os from 'os';

import { config } from '../../config/config';

import { functionsUtil } from './functionsUtil';

// -----------------------------------


let configs = config.getLoggingConfig();
configs.file.filename = `${path.join(configs.directory, '../logs')}/${configs.file.filename}`;
configs.error.filename = `${path.join(configs.directory, '../logs')}/${configs.error.filename}`;

let errorMeta = {
    hostname: os.hostname(),
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'local'
};

export const logger = new Logger({
    transports: [
        new transports.File(configs.file),
        new transports.Console(configs.console),
        new transports.File(configs.error)
    ],
    exitOnError: false
});

logger.on('error', (err) => {
    console.error('Error occurred', err);
});


export const skip = (req: Request, res: Response): boolean => {
    return res.statusCode >= 200;
};

export const stream = {
    write: (message: string, encoding: string): void => {
        logger.info(message);
    }
};

export const loggerMiddleware = (req: Request | any, res: Response, next: NextFunction) => {
    req.logger = logger;
    next();
};

export const exceptionMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, { stack: err.stack });
    next(err);
};

export const logAndCrash = (err: Error) => {
    logger.error(err.message, { stack: err.stack });
    throw err;
};