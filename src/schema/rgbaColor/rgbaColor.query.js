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
        rgbaColorById(id: ID!): RgbaColor!
    }
`;
/*******************************************/
/*      PROJECT CATEGORY QUERY RESOLVER    */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get RgbaColor by Id
         * @method Method rgbaColorById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IColorArgs} args - destructuring: id
         * @param {number} id - RgbaColor id
         * @returns {IRgbaColor} RgbaColor entity
         */
        rgbaColorById(parent, { id }) {
            // LOG
            logger_1.logger.log('info', 'Query: rgbaColorById');
            return index_1.models.RgbaColor.findById(id);
        }
    }
};
//# sourceMappingURL=rgbaColor.query.js.map