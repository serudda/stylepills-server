/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';


/****************************************/
/*            COLOR MUTATION            */
/****************************************/

export const typeDef = `

# Input
input CreateColorInput {
    label: String
    hex: String
}

# Mutations
type Mutation {
    addColor(input: CreateColorInput!): Color
}

`;

export const resolver = {
  Mutation: {
    addColor(root: any, args: any) {
        return models.Color.create({
            label: args.input.label,
            hex: args.input.hex 
        });
    },
  },
};