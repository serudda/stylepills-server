/**************************************/
/*            DEPENDENCIES            */
/**************************************/
import { models } from './../../models/index';
import { IUiComponent } from './../../models/uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/
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