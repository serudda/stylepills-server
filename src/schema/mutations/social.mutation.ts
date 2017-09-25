/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
// TODO: Analizar esta forma de ruta, no necesita navegador el proyecto,
// Analizar si funciona
import { ISocial } from 'models/social.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface ICreateSocialArgs {
    input: ISocial;
}


/*****************************************/
/*            SOCIAL MUTATION            */
/*****************************************/

export const typeDef = `

# Input
input CreateSocialInput {
    twitter: String
    facebook: String
    github: String
    linkedin: String
}

# Mutations
extend type Mutation {
    createSocial(input: CreateSocialInput!): Social
}

`;

export const resolver = {
    Mutation: {
        createSocial(root: any, args: ICreateSocialArgs) {
            return models.Social.create({
                twitter: args.input.twitter,
                facebook: args.input.facebook,
                github: args.input.github,
                linkedin: args.input.linkedin,
            });
        },
    },
};