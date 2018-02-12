/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';

import { IStatus } from './../../core/interfaces/interfaces';
import { 
    IPreprocessorInstance, 
    IPreprocessor 
} from './../../models/preprocessor.model';


/************************************/
/*            INTERFACES            */
/************************************/    

/**
 * Arguments passed to Preprocessor queries
 */
interface IPreprocessorQueryArgs {
    atomId: number;
    projectId: number;
}


/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/

export const typeDef = `
    extend type Query {
        allPreprocessors: [Preprocessor!]!
        preprocessorsByProjectId(projectId: ID!): [Preprocessor!]
    }
`;


/*******************************************/
/*               QUERY RESOLVER            */
/*******************************************/

export const resolver = {
    Query: {

        /**
         * @desc Get all Preprocessors
         * @method Method allPreprocessors
         * @public
         * @returns {Array<IPreprocessor>} Preprocessors list
         */
        allPreprocessors() {
            // LOG
            logger.log('info', 'Query: allPreprocessors');
            return models.Preprocessor.findAll({
                where: {
                    active: true
                }, raw: true
            });
        },


        /**
         * @desc Get Preprocessors by Project id
         * @method Method getPreprocessors by Project id
         * @public
         * @returns {Array<IPreprocessor>} Preprocessors list
         */
        preprocessorsByProjectId(parent: any, { projectId }: IPreprocessorQueryArgs) {
            // LOG
            logger.log('info', 'Query: preprocessorsByProjectId');
            return models.Preprocessor.findAll({
                include: [{
                    model: models.Project,
                    where: { id: projectId }
                }],
                where: {
                    active: true
                }, raw: true
            });
        }
    }
};