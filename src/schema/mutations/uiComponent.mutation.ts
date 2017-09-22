/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IUiComponent } from './../../models/uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/

/* NOTE: Todavia hay un lio aqui, ya que como no se muy bien como funciona 
    el create mutation, no se que argumentos pasarles, ademas si tiene objetos
    anidados como los manejo, le paso el objeto anidado? o lanzo la mutation del
    objeto anidado?*/

interface ICreateUiComponentArgs {
    input: IUiComponent;
}


/****************************************/
/*            COLOR MUTATION            */
/****************************************/

export const typeDef = `

# Input
input CreateUiComponentInput {
    title: String
    colorPalette: [CreateColorPaletteInput]
    css: String
    scss: String
    html: String
}

# Mutations
extend type Mutation {
    createUiComponent(input: CreateUiComponentInput!): UiComponent
}

`;

export const resolver = {
    Mutation: {
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipos
        createUiComponent(root: any, args: ICreateUiComponentArgs) {
            return models.UiComponent.create({
                title: args.input.title,
                html: args.input.html,
                css: args.input.css,
                scss: args.input.scss
            });
        },
    },
};