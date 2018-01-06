/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import * as Bluebird from 'bluebird';
import { logger } from './../../core/utils/logger';

import { models } from './../../models/index';

import { IStatus } from './../../core/interfaces/interfaces';
import { IProject, IProjectAttributes } from './../../models/project.model';
import { IColor } from './../../models/color.model';


/************************************/
/*            INTERFACES            */
/************************************/

interface ICreateProjectInput {
    authorId: number;
    name: string;
    website?: string;
    colorPalette: Array<IColor>;
    private: boolean;
    projectCategoryId: number;
}

interface ICreateProjectArgs {
    input: ICreateProjectInput;
}


/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
export const typeDef = `

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

export const resolver = {
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

        createProject(parent: any, { input }: ICreateProjectArgs): Bluebird<IStatus> {

            // LOG
            logger.log('info', 'Mutation: createProject');

            return models.Project.create(
                input,
                {
                    include: [ { model: models.Color, as: 'ColorPalette' } ]
                }
            )
            .then(
                () => {
                    return {
                        ok: true,
                        message: 'created successfull!'
                    };
                }
            ).catch(
                (err) => {
                    // LOG
                    logger.log('error', 'Mutation: createProject', { err });

                    return {
                        ok: false
                    };
                }
            );
        }
    },
};