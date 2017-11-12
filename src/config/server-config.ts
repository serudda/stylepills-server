/************************************/
/*            INTERFACE             */
/************************************/
export interface IAuthConfig {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
}

export interface IServerConfig {
    port: number;
    session: {
        secret: string,
        name: string,
        resave: boolean,
        saveUninitialized: boolean,
        proxy: boolean
    };
    googleAuth: IAuthConfig;
}


/****************************************/
/*            SERVER CONFIG             */
/****************************************/
export const serverConfig: IServerConfig = {
    port: 3000,
    session: {
        secret: 'stylepills_db',
        name: 'stylepills-server',
        resave: false,
        saveUninitialized: false,
        proxy: false
    },
    googleAuth: {
        clientID: '355460120650-1gcpiu5583f6fll4geif10l5jf8pk8u2.apps.googleusercontent.com',
        clientSecret: 'nC_VvB1OnF6Y8m0qzpLH1TwD',
        callbackURL: 'http://localhost:4000/auth/google/callback'
    }
};