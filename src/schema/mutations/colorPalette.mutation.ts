/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';


/****************************************/
/*            COLOR MUTATION            */
/****************************************/

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

export const resolver = {
  Mutation: {
    createColorPalette(root: any, args: any) {
        return models.ColorPalette.create({
            category: args.input.category,
            description: args.input.description
        });
    },
  },
};