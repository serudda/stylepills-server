/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IAtom } from './../../models/atom.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface ICreateAtomArgs {
    input: IAtom;
}


/*****************************************/
/*         UI COMPONENT MUTATION         */
/*****************************************/
// TODO: Asignar las propiedades reales
export const typeDef = `

# Input
input CreateAtomInput {
    name: String 
    css: String
    html: String
    background: String
    download: String
}

# Mutations
extend type Mutation {
    createAtom(input: CreateAtomInput!): Atom
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