/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface ISocialArgs {
    id: number;
}


/****************************************/
/*         SOCIAL QUERY TYPEDEF         */
/****************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        social(id: ID!): Social
    }
`;


/*******************************************/
/*           USER QUERY RESOLVER           */
/*******************************************/

export const resolver = {
    Query: {
        social(root: any, { id }: ISocialArgs) {
            return models.Social.findById(id);
        },
    },
};



/* 

Queries:


query getSocialById($socialId : ID!) {
    social(id: $socialId) {
        id
        twitter
        facebook
        github
        linkedin
        __typename
    }
}
*/