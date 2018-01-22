"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const Promise = require("bluebird");
const logger_1 = require("./../../core/utils/logger");
const project_1 = require("./../../core/validations/project");
const index_1 = require("./../../models/index");
/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
exports.typeDef = `

# Custom Status

type ValidationProjectError {
    authorId: String
    name: String
    website: String
    colorPalette: String
    projectCategoryId: String
    private: String
}

extend type Status {
    id: ID
    validationErrors: ValidationProjectError
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
         * @param {Array<IColorModel>} colorPalette - Color palette of the project
         * @param {boolean} private - the project is private or not
         * @param {number} projectCategoryId - the project category
         * @returns {Bluebird<IStatus>} status response (OK or Error)
         */
        createProject(parent, { input }) {
            // LOG
            logger_1.logger.log('info', 'Mutation: createProject');
            // Validate each input field
            const { errors, isValid } = project_1.validateFields(input);
            if (isValid) {
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
            else {
                return Promise.resolve()
                    .then(() => {
                    return {
                        ok: false,
                        validationErrors: errors
                    };
                });
            }
        }
    },
};
//# sourceMappingURL=project.mutation.js.map