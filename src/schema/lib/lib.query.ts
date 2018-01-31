/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';


/************************************/
/*            INTERFACES            */
/************************************/    
interface ILibArgs {
    id: number;
}


/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/

export const typeDef = `
    extend type Query {
        libById(id: ID!): Lib!
    }
`;


/*******************************************/
/*               QUERY RESOLVER            */
/*******************************************/

export const resolver = {
    Query: {
        
        /**
         * @desc Get Lib by Id
         * @method Method libById
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {ILibArgs} args - destructuring: id
         * @param {number} id - Lib id
         * @returns {ILib} Lib entity
         */
        libById(parent: any, { id }: ILibArgs) {
            // LOG
            logger.log('info', 'Query: libById');
            return models.Lib.findById(id);
        }

    }
};