import Sequelize from 'sequelize';
//import { Instance, Model } from 'sequelize';
import * as casual from 'casual';
import * as _ from 'lodash';

//var Sequelize = require('sequelize');

/*export interface IUiComponentAttributes {
    title: string;
    html: string;
    css: string;
    scss: string;
}*/

/*export interface IUiComponentInstance extends Instance<IUiComponentAttributes> {
    dataValues: IUiComponentAttributes;
}

export interface IColorPaletteAttributes {
    label: string;
    hex: string;
}
  
export interface IColorPaletteInstance extends Instance<IColorPaletteAttributes> {
    dataValues: IColorPaletteAttributes;
}

export interface SequelizeModels {
    UiComponent: Model<IUiComponentInstance, IUiComponentAttributes>;
    ColorPaletteModel: Model<IColorPaletteInstance, IColorPaletteAttributes>;
}*/

const db = new Sequelize('stylepills', '', '', {
    dialect: 'sqlite',
    storage: './stylepills.sqlite',    
});

const UiComponentModel = db.define('uiComponent', {
    title: { type: Sequelize.STRING},
    html: { type: Sequelize.STRING},
    css: { type: Sequelize.STRING},
    scss: { type: Sequelize.STRING},
});

const ColorPaletteModel = db.define('colorPalette', {
    label: { type: Sequelize.STRING},
    hex: { type: Sequelize.STRING},
});

UiComponentModel.hasMany(ColorPaletteModel);
ColorPaletteModel.belongsTo(UiComponentModel);

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return UiComponentModel.create({
            title: casual.title,
            html: casual.email,
            css: casual.short_description,
            scss: casual.short_description,
        }).then((uiComponent) => {
            return uiComponent.createColorPalette({
                hex: casual.rgb_hex,
                label: casual.rgb_hex,
            });
        });
    });
});

const UiComponent = db.models.uiComponent;
const ColorPalette = db.models.colorPalette;

export { UiComponent, ColorPalette };