/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IAtom } from './../../models/atom.model';


/************************************/
/*            INTERFACES            */
/************************************/
/* TODO: Analizar muy bien la asignación de la Interface, ya que no estoy seguro como 
gestionar los objetos anidados (categoria, author, comments, etc) */

interface ICreateAtomArgs {
    /*input: IAtom;*/
    input: any;
}


/*****************************************/
/*             ATOM MUTATION             */
/*****************************************/
export const typeDef = `

# Input
input CreateAtomInput {
    name: String 
    css: String
    html: String
    contextualBg: String
    download: String
}

# Mutations
extend type Mutation {

    createAtom(input: CreateAtomInput!): Atom!

    activeAtom(
        id: ID!
    ): Atom!

    deactivateAtom(
        id: ID!
    ): Atom!
}

`;

export const resolver = {
    Mutation: {
        createAtom(root: any, args: ICreateAtomArgs) {
            return models.Atom.create(args.input)
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