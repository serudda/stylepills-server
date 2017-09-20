"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
/*************************************/
/*            COLOR QUERY            */
/*************************************/
exports.typeDef = `
    # Root Query
    extend type Query {
        uiComponents: [UiComponent]
        uiComponent(id: ID!): UiComponent
    }
`;
exports.resolver = {
    Query: {
        uiComponents(root, args) {
            // TODO: Aqui deberia llamar a un Service o una Api donde contenga
            // cada unos de los Request alusivos a 'uiComponent', haciendo el
            // try, catch, el manejo de errores, parseando los datos que sean
            // necesarios, etc.
            return index_1.models.UiComponent.findAll();
        },
        uiComponent(root, args) {
            return index_1.models.UiComponent.findById(args.id);
        },
    },
    UiComponent: {
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