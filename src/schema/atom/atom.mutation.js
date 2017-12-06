"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
const error = require("./../../core/errorHandler/errors");
/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
exports.typeDef = `
# Status
type Status {
    ok: Boolean!,
    message: String
}

# Input
input CodeProps {
    code: String!,
    libs: [String]
}

input AtomCodeProps {
    codeType: String!,
    codeProps: CodeProps!
}

input CreateAtomInput {
    name: String 
    css: String
    html: String
    contextualBg: String
    download: String
}

# Mutations
extend type Mutation {

    createAtom(input: CreateAtomInput!): Atom!

    duplicateAtom(atomId: ID!, userId: ID!, atomCode: [AtomCodeProps]): Status!

    activeAtom(
        id: ID!
    ): Atom!

    deactivateAtom(
        id: ID!
    ): Atom!

}

`;
exports.resolver = {
    Mutation: {
        createAtom(root, args) {
            return index_1.models.Atom.create(args.input)
                .then((result) => {
                return {
                    ok: true,
                    message: 'created successful'
                };
            }).catch((err) => {
                throw new error.UnknownError({
                    data: {
                        ok: false
                    }
                });
            });
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
         * @returns {Status} Atom entity
         */
        duplicateAtom(parent, { atomId, userId, atomCode = null }) {
            return index_1.models.Atom.findById(atomId)
                .then((result) => {
                // Build a new atom in order to create on database
                let newAtom = _buildNewAtom(result.dataValues, userId, atomCode);
                return index_1.models.Atom.create(newAtom)
                    .then(() => {
                    return {
                        ok: true,
                        message: 'duplicated successfull!'
                    };
                }).catch((err) => {
                    console.log(err);
                    throw new error.UnknownError({
                        data: {
                            ok: false,
                            message: err
                        }
                    });
                });
            }).catch((err) => {
                console.log(err);
                throw new error.UnknownError({
                    data: {
                        ok: false,
                        message: err
                    }
                });
            });
        }
    },
};
/*****************************************/
/*            EXTRA FUNCTIONS            */
/*****************************************/
/**
 * @desc Build New Atom Object
 * @function _buildNewAtom
 * @private
 * @param {IAtomAttributes} atom - Atom data object
 * @param {number} userId - owner id
 * @param {Array<IAtomCodeProps>} atomCode - New Atom source code
 * @returns {IAtomAttributes} New Atom data object
 */
const _buildNewAtom = (atom, userId, atomCode) => {
    const html = _extractCode('html', atomCode) || atom.html;
    const css = _extractCode('css', atomCode) || atom.css;
    return {
        name: atom.name,
        html,
        css,
        contextualBg: atom.contextualBg,
        stores: 0,
        views: 0,
        likes: 0,
        download: atom.download,
        active: true,
        private: false,
        authorId: atom.authorId,
        ownerId: userId,
        atomCategoryId: atom.atomCategoryId
    };
};
/**
 * @desc Extract new code
 * @function _extractCode
 * @private
 * @param {string} type - source code type (html, css, etc)
 * @param {Array<IAtomCodeProps>} atomCode - New Atom source code
 * @returns {any}
 */
const _extractCode = (type, atomCode) => {
    let code = null;
    if (!atomCode) {
        return code;
    }
    atomCode.forEach(atomCodeObj => {
        if (atomCodeObj.codeType === type) {
            code = atomCodeObj.codeProps.code;
        }
    });
    return code;
};
//# sourceMappingURL=atom.mutation.js.map