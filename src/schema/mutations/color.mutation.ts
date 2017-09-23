/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IColor } from './../../models/color.model';


/************************************/
/*            INTERFACES            */
/************************************/
    
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
        addColor(root: any, args: ICreateColorArgs) {
            return models.Color.create({
                label: args.input.label,
                hex: args.input.hex 
            });
        },
    },
};