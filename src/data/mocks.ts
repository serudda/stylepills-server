import * as casual from 'casual';

const mocks = {
    Query: () => ({
        uiComponent: (root: any, args: any) => {
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

export default mocks;
