/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IUiComponentArgs {
    id: number;
}


/**************************************/
/*     UI COMPONENT QUERY TYPEDEF     */
/**************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        uiComponents: [UiComponent]
        uiComponent(id: ID!): UiComponent
    }
`;


/*******************************************/
/*       UI COMPONENT QUERY RESOLVER       */
/*******************************************/

export const resolver = {
    Query: {
        uiComponents() {
            // TODO: Aqui deberia llamar a un Service o una Api donde contenga
            // cada unos de los Request alusivos a 'uiComponent', haciendo el
            // try, catch, el manejo de errores, parseando los datos que sean
            // necesarios, etc.
            return models.UiComponent.findAll();
        },
        uiComponent(root: any, { id }: IUiComponentArgs) {
            return models.UiComponent.findById(id);
        },
    },
    UiComponent: {
        // TODO: Investigar mas a fondo los types de apollo graph server para poder quitar este any
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
        name
        css
        scss
        html
        background
        __typename
        colorPalette {
            id
            category
            description
            __typename
            colors {
                id
                hex
                label
                __typename
            }
        }
    }
}
*/