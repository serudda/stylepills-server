
/************************************/
/*           DEPENDENCIES           */
/************************************/

import * as moment from 'moment';


/************************************/
/*            INTERFACE             */
/************************************/
export interface ILoggingConfig {
    file: {
        level: string,
        filename: string,
        handleExceptions: boolean,
        json: boolean,
        maxsize: number,
        maxFiles: number,
        colorize: boolean,
        prettyPrint: boolean,
        humanReadableUnhandledException: boolean,
        timestamp: () => string
    };
    console: {
        level: string,
        handleExceptions: boolean,
        json: boolean,
        colorize: boolean,
        prettyPrint: boolean,
        humanReadableUnhandledException: boolean,
        timestamp: () => string
    };
    error: {
        name: string,
        filename: string,
        level: string,
        colorize: boolean,
        timestamp: () => string,
        maxsize: number,
        maxFiles: number,
        tailable: boolean,
        zippedArchive: boolean
    };
    directory: string;
}


/****************************************/
/*            LOGGING CONFIG            */
/****************************************/
export const loggingConfig: ILoggingConfig = {
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
        filename: 'errors.log',
        level: 'error',
        colorize: true,
        timestamp: () => {
            return moment.utc().format();
        },
        maxsize: 10000,
        maxFiles: 5,
        tailable: true,
        zippedArchive: true
    },
    directory: __dirname
};