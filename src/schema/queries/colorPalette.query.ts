import { IColorPalette } from './../../models/colorPalette.model';
/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/************************************/
/*            INTERFACES            */
/************************************/

/* NOTE: Todavia hay un lio aqui, ya que como no se muy bien como funciona 
    el create mutation, no se que argumentos pasarles, ademas si tiene objetos
    anidados como los manejo, le paso el objeto anidado? o lanzo la mutation del
    objeto anidado?*/
    
interface IColorPaletteArgs {
    id: number;
}


/**************************************/
/*     COLOR PALETTE QUERY TYPEDEF    */
/**************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        colorPalettes: [ColorPalette]
        colorPalette(id: ID!): ColorPalette
    }
`;


/********************************************/
/*       COLOR PALETTE QUERY RESOLVER       */
/********************************************/

export const resolver = {
    Query: {
        colorPalettes() {
            return models.ColorPalette.findAll();
        },
        // NOTE: Cuando sepa bien como funciona el 'root' asignarle un tipos
        colorPalette(root: any, { id }: IColorPaletteArgs) {
            return models.ColorPalette.findById(id);
        },
    },
    ColorPalette: {
        // TODO: Investigar mas a fondo los types de apollo graph server para poder quitar este any
        colors(colorPalette: any) {
            return colorPalette.getColor();
        },
    },
};



/* 

Queries:


query getColorPaletteById($colorPaletteId : ID!) {
    colorPalette(id: $colorPaletteId) {
        id
        colors {
            id
            hex
            label
            __typename
        }
        category
        description
        __typename
    }
}

*/