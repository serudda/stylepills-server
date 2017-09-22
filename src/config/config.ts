/***************************************/
/*            DEPENDENCIES             */
/***************************************/
import { databaseConfig, IDatabaseConfig } from './database-config';
import { loggingConfig, ILoggingConfig } from './logging-config';
import { serverConfig, IServerConfig } from './server-config';


/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class Config {
    private _databaseConfig: IDatabaseConfig;
    private _loggingConfig: ILoggingConfig;
    private _serverConfig: IServerConfig;


    /*       CONSTRUCTOR      */
    /**************************/
    constructor() {
        this._databaseConfig = databaseConfig;
        this._loggingConfig = loggingConfig;
        this._serverConfig = serverConfig;
    }


    /*       METHODS       */
    /***********************/
    getDatabaseConfig(): IDatabaseConfig {
        return this._databaseConfig;
    }

    getLoggingConfig(): ILoggingConfig {
        return this._loggingConfig;
    }

    getServerConfig(): IServerConfig {
        return this._serverConfig;
    }
}


/* Export Config instance */
export const config = new Config();