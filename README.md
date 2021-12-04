# simple-randomizer

A simple node.js script that layers images on top of a base image.

## Installation

`npm install`

## Use

`node index.js`

You can optionally supply a number of images to create, it uses 5 by default.

The script is currently looking for an image called `wolvesit.jpeg` in the base directory to use as the base image, and then directories called `eyes` and `hat` with images to choose randomly from inside of them. The intend is to extend this to pull from many different directories, probably in a configurable way.

Created images will be dropped into an `output` directory named `test1.jpg` `test2.jpg` etc.