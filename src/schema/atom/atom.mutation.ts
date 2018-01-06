/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import * as Bluebird from 'bluebird';
import { logger } from './../../core/utils/logger';

import { models } from './../../models/index';

import { IStatus } from './../../core/interfaces/interfaces';
import { IAtom, IAtomAttributes } from './../../models/atom.model';


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

interface ICreateAtomInput {
    authorId: number;
    name: string;
    css: string;
    html: string;
    contextualBg: string;
    download: string;
    private: boolean;
    atomCategoryId: number;
}

interface ICreateAtomArgs {
    input: ICreateAtomInput;
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
         * @param {string} css - Atom css
         * @param {string} html - Atom html
         * @param {string} contextualBg - Atom contextual background
         * @param {download} download - download atom url
         * @param {boolean} private - the atom is private or not
         * @param {number} atomCategoryId - the atom category
         * @returns {Bluebird<IStatus>} status response (OK or Error)
         */

        createAtom(parent: any, { input }: ICreateAtomArgs): Bluebird<IStatus> {

            // LOG
            logger.log('info', 'Mutation: createAtom');
            
            return models.Atom.create(input)
            .then(
                (result) => {
                    return {
                        ok: true,
                        message: 'created successful'
                    };
                }
            ).catch(
                (err) => {

                    // LOG
                    logger.log('error', 'Mutation: createAtom', { err });

                    return {
                        ok: false
                    };
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
         * @returns {Bluebird<IStatus>} Atom entity
         */

        duplicateAtom(parent: any, { atomId, userId, atomCode = null }: IDuplicateAtomArgs): Bluebird<IStatus> {

            // LOG
            logger.log('info', 'Mutation: duplicateAtom');

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

                            // LOG
                            logger.log('error', 'Mutation: duplicateAtom', { err });

                            return {
                                ok: false
                            };
                        }
                    );
                }
            ).catch(
                (err) => {

                    // LOG
                    logger.log('error', 'Mutation: duplicateAtom', { err });

                    return {
                        ok: false
                    };
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
        download: atom.download,
        active: true,
        private: false,
        duplicated: true,
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