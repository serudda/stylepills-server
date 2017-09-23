/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IColorPalette } from './../../models/colorPalette.model';


/************************************/
/*            INTERFACES            */
/************************************/
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
        createColorPalette(root: any, args: ICreateColorPaletteArgs) {
            return models.ColorPalette.create({
                category: args.input.category,
                description: args.input.description
            });
        },
    },
};