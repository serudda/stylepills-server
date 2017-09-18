"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const resolvers = {
    Query: {
        uiComponents() {
            return index_1.models.UiComponent.findAll();
        },
        uiComponent(_, args) {
            return {
                title: 'Ghost Button',
                css: 'More css',
                scss: 'More scss',
                html: 'More html',
            };
        },
    },
    UiComponent: {
        colorPalette(uiComponent) {
            return uiComponent.getColorPalettes();
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map