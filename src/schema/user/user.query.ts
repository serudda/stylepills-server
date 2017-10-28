/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IUserArgs {
    id: number;
}


/**************************************/
/*         USER QUERY TYPEDEF         */
/**************************************/

export const typeDef = `
    extend type Query {
        userById(id: ID!): User!
        users: [User!]!
    }
`;


/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/

export const resolver = {
    Query: {
        userById(parent: any, { id }: IUserArgs) {
            return models.User.findById(id);
        },
        users() {
            return models.User.findAll();
        }
    },
    User: {
        atoms(user: any) {
            return user.getAtom();
        }
    },
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