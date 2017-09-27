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


/*****************************************/
/*         UI COMPONENT MUTATION         */
/*****************************************/

export const typeDef = `

# Input
input CreateUiComponentInput {
    name: String
    colorPalette: [CreateColorPaletteInput]
    css: String
    scss: String
    html: String
    background: String
    download: String
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
                name: args.input.name,
                html: args.input.html,
                css: args.input.css,
                scss: args.input.scss,
                background: args.input.background,
                download: args.input.download
            });
        },
    },
};