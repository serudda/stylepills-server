"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual = require("casual");
const mocks = {
    Query: () => ({
        uiComponent: (root, args) => {
            return {
                id: args.id,
                title: args.title,
            };
        },
    }),
    ColorPalette: () => ({
        id: () => casual.uuid,
        label: () => casual.rgb_hex,
        hex: () => casual.rgb_hex,
    }),
    UiComponent: () => ({
        id: () => casual.uuid,
        title: () => casual.title,
    }),
};
exports.default = mocks;
//# sourceMappingURL=mocks.js.map