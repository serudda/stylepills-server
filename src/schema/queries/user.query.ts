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
    # Root Query
    extend type Query {
        users: [User]
        user(id: ID!): User
    }
`;


/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/

export const resolver = {
    Query: {
        users() {
            return models.User.findAll();
        },
        user(root: any, { id }: IUserArgs) {
            return models.User.findById(id);
        },
    },
    User: {
        uiComponents(user: any) {
            return user.getUiComponent();
        }, 
        social(user: any) {
            return user.getSocial();
        },
    },
};



/* 

Queries:


query getUserById($userId : ID!) {
    user(id: $userId) {
        id
        username
        firstname
        lastname
        email
        avatar
        about
        website
        __typename
        social {
            id
            twitter
            facebook
            github
            linkedin
            __typename
        }
        uiComponents {
            id
            name
            __typename
        }
    }
}
*/