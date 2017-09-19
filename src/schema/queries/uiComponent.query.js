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
        getAllUiComponents: [UiComponent]
        getUiComponentById(id: ID!): UiComponent
    }
`;
exports.resolver = {
    Query: {
        getAllUiComponents(root, args) {
            return index_1.models.UiComponent.findAll();
        },
        getUiComponentById(root, args) {
            return index_1.models.UiComponent.findById(args.id);
        },
    },
};
//# sourceMappingURL=uiComponent.query.js.map