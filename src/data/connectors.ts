//import Sequelize from 'sequelize';
import { Instance, Model } from 'sequelize';
import * as casual from 'casual';
import * as _ from 'lodash';
import { models } from '../models/index';

var Sequelize = require('sequelize');

const db = new Sequelize('stylepills', null, null, {
    dialect: 'sqlite',
    storage: 'src/data/stylepills.sqlite',    
});

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return models.UiComponent.create({
            title: casual.title,
            html: casual.email,
            css: casual.short_description,
            scss: casual.short_description,
        }).then((uiComponent: any) => {
            return uiComponent.createColorPalette({
                hex: casual.rgb_hex,
                label: casual.rgb_hex,
            });
        });
    });
});

//export { UiComponent, ColorPalette };