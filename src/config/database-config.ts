/************************************/
/*            INTERFACE             */
/************************************/
export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
}


/****************************************/
/*            DATABASE CONFIG           */
/****************************************/
export const databaseConfig: DatabaseConfig = {
    username: null,
    password: null,
    database: 'stylepills-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: true
};


/* Esta linea es necesaria para poder correr el comando: 
    sequelize db:migrate
Ya que este comando busca en .sequelizerc la configuración que le hayamos
establecido (database-config.js)
*/
module.exports = databaseConfig;