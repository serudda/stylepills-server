"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./../../core/utils/logger");
const index_1 = require("./../../models/index");
/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
exports.typeDef = `

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
         * @param {Array<IColor>} colorPalette - Color palette of the project
         * @param {boolean} private - the project is private or not
         * @param {number} projectCategoryId - the project category
         * @returns {Bluebird<IStatus>} status response (OK or Error)
         */
        createProject(parent, { input }) {
            // LOG
            logger_1.logger.log('info', 'Mutation: createProject');
            return index_1.models.Project.create(input, {
                include: [{ model: index_1.models.Color, as: 'ColorPalette' }]
            })
                .then(() => {
                return {
                    ok: true,
                    message: 'created successfull!'
                };
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
//# sourceMappingURL=project.mutation.js.map