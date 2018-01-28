/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IProjectCategoryArgs {
    id: number;
}


/**************************************/
/*           QUERY TYPEDEF            */
/**************************************/

export const typeDef = `
    extend type Query {
        allProjectCategories: [ProjectCategory!]!
    }
`;


/*******************************************/
/*             QUERY RESOLVER              */
/*******************************************/

export const resolver = {
    Query: {
        
        /**
         * @desc Get all Project's categories
         * @method Method allProjectCategories
         * @public
         * @returns {Array<IProjectCategory>} Project's categories list
         */
        allProjectCategories() {
            // LOG
            logger.log('info', 'Query: allProjectCategories');
            return models.ProjectCategory.findAll({
                where: {
                    active: true
                }, raw: true
            });
        }
    },
    ProjectCategory: {
        projects(projectCategory: any) {
            // LOG
            logger.log('info', 'Query (ProjectCategory): getAtoms');
            return projectCategory.getProjects();
        }
    }
};