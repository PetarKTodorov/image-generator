# Image Generator


## What is this
1. This project resize images from specific size to specific size.  
2. Generate ".webp" extension of the resized images.  
3. Generates a css file which has inside setup media queries for resized images.  
4. Generates a html file with ``` <picture> ``` tag and sets webp images and original format image.


## Requirements

|  Name         | version       | Details  |
| ------------- |:-------------:| ------------------------------------: |
| Node          | >=14.17.1       | Check .nvmrc file  					|

## Optional tools

|  Name         |  Description                  | Installation                  |
| ------------- | ----------------------------- | ----------------------------- |
| NVM           | Multiple nodejs versions      | https://github.com/nvm-sh/nvm |


## How to build
#### If you have nvm
```shell
nvm use
npm install
```

#### If you doesnt have nvm
*Be sure your node version is above **v14.17.1**, may work on older versions, but is was tested on **v14.17.1**

```shell
npm install
```


## How to use
1. Navigate to "images-to-resize" directory and paste your images there non image types files will be skipped.
2. Run in terminal:  ``` npm run start ```
3. Generated images will be in ``` "_resized-images/[imageName]/" ```
4. Optional: in a root directory in the project you will find 'settings.json' file. This file contains default settings you can modify.

#### Settings / Options
* resolutionWidths: 
This is an array containing objects with property width. Value of the width reprezent size that original image will become.  
**Note if image is small then any size which is greater,  will be skipped.**  
```shell
"resolutionWidths": [
        {
            "width": 1920
        },
        {
            "width": 1600
        },
        {
            "width": 1360
        }
    ]

    This will generate images like:

    _resized-images/[imageName]/[imageName]_width_1920
    _resized-images/[imageName]/[imageName]_width_1600
    _resized-images/[imageName]/[imageName]_width_1360
```

* imageSuffix: This is a string which represents a suffix of every image  
**The {0} is where image size will be replaced.**   
```shell
"imageSuffix": "_width_{0}"

This will generate images like:

[imageName]_width_1920
[imageName]_width_1600
[imageName]_width_1360
```

* cssSelector: This will be a selector for images in generated css file.  
```shell
"cssSelector": ".selector"

In css file will generate images like:

@media (max-width: 1920px) {
    .selector {
        background: url('./[imageName]_width_1920.png');
    }
}

@media (max-width: 1600px) {
    .selector {
        background: url('./[imageName]_width_1600.png');
    }
}
```

* htmlSelector: This will be a selector for ```img``` tag in generated html file.  
```shell
"htmlSelector": ".demo-image",

In html file will generate images like:

<picture>

    <source media="(min-width: 1920px)"
        srcset="./[imageName]/webp/[imageName]_width_1920.webp 1920w, ./[imageName]/[imageName]_width_1920.png 1920w"
        sizes="100vw" />

    <source media="(min-width: 1600px)"
        srcset="./[imageName]/webp/[imageName]_1600.webp 1600w, ./[imageName]/[imageName]_width_1600.png 1600w"
        sizes="100vw" />

    <img
        class=".demo-image"
        src="./[imageName]/[imageName]_width_1920.png" 
        alt="[imageName]_width_1920.png is not found." />

</picture>
```

* htmlBaseFolder / cssBaseFolder: You can set this to configure your images path  
```shell
"htmlBaseFolder / cssBaseFolder": "demo/test/",

In html/css file will generate images paths like:

demo/test/[imageName]/[imageName]_width_1600.[imageExtension]

```

* isHtmlBasePathStartsWithLeadingDotAndDash / isCssBasePathStartsWithLeadingDotAndDash: default is true, will add "./" to your path  
```shell
"isHtmlBasePathStartsWithLeadingDotAndDash / isCssBasePathStartsWithLeadingDotAndDash": true,

In html/css file will generate images paths like:

./demo/test/[imageName]/[imageName]_width_1600.[imageExtension]

```