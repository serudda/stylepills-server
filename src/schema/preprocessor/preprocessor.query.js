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
        preprocessorsByProjectId(projectId: ID!): [Preprocessor!]
        allPreprocessors: [Preprocessor!]!
        preprocessorById(id: ID!): Preprocessor!
    }
`;
/*******************************************/
/*               QUERY RESOLVER            */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get all Preprocessors
         * @method Method allPreprocessors
         * @public
         * @returns {Array<IPreprocessor>} Preprocessors list
         */
        allPreprocessors() {
            // LOG
            logger_1.logger.log('info', 'Query: allPreprocessors');
            return index_1.models.Preprocessor.findAll({
                where: {
                    active: true
                }
            });
        },
        /**
         * @desc Get Preprocessors by Project id
         * @method Method preprocessorsByProjectId
         * @public
         * @returns {Array<IPreprocessor>} Preprocessors list
         */
        preprocessorsByProjectId(parent, { projectId }) {
            // LOG
            logger_1.logger.log('info', 'Query: preprocessorsByProjectId');
            return index_1.models.Preprocessor.findAll({
                include: [{
                        model: index_1.models.Project,
                        where: { id: projectId }
                    }],
                where: {
                    active: true
                }
            });
        },
        /**
         * @desc Get Preprocessors by id
         * @method Method preprocessorById
         * @public
         * @param {IPreprocessorQueryArgs} args - destructuring: id
         * @param {number} id - Preprocessor id
         * @returns {IPreprocessor} Preprocessor
         */
        preprocessorById(parent, { id }) {
            // LOG
            logger_1.logger.log('info', 'Query: preprocessorById');
            return index_1.models.Preprocessor.findById(id);
        }
    }
};
//# sourceMappingURL=preprocessor.query.js.map