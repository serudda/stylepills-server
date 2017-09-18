"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual = require("casual");
const _ = require("lodash");
const index_1 = require("../models/index");
var Sequelize = require('sequelize');
const db = new Sequelize('stylepills', null, null, {
    dialect: 'sqlite',
    storage: 'src/data/stylepills.sqlite',
});
// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return index_1.models.UiComponent.create({
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
//export { UiComponent, ColorPalette }; 
//# sourceMappingURL=connectors.js.map