import fs from 'fs';
import path from 'path';

import { constants } from '../infrastructures/constants.js';
import { getImageWidth } from '../infrastructures/functions.js';

function generateCSS(imagePaths) {
    let css = "";

    for (let index = 0; index < imagePaths.length; index++) {
        const imagePath = imagePaths[index];

        const imageDirectory = path.dirname(imagePath).split(path.sep).slice(1).join(path.sep);
        const imageName = path.basename(imagePath);
        const imageWidth = getImageWidth(imagePath);

        let image = path.join(constants.cssBaseFolder, imageDirectory, imageName);

        if (constants.isCssBasePathStartsWithLeadingDotAndDash) {
            image = "./" + image;
        }

        const media = `
@media (max-width: ${imageWidth}px) {
    ${constants.cssSelector} {
        background: url('${image}');
    }
}
`;

        css += media;
    }

    return css.trim();
}

async function createCSSFile() {
    try {
        for (let index = 0; index < constants.imagePaths.length; index++) {
            const images = constants.imagePaths[index].images;
    
            const css = generateCSS(images);

            const filePath = path.dirname(images[0]);
            const lastFolderName = filePath.split(path.sep).pop();
            const fileName = lastFolderName + ".css";
    
            const cssFile = path.join(filePath, fileName);
    
            if (fs.existsSync(cssFile)) {
                fs.unlinkSync(cssFile);
            }
    
            await fs.writeFileSync(cssFile, css);
        }
    } catch (error) {
        console.log(error);
    }
}

export default createCSSFile;