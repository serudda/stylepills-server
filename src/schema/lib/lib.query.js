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

    # Status

    type LibQueryStatusResponse {
        id: ID
        ok: Boolean!,
        results: [Lib]
    }
    extend type Query {
        libById(id: ID!): Lib!
        getLibsByProjectId(projectId: ID!): LibQueryStatusResponse!
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
        },
        /**
         * @desc Get Libs by Project Id
         * @method Method getLibsByProjectId
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {ILibArgs} args - destructuring: projectId
         * @returns {Array<ILib>} basic Projects List of a specific user
         */
        getLibsByProjectId(parent, { projectId }) {
            // LOG
            logger_1.logger.log('info', 'Query: getLibsByProjectId');
            // If projectId is null
            if (projectId === null) {
                let response = {
                    ok: false,
                    results: null
                };
                return response;
            }
            // Get all libs based on the project Id
            return index_1.models.Lib.findAll({
                where: {
                    active: true,
                    projectId
                }
            }).then((result) => {
                const ERROR_MESSAGE = 'Query: getLibsByProjectId TODO: Identify error';
                let response = {
                    ok: false,
                    results: null
                };
                // Returned data
                if (result.length > 0) {
                    response = {
                        ok: true,
                        results: result
                    };
                }
                else {
                    // LOG
                    logger_1.logger.log('error', ERROR_MESSAGE, result);
                }
                return response;
            }).catch((err) => {
                // LOG
                logger_1.logger.log('error', 'Query: getLibsByProjectId', { err });
                return {
                    ok: false,
                    results: null
                };
            });
        },
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