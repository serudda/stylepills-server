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
        getAllUiComponents: [UiComponent]
        getUiComponentById(id: ID!): UiComponent
    }
`;

export const resolver = {
    Query: {
        getAllUiComponents(root: any, args: any) {
            return models.UiComponent.findAll();
        },
        getUiComponentById(root: any, args: any) {
            return models.UiComponent.findById(args.id);
        },
    },
};