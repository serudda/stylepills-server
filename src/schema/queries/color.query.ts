/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/*************************************/
/*            COLOR QUERY            */
/*************************************/

export const typeDef = `
    # Root Query
    type Query {
        getAllColors: [Color]
        getColorById(id: ID!): Color
    }
`;

export const resolver = {
    Query: {
        getAllColors(root: any, args: any) {
            return models.Color.findAll();
        },
        getColorById(root: any, args: any) {
            return models.Color.findById(args.id);
        },
    },
};