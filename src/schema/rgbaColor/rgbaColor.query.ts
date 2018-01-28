/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IRgbaColorArgs {
    id: number;
}


/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/

export const typeDef = `
    extend type Query {
        rgbaColorById(id: ID!): RgbaColor!
    }
`;


/*******************************************/
/*              QUERY RESOLVER             */
/*******************************************/

export const resolver = {
    Query: {
        
        /**
         * @desc Get RgbaColor by Id
         * @method Method rgbaColorById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {IColorArgs} args - destructuring: id
         * @param {number} id - RgbaColor id
         * @returns {IRgbaColor} RgbaColor entity
         */
        rgbaColorById(parent: any, { id }: IRgbaColorArgs) {
            // LOG
            logger.log('info', 'Query: rgbaColorById');
            return models.RgbaColor.findById(id);
        }

    }
};