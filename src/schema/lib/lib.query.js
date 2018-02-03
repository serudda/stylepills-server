"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
const logger_1 = require("./../../core/utils/logger");
/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/
exports.typeDef = `
    extend type Query {
        libById(id: ID!): Lib!
    }
`;
/*******************************************/
/*               QUERY RESOLVER            */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get Lib by Id
         * @method Method libById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {ILibArgs} args - destructuring: id
         * @param {number} id - Lib id
         * @returns {ILib} Lib entity
         */
        libById(parent, { id }) {
            // LOG
            logger_1.logger.log('info', 'Query: libById');
            return index_1.models.Lib.findById(id);
        }
    },
    Lib: {
        atom(lib) {
            // LOG
            logger_1.logger.log('info', 'Query: (Lib) getAtom');
            return lib.getAtom();
        },
        project(lib) {
            // LOG
            logger_1.logger.log('info', 'Query: (Lib) getProject');
            return lib.getProject();
        }
    }
};
//# sourceMappingURL=lib.query.js.map