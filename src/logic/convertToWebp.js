import path from 'path';
import fs from 'fs';
import imagemin from 'imagemin';
import webp from "imagemin-webp";

import { constants } from '../infrastructures/constants.js';
import { delay } from '../infrastructures/functions.js';

async function convertImagesToWebp() {
    try {
        for (let index = 0; index < constants.imagePaths.length; index++) {
            const imagePaths = constants.imagePaths[index].images;

            await checkIsAllFilesAreVisible(imagePaths, index);

            for (let index = 0; index < imagePaths.length; index++) {
                const imagePath = imagePaths[index];

                const destinationImagePath = path.join(path.dirname(imagePath), 'webp');

                await imagemin([imagePath], {
                    destination: destinationImagePath,
                    plugins: [
                        webp({
                            quality: 100
                        }),
                    ],
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function checkIsAllFilesAreVisible(imagePaths, index) {
    let currentFilesCount = fs.readdirSync(path.dirname(imagePaths[index])).length;

    while (currentFilesCount != imagePaths.length) {
        await delay(2);

        currentFilesCount = fs.readdirSync(path.dirname(imagePaths[0])).length;
    }
}

export default convertImagesToWebp;