/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IAtom, IAtomAttributes } from './../../models/atom.model';
import * as error from './../../core/errorHandler/errors';


/************************************/
/*            INTERFACES            */
/************************************/
interface ICodeProps {
    code: string;
    libs?: Array<string>;
}

interface IAtomCodeProps {
    codeType: string;
    codeProps: ICodeProps;
}

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
    atomCode: Array<IAtomCodeProps> | null;
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
         * @param {IDuplicateAtomArgs} args - destructuring: atomId, userId, atomCode
         * @param {number} atomId - Atom id
         * @param {number} userId - User id
         * @param {Array<IAtomCodeProperties>} atomCode - New Atom source code
         * @returns {Status} Atom entity
         */

        duplicateAtom(parent: any, { atomId, userId, atomCode = null }: IDuplicateAtomArgs) {
            return models.Atom.findById(
                atomId
            )
            .then(
                (result) => {

                    // Build a new atom in order to create on database
                    let newAtom = _buildNewAtom(result.dataValues, userId, atomCode);

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

const _buildNewAtom = 
    (atom: IAtomAttributes, userId: number, atomCode: Array<IAtomCodeProps>): IAtomAttributes => {

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

const _extractCode = 
    (type: string, atomCode: Array<IAtomCodeProps>): string => {
    
    let code = null;
    
    if (!atomCode) { return code; }

    atomCode.forEach(atomCodeObj => {
        if (atomCodeObj.codeType === type) {
            code = atomCodeObj.codeProps.code;
        }
    });

    return code;

};