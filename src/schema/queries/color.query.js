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
        getAllColors: [Color]
        getColorById(id: ID!): Color
    }
`;
exports.resolver = {
    Query: {
        getAllColors(root, args) {
            return index_1.models.Color.findAll();
        },
        getColorById(root, args) {
            return index_1.models.Color.findById(args.id);
        },
    }
};
//# sourceMappingURL=color.query.js.map