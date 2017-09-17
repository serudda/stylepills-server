"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectors_1 = require("./connectors");
const resolvers = {
    Query: {
        uiComponents() {
            return connectors_1.UiComponent.findAll();
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