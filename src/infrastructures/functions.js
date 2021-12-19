import path from 'path';
import sizeOf from 'image-size';

import { constants } from './constants.js';

export function delay(timeInSeconds) {
    const timeInMiliseconds = timeInSeconds * 1000;

    return new Promise(resolve => setTimeout(resolve, timeInMiliseconds));
}

export function getImageWidth(imagePath) {
    const dimensions = sizeOf(imagePath);

    return dimensions.width;
}

export function getLargeImageWidth(images) {
    let largeWidth = Number.MIN_VALUE;

    for (let index = 0; index < images.length; index++) {
        const image = images[index];

        const imageWidth = getImageWidth(image);

        if (largeWidth < imageWidth) {
            largeWidth = imageWidth;
        }
        
    }

    return largeWidth;
}

export function getSmallImageWidth(images) {
    let smallWidth = Number.MAX_VALUE;

    for (let index = 0; index < images.length; index++) {
        const image = images[index];

        const imageWidth = getImageWidth(image);

        if (smallWidth > imageWidth) {
            smallWidth = imageWidth;
        }
        
    }

    return smallWidth;
}