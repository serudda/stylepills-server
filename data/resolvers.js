import { UiComponent } from './connectors';

const resolvers = {
    Query: {
        uiComponents() {
            return UiComponent.findAll();
        },
        uiComponent(_, args) {
            return {
                title: 'Ghost Button',
                css: 'More css',
                scss: 'More scss',
                html: 'More html',
            }
        },
    },
    UiComponent: {
        colorPalette(uiComponent) {
            return uiComponent.getColorPalettes();
        },
    },
};

export default resolvers;
