/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IColorArgs {
    id: number;
}


/****************************************/
/*          COLOR QUERY TYPEDEF         */
/****************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        colors: [Color]
        color(id: ID!): Color
    }
`;


/****************************************/
/*         COLOR QUERY RESOLVER         */
/****************************************/

export const resolver = {
    Query: {
        colors() {
            return models.Color.findAll();
        },
        color(root: any, { id }: IColorArgs) {
            return models.Color.findById(id);
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