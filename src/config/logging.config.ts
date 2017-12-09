
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
    directory: __dirname
};