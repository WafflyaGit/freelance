import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`

export const path = {
    templates: {
        _icons: `${srcFolder}/scss/base/_icons.scss`
    },
    build: {
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        svg: `${buildFolder}/img/svg/`,
        css: `${buildFolder}/css`,
        html: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts/`,
        favicon: `${buildFolder}/`
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/svg/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        fonts: `${srcFolder}/fonts/`,
        favicon: `${srcFolder}/favicon.ico`
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}