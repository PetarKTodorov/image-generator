import fs from 'fs';
import path from 'path';

import { constants } from '../infrastructures/constants.js'
import { getImageWidth, getLargeImageWidth, getSmallImageWidth } from '../infrastructures/functions.js';

function generateHTML(imagePaths) {
    let sources = "";
    let largeImageWidth = getLargeImageWidth(imagePaths);
    let smallImageWidth = getSmallImageWidth(imagePaths);
    let baseImagePath = null;
    let isBaseImagePathIsSet = false;
    

    for (let index = 0; index < imagePaths.length; index++) {
        const imagePath = imagePaths[index];

        const imageDirectory = path.dirname(imagePath).split(path.sep).slice(1).join(path.sep);
        const imageExtension = path.extname(imagePath);
        const imageName = path.basename(imagePath, imageExtension);
        const imageWidth = getImageWidth(imagePath);

        let beckupImage = path.join(constants.htmlBaseFolder, imageDirectory, imageName + imageExtension);
        let webpImagePath = path.join(constants.htmlBaseFolder, imageDirectory, "webp", imageName + ".webp");

        if (constants.isHtmlBasePathStartsWithLeadingDotAndDash) {
            beckupImage = "./" + beckupImage;
            webpImagePath = "./" + webpImagePath;
        }

        if (isBaseImagePathIsSet === false && largeImageWidth === imageWidth) {
            isBaseImagePathIsSet = true;
            baseImagePath = beckupImage;
        }

        let sourceMedia = `media="(min-width: ${imageWidth}px)"`;

        if (smallImageWidth === imageWidth) {
            sourceMedia = "";
        }

        const source = `
    <source ${sourceMedia}
        srcset="${webpImagePath} ${imageWidth}w, ${beckupImage} ${imageWidth}w"
        sizes="100vw" />
`;

        sources += source;
    }

    const imageDefaultAltAtribute =  path.basename(baseImagePath) + ' is not found.';

    const html = `<picture>
${sources.trimEnd()}

    <img
        class="${constants.htmlSelector}"
        src="${baseImagePath}" 
        alt="${imageDefaultAltAtribute}" />

</picture>`;

    return html;
}

async function createHTMLFile() {
    try {
        for (let index = 0; index < constants.imagePaths.length; index++) {
            const images = constants.imagePaths[index].images;

            const html = generateHTML(images);

            const filePath = path.dirname(images[0]);
            const lastFolderName = filePath.split(path.sep).pop();
            const fileName = lastFolderName + ".html";

            const htmlFile = path.join(filePath, fileName);

            if (fs.existsSync(htmlFile)) {
                fs.unlinkSync(htmlFile);
            }

            fs.writeFileSync(htmlFile, html);
        }
    } catch (error) {
        console.log(error);
    }
}

export default createHTMLFile;
