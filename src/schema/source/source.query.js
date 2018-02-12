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
        sourcesByProjectId(projectId: ID!): [Source!]
    }
`;
/*******************************************/
/*               QUERY RESOLVER            */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get Sources by Project id
         * @method Method sourcesByProjectId
         * @public
         * @returns {Array<ISource>} Sources list by project id
         */
        sourcesByProjectId(parent, { projectId }) {
            // LOG
            logger_1.logger.log('info', 'Query: sourcesByProjectId');
            return index_1.models.Source.findAll({
                include: [{
                        model: index_1.models.Project,
                        where: { id: projectId }
                    }],
                where: {
                    active: true
                }
            });
        }
    },
    Source: {
        preprocessor(source) {
            // LOG
            logger_1.logger.log('info', 'Query (Project): getPreprocessor');
            return source.getPreprocessor();
        }
    }
};
//# sourceMappingURL=source.query.js.map