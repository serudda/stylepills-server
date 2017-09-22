/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/

/* NOTE: Todavia hay un lio aqui, ya que como no se muy bien como funciona 
    el create mutation, no se que argumentos pasarles, ademas si tiene objetos
    anidados como los manejo, le paso el objeto anidado? o lanzo la mutation del
    objeto anidado?*/
    
interface IColorArgs {
    id: number;
}


/****************************************/
/*          COLOR QUERY TYPEDEF         */
/****************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        colors: [Color]
        color(id: ID!): Color
    }
`;


/****************************************/
/*         COLOR QUERY RESOLVER         */
/****************************************/

export const resolver = {
    Query: {
        colors() {
            return models.Color.findAll();
        },
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipos
        color(root: any, { id }: IColorArgs) {
            return models.Color.findById(id);
        },
    }
};


/* 

Queries:


query getColorById($colorId : ID!) {
    color(id: $colorId) {
        id
        hex
        label
        __typename
    }
}
*/