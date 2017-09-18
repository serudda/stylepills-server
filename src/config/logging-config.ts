/************************************/
/*            INTERFACE             */
/************************************/
export interface LoggingConfig {
    file: {
        level: string,
        filename: string,
        handleExceptions: boolean,
        json: boolean,
        maxsize: number,
        maxFiles: number,
        colorize: boolean
    };
    console: {
        level: string,
        handleExceptions: boolean,
        json: boolean,
        colorize: boolean
    };
    directory: string;
}


/****************************************/
/*            LOGGING CONFIG            */
/****************************************/
export const loggingConfig: LoggingConfig = {
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