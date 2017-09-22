/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IColor } from './../../models/color.model';


/************************************/
/*            INTERFACES            */
/************************************/

/* NOTE: Todavia hay un lio aqui, ya que como no se muy bien como funciona 
    el create mutation, no se que argumentos pasarles, ademas si tiene objetos
    anidados como los manejo, le paso el objeto anidado? o lanzo la mutation del
    objeto anidado?*/
    
interface ICreateColorArgs {
    input: IColor;
}


/****************************************/
/*        COLOR MUTATION TYPEDEF        */
/****************************************/

export const typeDef = `

# Input
input CreateColorInput {
    label: String
    hex: String
}

# Mutations
extend type Mutation {
    addColor(input: CreateColorInput!): Color
}

`;


/*****************************************/
/*        COLOR MUTATION RESOLVER        */
/*****************************************/

export const resolver = {
    Mutation: {
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipo
        addColor(root: any, args: ICreateColorArgs) {
            return models.Color.create({
                label: args.input.label,
                hex: args.input.hex 
            });
        },
    },
};