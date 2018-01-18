/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IAtomCategory } from './../../models/atomCategory.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface ICreateAtomCategoryArgs {
    input: IAtomCategory;
}


/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
export const typeDef = `

# Input
input CreateAtomCategoryInput {
    name: String!
    description: String
}

# Mutations
extend type Mutation {

    createAtomCategory(input: CreateAtomCategoryInput!): AtomCategory!

    activeAtomCategory(
        id: ID!
    ): AtomCategory!

    deactivateAtomCategory(
        id: ID!
    ): AtomCategory!
    
}

`;

export const resolver = {
    Mutation: {
        createAtomCategory(root: any, args: ICreateAtomCategoryArgs) {
            return models.AtomCategory.create(args.input)
            .then(
                (result) => {
                    return result;
                }
            ).catch(
                (err) => {
                    return err;
                }
            );
        },
    },
};