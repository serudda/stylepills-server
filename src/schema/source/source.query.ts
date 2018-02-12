/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';

import { IStatus } from './../../core/interfaces/interfaces';
import { 
    ISourceInstance, 
    ISource 
} from './../../models/source.model';


/************************************/
/*            INTERFACES            */
/************************************/    

/**
 * Arguments passed to Preprocessor queries
 */
interface ISourceQueryArgs {
    atomId: number;
    projectId: number;
}


/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/

export const typeDef = `
    extend type Query {
        sourcesByProjectId(projectId: ID!): [Source!]
    }
`;


/*******************************************/
/*               QUERY RESOLVER            */
/*******************************************/

export const resolver = {
    Query: {

        /**
         * @desc Get Sources by Project id
         * @method Method sourcesByProjectId
         * @public
         * @returns {Array<ISource>} Sources list by project id
         */
        sourcesByProjectId(parent: any, { projectId }: ISourceQueryArgs) {
            // LOG
            logger.log('info', 'Query: sourcesByProjectId');
            return models.Source.findAll({
                include: [{
                    model: models.Project,
                    where: { id: projectId }
                }],
                where: {
                    active: true
                }
            });
        }

    },
    Source: {
        preprocessor(source: any) {
            // LOG
            logger.log('info', 'Query (Project): getPreprocessor');
            return source.getPreprocessor();
        }
    }
};