"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./../../core/utils/logger");
const functionsUtil_1 = require("./../../core/utils/functionsUtil");
const index_1 = require("./../../models/index");
/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
exports.typeDef = `

# Custom Status

extend type Status {
    id: ID
}

# Input

input RgbaColorInput {
    r: Int
    g: Int
    b: Int
    a: Int
}

input ColorInput {
    name: String!
    hex: String
    rgba: RgbaColorInput
    type: String
}

input CreateProjectInput {
    authorId: ID!
    name: String! 
    website: String
    description: String
    colorPalette: [ColorInput]
    private: Boolean!
    projectCategoryId: Int
}

# Mutations
extend type Mutation {

    createProject(input: CreateProjectInput!): Status!

    activeProject(
        id: ID!
    ): Status!

    deactivateProject(
        id: ID!
    ): Status!

}

`;
exports.resolver = {
    Mutation: {
        /**
         * @desc Create Project
         * @method Method createProject
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {ICreateProjectArgs} args - destructuring: input
         * @param {ICreateProjectInput} input - destructuring: userId, name,
         * website, colorPalette, private, projectCategoryId
         * @param {number} authorId - Author id
         * @param {string} name - Project name
         * @param {string} website - Project website
         * @param {string} description - Project description
         * @param {Array<IColor>} colorPalette - Color palette of the project
         * @param {boolean} private - the project is private or not
         * @param {number} projectCategoryId - the project category
         * @returns {Bluebird<IStatus>} status response (OK or Error)
         */
        createProject(parent, { input }) {
            // LOG
            logger_1.logger.log('info', 'Mutation: createProject');
            // NOTE: 1
            input = functionsUtil_1.functionsUtil.emptyStringsToNull(input);
            return index_1.models.Project.create(input, {
                include: [{
                        model: index_1.models.Color,
                        as: 'colorPalette',
                        include: [{
                                model: index_1.models.RgbaColor,
                                as: 'rgba'
                            }]
                    }]
            })
                .then((result) => {
                /* TODO: Me gusta esta implementación para los demás .then,
                    Si funciona bien, implementar en todo el proyecto.
                */
                const ERROR_MESSAGE = 'Mutation: createProject TODO: Identify error';
                let response = {
                    ok: false
                };
                if (result.dataValues) {
                    response = {
                        ok: true,
                        id: result.dataValues.id,
                        message: 'created successfull!'
                    };
                }
                else {
                    // LOG
                    logger_1.logger.log('error', ERROR_MESSAGE, result);
                }
                return response;
            }).catch((err) => {
                // LOG
                logger_1.logger.log('error', 'Mutation: createProject', { err });
                return {
                    ok: false
                };
            });
        }
    },
};
/*
(1) Parse empty values to NULL (If website is Empty)(issue reported on Sequelize server)
references: https://github.com/sequelize/sequelize/issues/3958
*/ 
//# sourceMappingURL=project.mutation.js.map