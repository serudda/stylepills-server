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
    private _env: string;
    private _databaseConfig: IDatabaseConfig;
    private _loggingConfig: ILoggingConfig;
    private _serverConfig: IServerConfig;


    /*       CONSTRUCTOR      */
    /**************************/
    constructor() {
        this._env = process.env.NODE_ENV || 'local';
        console.log('LOG - ENV: ', this._env);
        this._databaseConfig = databaseConfig[this._env];
        console.log('LOG - DATABASECONFIG: ', this._databaseConfig);
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