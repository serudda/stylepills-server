import { UiComponent } from './connectors';

const resolvers = {
    Query: {
        uiComponents() {
            return UiComponent.findAll();
        },
        uiComponent(_: any, args: any) {
            return {
                title: 'Ghost Button',
                css: 'More css',
                scss: 'More scss',
                html: 'More html',
            }
        },
    },
    UiComponent: {
        colorPalette(uiComponent: any) {
            return uiComponent.getColorPalettes();
        },
    },
};

export default resolvers;
