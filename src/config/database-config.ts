export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
    force: boolean;
    timezone: string;
    storage: string;
}
  
export const databaseConfig: DatabaseConfig = {
    username: null,
    password: null,
    database: 'stylepills',
    storage: 'src/data/stylepills.sqlite',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'sqlite',
    logging: true,
    force: true,
    timezone: '+00:00'
};