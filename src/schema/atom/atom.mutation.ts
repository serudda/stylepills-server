/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IAtom, IAtomAttributes } from './../../models/atom.model';
import * as error from './../../core/errorHandler/errors';

// TODO: Asignar una descripcion y mover al lugar adecuado
function buildNewAtom(atom: IAtomAttributes, userId: number): IAtomAttributes {
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

/************************************/
/*            INTERFACES            */
/************************************/
/* TODO: Analizar muy bien la asignación de la Interface, ya que no estoy seguro como 
gestionar los objetos anidados (categoria, author, comments, etc) */

interface IStatus {
    ok: boolean;
    message?: string;
}

interface ICreateAtomArgs {
    /*input: IAtom;*/
    input: any;
}

interface IDuplicateAtomArgs {
    atomId: number;
    userId: number;
}


/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
export const typeDef = `
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

export const resolver = {
    Mutation: {
        createAtom(root: any, args: ICreateAtomArgs) {
            return models.Atom.create(args.input)
            .then(
                (result) => {
                    return {
                        ok: true,
                        message: 'created successful'
                    };
                }
            ).catch(
                (err) => {
                    throw new error.UnknownError({
                        data: {
                            ok: false
                        }
                    });
                }
            );
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
        duplicateAtom(parent: any, { atomId, userId }: IDuplicateAtomArgs) {
            return models.Atom.findById(
                atomId
            )
            .then(
                (result) => {

                    // Build a new atom in order to create on database
                    let newAtom = buildNewAtom(result.dataValues, userId);

                    return models.Atom.create(
                        newAtom
                    )
                    .then(
                        () => {
                            return {
                                ok: true,
                                message: 'duplicated successfull!'
                            };
                        }
                    ).catch(
                        (err) => {
                            throw new error.UnknownError({
                                data: {
                                    ok: false
                                }
                            });
                        }
                    );
                }
            ).catch(
                (err) => {
                    throw new error.UnknownError({
                        data: {
                            ok: false
                        }
                    });
                }
            );
        }
    },
};