"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const Promise = require("bluebird");
const logger_1 = require("./../../core/utils/logger");
const atom_1 = require("./../../core/validations/atom");
const index_1 = require("./../../models/index");
const atom_model_1 = require("./../../models/atom.model");
/*****************************************/
/*                MUTATION               */
/*****************************************/
exports.typeDef = `

# Status

type ValidationAtomError {
    authorId: String
    name: String
    html: String
    css: String 
    contextualBg: String
    projectId: String
    atomCategoryId: String
    private: String
}

type AtomStatusResponse {
    id: ID
    ok: Boolean!,
    message: String
    validationErrors: ValidationAtomError
}


# Input

input CodeProps {
    code: String!
    libs: [String]
}

input AtomCodeProps {
    codeType: String!
    codeProps: CodeProps!
}

input CreateAtomInput {
    authorId: ID!
    ownerId: ID
    name: String! 
    description: String
    css: String
    html: String
    libs: [LibInput]
    private: Boolean!
    contextualBg: String
    atomCategoryId: Int
    projectId: Int
}

input DuplicateAtomInput {
    atomId: ID!
    userId: ID!
    atomCode: [AtomCodeProps]
}


# Mutations
extend type Mutation {

    createAtom(input: CreateAtomInput!): AtomStatusResponse!

    duplicateAtom(input: DuplicateAtomInput!): AtomStatusResponse!

    activeAtom(
        id: ID!
    ): AtomStatusResponse!

    deactivateAtom(
        id: ID!
    ): AtomStatusResponse!

}

`;
exports.resolver = {
    Mutation: {
        /**
         * @desc Create Atom
         * @method Method createAtom
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {ICreateAtomArgs} args - destructuring: input
         * @param {ICreateAtomInput} input - destructuring: authorId, name, css, html,
         * contextualBg, download, private, atomCategoryId
         * @param {number} authorId - Author id
         * @param {string} name - Atom name
         * @param {string} description - Atom description
         * @param {string} css - Atom css
         * @param {string} html - Atom html
         * @param {Array<ILibModel>} libs - External Libs of the project
         * @param {string} contextualBg - Atom contextual background
         * @param {boolean} private - the atom is private or not
         * @param {number} atomCategoryId - the atom category
         * @param {number} projectId - project id
         * @returns {Promise<IAtomStatusResponse>} status response (OK or Error)
         */
        createAtom(parent, { input }) {
            // LOG
            logger_1.logger.log('info', 'Mutation: createAtom');
            // Validate each input field
            const { errors, isValid } = atom_1.validateFields(input);
            if (isValid) {
                // Assign user as the owner
                input.ownerId = input.authorId;
                // TODO: Remove when you implement generate download links
                input.download = 'none';
                // Validate if atom category id is equal to 0                
                const RADIX = 10;
                if (typeof input.atomCategoryId === 'string' &&
                    input.atomCategoryId !== null) {
                    input.atomCategoryId = parseInt(input.atomCategoryId, RADIX);
                }
                if (input.atomCategoryId === 0) {
                    input.atomCategoryId = null;
                }
                // Save the new Atom on DB
                return index_1.models.Atom.create(input, {
                    include: [
                        {
                            model: index_1.models.Lib,
                            as: 'libs'
                        }
                    ]
                })
                    .then((result) => {
                    const ERROR_MESSAGE = 'Mutation: createAtom TODO: Identify error';
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
                    logger_1.logger.log('error', 'Mutation: createAtom', { err });
                    return {
                        ok: false,
                        message: err
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
        },
        /**
         * @desc Duplicate Atom
         * @method Method duplicateAtom
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IDuplicateAtomArgs} args - destructuring: atomId, userId, atomCode
         * @param {number} atomId - Atom id
         * @param {number} userId - User id
         * @param {Array<IAtomCodeProperties>} atomCode - New Atom source code
         * @returns {Promise<IStatus>} Atom entity
         */
        duplicateAtom(parent, { input }) {
            const { atomId, userId, atomCode = null } = input;
            // LOG
            logger_1.logger.log('info', 'Mutation: duplicateAtom');
            return index_1.models.Atom.findById(atomId, {
                include: [
                    {
                        model: index_1.models.Lib,
                        as: 'libs'
                    }
                ]
            })
                .then((res) => {
                // Build a new atom in order to create on database
                let newAtom = atom_model_1.buildNewAtom(res.dataValues, userId, atomCode);
                return index_1.models.Atom.create(newAtom, {
                    include: [
                        {
                            model: index_1.models.Lib,
                            as: 'libs'
                        }
                    ]
                })
                    .then((result) => {
                    const ERROR_MESSAGE = 'Mutation: duplicateAtom TODO: Identify error';
                    let response = {
                        ok: false
                    };
                    if (result.dataValues) {
                        response = {
                            ok: true,
                            id: result.dataValues.id,
                            message: 'duplicated successfull!'
                        };
                    }
                    else {
                        // LOG
                        logger_1.logger.log('error', ERROR_MESSAGE, result);
                    }
                    return response;
                }).catch((err) => {
                    // LOG
                    logger_1.logger.log('error', 'Mutation: duplicateAtom', { err });
                    return {
                        ok: false,
                        message: err
                    };
                });
            }).catch((err) => {
                // LOG
                logger_1.logger.log('error', 'Mutation: duplicateAtom', { err });
                return {
                    ok: false
                };
            });
        }
    },
};
//# sourceMappingURL=atom.mutation.js.map