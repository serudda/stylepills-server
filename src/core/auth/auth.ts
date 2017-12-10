/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as jwt from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { OAuth2Strategy as GoogleStrategy, Profile } from 'passport-google-oauth';

import { config } from './../../config/config';
import { IServerConfig } from './../../config/server.config';
import { functionsUtil } from './../utils/functionsUtil';
import { models } from './../../models/index';

import { IUser, IUserInstance } from './../../models/user.model';
import { logger } from './../utils/logger';

// -----------------------------------


/************************************/
/*            INTERFACES            */
/************************************/

export interface IJwtDecoded {
    user: {
        id: string | number;
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        avatar: string;
    };
    token: string;
}

export interface IAuth {}


/***************************************/
/*             AUTH CLASS              */
/***************************************/

export class Auth implements IAuth {
    private _serverConfig: IServerConfig;

    /*       CONSTRUCTOR      */
    /**************************/
    constructor(passport: PassportStatic) {
        /* Init server config */
        this._serverConfig = config.getServerConfig();

        // PASSPORT SESSION SETUP
        // ========================

        // Init google auth strategy
        this._googleStrategy(passport);
        // Serialize current user
        this._serializeUser(passport);
        // Deserialize current user
        this._deserializeUser(passport);
    }


    /*       METHODS       */
    /***********************/

    /**
     * @desc Init Google Auth Strategy
     * @method googleStrategy
     * @private
     * @param {Passport} passport - Passport object
     * @returns {void}
     */
    private _googleStrategy(passport: PassportStatic): void {
        
        // Register Google Passport strategy
        passport.use(new GoogleStrategy(this._serverConfig.googleAuth,
            (accessToken, refreshToken, profile, done) => {
        
                // LOG
                logger.log('info', 'Google Auth: Register requested', { accessToken });
        
                // asynchronous
                process.nextTick(() => {
        
                        // Find if the user exists
                    models.User.findOne<IUser>({
                        include: [{
                            model: models.AuthenticationMethod,
                            where: { type: 'google', externalId: profile.id }
                        }]
                    }).then((user: IUserInstance) => {
        
                        // If user exists
                        if (user) {
                            // LOG
                            logger.log(
                                'info', 
                                'Google Auth: user already exists', 
                                { email: user.getDataValue('email') }
                            );
                            return done(null, this._generateJWT(user, accessToken));
        
                        // If user does not exists
                        } else {
        
                            // LOG
                            logger.log('info', 'Google Auth: creating user...');
                            
                            // create a new User instance
                            let newUser = models.User.build(null, {include: [{
                                model: models.AuthenticationMethod
                            }]});
                            
                            newUser = this._transformGoogleProfile(newUser, profile._json);
        
                            // generate username
                            let {firstname, lastname } = newUser.dataValues;
                            newUser.dataValues.username = functionsUtil.generateUsername(firstname, lastname);
                            
                            // Create new User
                            newUser.save().then(() => {
        
                                // Save authentication method asociated to the new user
                                newUser.createAuthenticationMethod({
                                    type: 'google',
                                    externalId: profile.id,
                                    token: accessToken,
                                    displayName: profile.displayName
                                })
                                .then(
                                    () => {
                                        // LOG
                                        logger.log(
                                            'info', 
                                            'Google Auth: user created successfull', 
                                            { email: newUser.getDataValue('email') }
                                        );
        
                                        done(null, this._generateJWT(newUser, accessToken));
                                    }
                                ).catch(err => { 
                                    // LOG
                                    logger.log(
                                        'error', 
                                        'Google Auth: newUser.createAuthenticationMethod', 
                                        { err }
                                    );
                                });
                            }).catch(err => {
                                // LOG
                                logger.log(
                                    'error', 
                                    'Google Auth: newUser.save', 
                                    { err }
                                );
                            });
                        }
        
                    })
                    .catch(err => {
                        // LOG
                        logger.log(
                            'error', 
                            'Google Auth: models.User.findOne',
                            { err }
                        );
                    });
        
                });
        
            }
        
        ));
    }


    /**
     * @desc Serialize user into the sessions
     * @method serializeUser
     * @private
     * @param {Passport} passport - Passport object
     * @returns {void}
     */
    private _serializeUser(passport: PassportStatic): void {
        passport.serializeUser((user, done) => done(null, user));
    }


    /**
     * @desc Deserialize user from the sessions
     * @method deserializeUser
     * @public
     * @param {Passport} passport - Passport object
     * @returns {void}
     */
    private _deserializeUser(passport: PassportStatic): void {
        passport.deserializeUser((user, done) => done(null, user));
    }


    /**
     * @desc Generate JWT Token
     * @method _generateJWT
     * @private
     * @param {IUserInstance} user - User Model Instance
     * @param {any} profile - Google Profile JSON result after logIn/signUp process
     * @returns {void}
     */
    private _generateJWT (user: IUserInstance, accessToken: string): string {
    
        const dataToEncode: IJwtDecoded = {
            user: {
                id: user.dataValues.id,
                username: user.dataValues.username,
                firstname: user.dataValues.firstname,
                lastname: user.dataValues.lastname,
                email: user.dataValues.email,
                avatar: user.dataValues.avatar
            },
            token: accessToken
        };
    
        const token = jwt.sign(dataToEncode, this._serverConfig.auth.jwt.secret);
    
        return token;
    }

    
    /**
     * @desc Transform a google profile on a user object
     * @method _transformGoogleProfile
     * @private
     * @param {IUserInstance} user - User Model Instance
     * @param {any} profile - Google Profile JSON result after logIn/signUp process
     * @returns {void}
     */
    private _transformGoogleProfile (user: IUserInstance, profile: any) {
        user.dataValues.email = profile.emails[0].value;
        user.dataValues.firstname = profile.name.givenName;
        user.dataValues.lastname = profile.name.familyName;
        user.dataValues.avatar = profile.image.url.replace('?sz=50', '?sz=200');
        user.dataValues.about = profile.tagline;
        
        return user;
    }

}
