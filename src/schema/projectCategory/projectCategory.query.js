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
        allProjectCategories: [ProjectCategory!]!
    }
`;
/*******************************************/
/*      PROJECT CATEGORY QUERY RESOLVER    */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get all Project's categories
         * @method Method allProjectCategories
         * @public
         * @returns {Array<IProjectCategory>} Project's categories list
         */
        allProjectCategories() {
            // LOG
            logger_1.logger.log('info', 'Query: allProjectCategories');
            return index_1.models.ProjectCategory.findAll({
                where: {
                    active: true
                }, raw: true
            });
        }
    },
    ProjectCategory: {
        projects(projectCategory) {
            // LOG
            logger_1.logger.log('info', 'Query (ProjectCategory): getAtoms');
            return projectCategory.getProjects();
        }
    }
};
//# sourceMappingURL=projectCategory.query.js.map