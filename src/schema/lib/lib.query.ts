/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';
import { logger } from './../../core/utils/logger';

import { IStatus } from './../../core/interfaces/interfaces';
import { ILibInstance, ILib } from './../../models/lib.model';


/************************************/
/*            INTERFACES            */
/************************************/    

interface ILibArgs {
    id: number;
    projectId: number | null;
}


/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/

export const typeDef = `
    extend type Query {
        libById(id: ID!): Lib!
        getLibsByProjectId(projectId: ID!): [Lib]
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
        },


        /**
         * @desc Get Libs by Project Id
         * @method Method getLibsByProjectId
         * @public
         * @param {any} parent - TODO: Investigar un poco más estos parametros
         * @param {ILibArgs} args - destructuring: projectId
         * @returns {Array<ILib>} basic Projects List of a specific user
         */
        getLibsByProjectId(
            parent: any, 
            { projectId }: ILibArgs
        ) {
            // LOG
            logger.log('info', 'Query: getLibsByProjectId');

            return models.Lib.findAll({
                where: {
                    active: true,
                    projectId
                }
            });
        },

    },
    Lib: {
        atom(lib: any) {
            // LOG
            logger.log('info', 'Query: (Lib) getAtom');
            return lib.getAtom();
        },
        project(lib: any) {
            // LOG
            logger.log('info', 'Query: (Lib) getProject');
            return lib.getProject();
        }
    }
};