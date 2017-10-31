/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IUserArgs {
    id: number;
    active: boolean;
}


/**************************************/
/*         USER QUERY TYPEDEF         */
/**************************************/

export const typeDef = `
    extend type Query {
        userById(id: ID!): User!
        allUsers: [User!]!
        activeUsers: [User!]!
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
        allUsers() {
            return models.User.findAll();
        },
        activeUsers() {
            return models.User.findAll({ where: { active: true } });
        }
    },
    User: {
        atoms(user: any) {
            return user.getAtoms();
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