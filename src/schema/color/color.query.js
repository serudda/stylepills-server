"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
const logger_1 = require("./../../core/utils/logger");
/**************************************/
/*   PROJECT CATEGORY QUERY TYPEDEF   */
/**************************************/
exports.typeDef = `
    extend type Query {
        colorById(id: ID!): Color!
    }
`;
/*******************************************/
/*      PROJECT CATEGORY QUERY RESOLVER    */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get Color by Id
         * @method Method colorById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IColorArgs} args - destructuring: id
         * @param {number} id - Color id
         * @returns {IColor} Color entity
         */
        colorById(parent, { id }) {
            // LOG
            logger_1.logger.log('info', 'Query: colorById');
            return index_1.models.Color.findById(id);
        }
    },
    Color: {
        rgba(color) {
            // LOG
            logger_1.logger.log('info', 'Query (Color): getRgba');
            return color.getRgba();
        }
    }
};
//# sourceMappingURL=color.query.js.map