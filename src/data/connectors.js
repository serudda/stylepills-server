"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual = require("casual");
const _ = require("lodash");
var Sequelize = require('sequelize');
const db = new Sequelize('stylepills', null, null, {
    dialect: 'sqlite',
    storage: 'src/data/stylepills.sqlite',
});
const UiComponentModel = db.define('uiComponent', {
    title: { type: Sequelize.STRING },
    html: { type: Sequelize.STRING },
    css: { type: Sequelize.STRING },
    scss: { type: Sequelize.STRING },
});
const ColorPaletteModel = db.define('colorPalette', {
    label: { type: Sequelize.STRING },
    hex: { type: Sequelize.STRING },
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
exports.UiComponent = UiComponent;
const ColorPalette = db.models.colorPalette;
exports.ColorPalette = ColorPalette;
//# sourceMappingURL=connectors.js.map