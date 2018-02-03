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
interface ILibQueryStatusResponse extends IStatus {
    id?: number;
    results: Array<ILibInstance>;
}

interface ILibArgs {
    id: number;
    projectId: number | null;
}


/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/

export const typeDef = `

    # Status

    type LibQueryStatusResponse {
        id: ID
        ok: Boolean!,
        results: [Lib]
    }
    extend type Query {
        libById(id: ID!): Lib!
        getLibsByProjectId(projectId: ID!): LibQueryStatusResponse!
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

            // If projectId is null
            if (projectId === null) {
                let response: ILibQueryStatusResponse = {
                    ok: false,
                    results: null
                };
                
                return response;
            }

            // Get all libs based on the project Id
            return models.Lib.findAll({
                where: {
                    active: true,
                    projectId
                }
            }).then(
                (result: Array<ILibInstance>) => {
                    
                    const ERROR_MESSAGE = 'Query: getLibsByProjectId TODO: Identify error';
                    
                    let response: ILibQueryStatusResponse = {
                        ok: false,
                        results: null
                    };

                    // Returned data
                    if (result.length > 0) {
                        response = {
                            ok: true,
                            results: result
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
                    logger.log('error', 'Query: getLibsByProjectId', { err });

                    return {
                        ok: false,
                        results: null
                    };
                }
            );
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