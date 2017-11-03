/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IUserArgs {
    id: number;
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
        userById(id: ID!): User!
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
            return models.User.findById(id);
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
            return user.getAtoms();
        }
    }
};



/* 

Queries:


query getUserById($userId : ID!) {
    userById(id: $userId) {
        id
        firstname
        lastname
        username
        email
        avatar
        about
        website
        __typename
        atoms {
            id
            name
            __typename
        }
    }
}
*/