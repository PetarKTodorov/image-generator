import congigureExtentions from './infrastructures/extentions.js';
import { configureConstants } from './infrastructures/constants.js';

import resizeImages from './logic/resize.js';
import convertImagesToWebp from './logic/convertToWebp.js';
import createCSSFile from './logic/createCssFile.js';
import createHTMLFile from './logic/createHTMLFile.js';

async function init(settings) {
    try {
        congigureExtentions();
        configureConstants(settings);

        await resizeImages();
        console.log("Resize completed successfully.");
        await convertImagesToWebp();
        console.log("Images converted successfully.");
        await createCSSFile();
        console.log("Generate css successfully.");
        createHTMLFile();
        console.log("Generate html successfully.");
        
    } catch (error) {
        console.error(error);
    }
}

export default init;
