"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/**************************************/
/*     UI COMPONENT QUERY TYPEDEF     */
/**************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        uiComponents: [UiComponent]
        uiComponent(id: ID!): UiComponent
    }
`;
/*******************************************/
/*       UI COMPONENT QUERY RESOLVER       */
/*******************************************/
exports.resolver = {
    Query: {
        uiComponents() {
            // TODO: Aqui deberia llamar a un Service o una Api donde contenga
            // cada unos de los Request alusivos a 'uiComponent', haciendo el
            // try, catch, el manejo de errores, parseando los datos que sean
            // necesarios, etc.
            return index_1.models.UiComponent.findAll();
        },
        uiComponent(root, { id }) {
            return index_1.models.UiComponent.findById(id);
        },
    },
    UiComponent: {
        // TODO: Investigar mas a fondo los types de apollo graph server para poder quitar este any
        colorPalette(uiComponent) {
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
//# sourceMappingURL=uiComponent.query.js.map