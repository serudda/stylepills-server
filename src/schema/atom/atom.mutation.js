"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************/
/*            DEPENDENCIES            */
/**************************************/
const index_1 = require("./../../models/index");
const error = require("./../../core/errorHandler/errors");
// TODO: Asignar una descripcion y mover al lugar adecuado
function buildNewAtom(atom, userId) {
    return {
        name: atom.name,
        html: atom.html,
        css: atom.css,
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
}
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

    duplicateAtom(atomId: ID!, userId: ID!): Status!

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
         * @param {IAtomQueryArgs} args - destructuring: id
         * @param {number} id - Atom id
         * @returns {Status} Atom entity
         */
        duplicateAtom(parent, { atomId, userId }) {
            return index_1.models.Atom.findById(atomId)
                .then((result) => {
                // Build a new atom in order to create on database
                let newAtom = buildNewAtom(result.dataValues, userId);
                return index_1.models.Atom.create(newAtom)
                    .then(() => {
                    return {
                        ok: true,
                        message: 'duplicated successfull!'
                    };
                }).catch((err) => {
                    throw new error.UnknownError({
                        data: {
                            ok: false
                        }
                    });
                });
            }).catch((err) => {
                throw new error.UnknownError({
                    data: {
                        ok: false
                    }
                });
            });
        }
    },
};
//# sourceMappingURL=atom.mutation.js.map