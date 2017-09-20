/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/*************************************/
/*            COLOR QUERY            */
/*************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        colors: [Color]
        color(id: ID!): Color
    }
`;

export const resolver = {
    Query: {
        colors(root: any, args: any) {
            return models.Color.findAll();
        },
        color(root: any, args: any) {
            return models.Color.findById(args.id);
        },
    }
};


/* 

Queries:


query getColorById($colorId : ID!) {
    color(id: $colorId) {
        id
        hex
        label
        __typename
    }
}
*/