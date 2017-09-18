export interface ServerConfig {
    port: number;
    session: {
        secret: string,
        name: string,
        resave: boolean,
        saveUninitialized: boolean,
        proxy: boolean
    };
}
  
export const serverConfig: ServerConfig = {
    port: 3000,
    session: {
        secret: 'stylepills_db',
        name: 'stylepills-server',
        resave: false,
        saveUninitialized: false,
        proxy: false
    }
};