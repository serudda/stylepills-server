/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IUserArgs {
    id: number;
    username: string;
    filter: IFilterArgs;
    limit: number;
}

interface IFilterArgs {
    private: boolean;
}


/**************************************/
/*         USER QUERY TYPEDEF         */
/**************************************/

export const typeDef = `
    extend type Query {
        userById(id: ID!): User
        userByUsername(username: String!): User
        allUsers(limit: Int): [User!]!
    }
`;


/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/

export const resolver = {
    Query: {

        /**
         * @desc Get User by Id
         * @method Method userById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IUserArgs} args - destructuring: id
         * @param {number} id - User id
         * @returns {IUser} User entity
         */
        userById(parent: any, { id }: IUserArgs) {
            // LOG
            logger.log('info', 'Query: userById');
            return models.User.findById(id);
        },

        /**
         * @desc Get User by Username
         * @method Method userByUsername
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IUserArgs} args - destructuring: username
         * @param {number} username - User's username
         * @returns {IUser} User entity
         */
        userByUsername(parent: any, { username }: IUserArgs) {
            // LOG
            logger.log('info', 'Query: userByUsername');
            return models.User.findOne({
                where: {
                    username
                }
            });
        },

        /**
         * @desc Get all Users
         * @method Method allUsers
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IUserArgs} args - destructuring: limit
         * @param {Int} limit - limit number of results returned
         * @returns {Array<IUser>} Users list
         */
        allUsers(parent: any, { limit }: IUserArgs) {
            // LOG
            logger.log('info', 'Query: allUsers');
            return models.User.findAll({
                limit,
                where: {
                    active: true
                }
            });
        }
    },
    User: {
        atoms(user: any) {
            // LOG
            logger.log('info', 'Query (User): getAtoms');
            return user.getAtoms();
        }
    }
};