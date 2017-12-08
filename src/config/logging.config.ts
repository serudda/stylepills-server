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
export const loggingConfig: ILoggingConfig = {
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