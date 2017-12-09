/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IAtomCategoryArgs {
    id: number;
}


/**************************************/
/*     ATOM CATEGORY QUERY TYPEDEF    */
/**************************************/

export const typeDef = `
    extend type Query {
        atomCategoryById(id: ID!): AtomCategory!
        allAtomCategories: [AtomCategory!]!
    }
`;


/*******************************************/
/*       ATOM CATEGORY QUERY RESOLVER      */
/*******************************************/

export const resolver = {
    Query: {
        
        /**
         * @desc Get all Atom's categories
         * @method Method allAtomCategories
         * @public
         * @returns {Array<IAtomCategory>} Atom's categories list
         */
        allAtomCategories() {
            // LOG
            logger.log('info', 'Query: allAtomCategories');
            return models.AtomCategory.findAll({
                where: {
                    active: true
                }, raw: true
            });
        }
    },
    AtomCategory: {
        atoms(atomCategory: any) {
            // LOG
            logger.log('info', 'Query (AtomCategory): getAtoms');
            return atomCategory.getAtoms();
        }
    }
};