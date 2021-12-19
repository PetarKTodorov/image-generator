import fs from 'fs';
import path from 'path';
import resizer from 'node-image-resizer';

import { constants } from '../infrastructures/constants.js';
import { getImageWidth } from '../infrastructures/functions.js';

async function resizeImages() {
    const files = await fs.promises.readdir(constants.baseImagesToResizeFolder);

    if (fs.existsSync(constants.baseExportFolder)) {
        fs.rmdirSync(constants.baseExportFolder, { recursive: true });
    }

    if (fs.existsSync(constants.baseExportFolder) == false) {
        fs.mkdirSync(constants.baseExportFolder);
    }

    for (let index = 0; index < files.length; index++) {
        const file = files[index];

        const imageVersions = getImageVersions(file);
        
        const fileName = file.split('.')[0];
        const imagePath = path.join(constants.baseImagesToResizeFolder, file);

        const exportFolder = path.join(constants.baseExportFolder, fileName, '/');
        if (fs.existsSync(exportFolder) == false) {
            fs.mkdirSync(exportFolder);
        }

        const setup = {
            all: {
                path: exportFolder,
                quality: 100
            },
            versions: imageVersions
        };

        const imagePathObject = {
            images: await resizer(imagePath, setup),
        };

        constants.imagePaths.push(imagePathObject);
    }
}

function getImageVersions(file) {
    const imagePath = path.join(constants.baseImagesToResizeFolder, file);
    const originalImageWidth = getImageWidth(imagePath);

    const versions = [];

    for (let index = 0; index < constants.resolutionWidths.length; index++) {
        const resulution = constants.resolutionWidths[index];
        
        if (resulution.width > originalImageWidth) {
            continue;
        }

        const version = {
            width: resulution.width,
            suffix: String.format(constants.imageSuffix, resulution.width),
        }

        versions.push(version);
    }

    return versions;
}

export default resizeImages;