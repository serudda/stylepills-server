/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import * as Promise from 'bluebird';
import { logger } from './../../core/utils/logger';

import { 
    validateFields, 
    IValidationError as IValidationProjectError 
} from './../../core/validations/project';
import { functionsUtil } from './../../core/utils/functionsUtil';
import { models } from './../../models/index';

import { IStatus } from './../../core/interfaces/interfaces';
import { IProject, IProjectAttributes, IProjectInstance } from './../../models/project.model';
import { IColor as IColorModel } from './../../models/color.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface IProjectStatus extends IStatus {
    id?: number;
    validationErrors?: IValidationProjectError;
}

interface ICreateProjectInput {
    authorId: number;
    name: string;
    website?: string;
    description?: string;
    colorPalette: Array<IColorModel>;
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
         * @param {string} description - Project description
         * @param {Array<IColorModel>} colorPalette - Color palette of the project
         * @param {boolean} private - the project is private or not
         * @param {number} projectCategoryId - the project category
         * @returns {Bluebird<IStatus>} status response (OK or Error)
         */

        createProject(parent: any, { input }: ICreateProjectArgs): Promise<IProjectStatus> {

            // LOG
            logger.log('info', 'Mutation: createProject');

            // Validate each input field
            const { errors, isValid } = validateFields(input);

            if (isValid) {

                return models.Project.create(
                    input,
                    {
                        include: [{
                            model: models.Color,
                            as: 'colorPalette',
                            include: [ { 
                                model: models.RgbaColor,
                                as: 'rgba'
                            }]
                        }]
                    }
                )
                .then(
                    (result: IProjectInstance) => {
                        
                        const ERROR_MESSAGE = 'Mutation: createProject TODO: Identify error';
                        
                        let response: IProjectStatus = {
                            ok: false
                        };
    
                        if (result.dataValues) {
                            response = {
                                ok: true,
                                id: result.dataValues.id,
                                message: 'created successfull!'
                            };
                        } else {
                            // LOG
                            logger.log('error', ERROR_MESSAGE, result);
                        }
    
                        return response;
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
                
            } else {
                return Promise.resolve()
                .then(
                    () => {

                        return {
                            ok: false,
                            validationErrors: errors
                        };
                    }
                );
            }

        }
    },
};