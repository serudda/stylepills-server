/************************************/
/*           DEPENDENCIES           */
/************************************/
import { models, sequelize } from './../../models/index';


/*************************************/
/*            COLOR QUERY            */
/*************************************/

export const typeDef = `
    # Root Query
    extend type Query {
        getAllUiComponents: [UiComponent]
        getUiComponentById(id: ID!): UiComponent
    }
`;

export const resolver = {
    Query: {
        getAllUiComponents(root: any, args: any) {
            // TODO: Aqui deberia llamar a un Service o una Api donde contenga
            // cada unos de los Request alusivos a 'uiComponent', haciendo el
            // try, catch, el manejo de errores, parseando los datos que sean
            // necesarios, etc.
            return models.UiComponent.findAll();
        },
        getUiComponentById(root: any, args: any) {
            return models.UiComponent.findById(args.id);
        },
    },
    UiComponent: {
        colorPalette(uiComponent: any) {
            return uiComponent.getColorPalette();
        }, 
    },
};



/* 

Query de ejemplo:


query {
  getUiComponentById(id: 1) {
    id
    css
    scss
    html
  	colorPalette {
  	  id
      colors {
        id
        hex
        label
      }
      category
      description
  	}
  }
  
  getAllUiComponents {
    id
    css
    scss
    title
    html
    colorPalette {
      id
    }
  }
}
*/