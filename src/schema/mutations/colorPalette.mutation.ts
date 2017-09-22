/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IColorPalette } from './../../models/colorPalette.model';


/************************************/
/*            INTERFACES            */
/************************************/

/* NOTE: Todavia hay un lio aqui, ya que como no se muy bien como funciona 
    el create mutation, no se que argumentos pasarles, ademas si tiene objetos
    anidados como los manejo, le paso el objeto anidado? o lanzo la mutation del
    objeto anidado?*/

interface ICreateColorPaletteArgs {
    input: IColorPalette;
}


/************************************************/
/*        COLOR PALETTE MUTATION TYPEDEF        */
/************************************************/

export const typeDef = `

# Input
input CreateColorPaletteInput {
    category: String,
    description: String,
    colors: [CreateColorInput]
}

# Mutations
extend type Mutation {
    createColorPalette(input: CreateColorPaletteInput!): ColorPalette
}

`;


/************************************************/
/*       COLOR PALETTE MUTATION RESOLVER        */
/************************************************/

export const resolver = {
    Mutation: {
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipos
        createColorPalette(root: any, args: ICreateColorPaletteArgs) {
            return models.ColorPalette.create({
                category: args.input.category,
                description: args.input.description
            });
        },
    },
};