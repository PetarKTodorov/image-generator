import path from 'path';

const rootLocation = path.dirname("../");

export let constants = null;

export function configureConstants(settings) {
    const newConstants = {
        imagePaths: [],
        baseImagesToResizeFolder: path.join(rootLocation, 'images-to-resize'),
        baseExportFolder: path.join(rootLocation, '_resized-images'),
        ...settings,
    };

    constants = newConstants;
}