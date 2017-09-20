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
        uiComponents: [UiComponent]
        uiComponent(id: ID!): UiComponent
    }
`;

export const resolver = {
    Query: {
        uiComponents(root: any, args: any) {
            // TODO: Aqui deberia llamar a un Service o una Api donde contenga
            // cada unos de los Request alusivos a 'uiComponent', haciendo el
            // try, catch, el manejo de errores, parseando los datos que sean
            // necesarios, etc.
            return models.UiComponent.findAll();
        },
        uiComponent(root: any, args: any) {
            return models.UiComponent.findById(args.id);
        },
    },
    UiComponent: {
        colorPalette(uiComponent: any) {
            return uiComponent.getColorPalette();
        }, 
    },
};



/* 

Queries:


query getUiComponentById($uiComponentId : ID!) {
    uiComponent(id: $uiComponentId) {
        id
        css
        scss
        html
        __typename
        colorPalette {
            id
            colors {
                id
                hex
                label
                __typename
            }
            category
            description
            __typename
        }
    }
}
*/