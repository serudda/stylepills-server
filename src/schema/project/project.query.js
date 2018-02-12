"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../models/index");
const appConfig = require("./../../core/constants/app.constants");
const logger_1 = require("./../../core/utils/logger");
/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/
exports.typeDef = `

    extend type Query {
        projectById(id: ID!): Project!
        projectsByUserId(userId: ID!): [Project!]!
        allProjects(limit: Int): [Project!]!
    }

`;
/*******************************************/
/*              QUERY RESOLVER             */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get Project by Id
         * @method Method projectById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IProjectQueryArgs} args - destructuring: id
         * @param {number} id - Project id
         * @returns {IProject} Project entity
         */
        projectById(parent, { id }) {
            // LOG
            logger_1.logger.log('info', 'Query: projectById');
            return index_1.models.Project.findById(id);
        },
        /**
         * @desc Get Projects by User Id
         * @method Method projectsByUserId
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IProjectQueryArgs} args - destructuring: userId
         * @returns {Array<IProject>} Projects List of a specific user
         */
        projectsByUserId(parent, { userId }) {
            // LOG
            logger_1.logger.log('info', 'Query: projectsByUserId');
            return index_1.models.Project.findAll({
                where: {
                    active: true,
                    authorId: userId
                }
            });
        },
        /**
         * @desc Get all Projects
         * @method Method allProjects
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IProjectQueryArgs} args - destructuring: limit
         * @param {Int} limit - limit number of results returned
         * @returns {Array<IProject>} Projects list
         */
        allProjects(parent, { limit = appConfig.ATOM_SEARCH_LIMIT }) {
            // LOG
            logger_1.logger.log('info', 'Query: allProjects');
            return index_1.models.Project.findAll({
                limit,
                where: {
                    active: true
                }
            });
        },
    },
    Project: {
        atoms(project) {
            // LOG
            logger_1.logger.log('info', 'Query (Project): getAtoms');
            return project.getAtoms();
        },
        colorPalette(project) {
            // LOG
            logger_1.logger.log('info', 'Query (Project): getColorPalette');
            return project.getColorPalette();
        },
        libs(project) {
            // LOG
            logger_1.logger.log('info', 'Query (Project): getLibs');
            return project.getLibs();
        },
        preprocessors(project) {
            // LOG
            logger_1.logger.log('info', 'Query (Project): getPreprocessors');
            return project.getPreprocessors();
        },
        sources(project) {
            // LOG
            logger_1.logger.log('info', 'Query (Project): getSources');
            return project.getSources();
        },
        author(project) {
            // LOG
            logger_1.logger.log('info', 'Query: (Project) getAuthor');
            return project.getAuthor();
        },
        category(project) {
            // LOG
            logger_1.logger.log('info', 'Query: (Project) getProjectCategory');
            return project.getProjectCategory();
        }
    }
};
//# sourceMappingURL=project.query.js.map