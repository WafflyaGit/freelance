import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import { htmlValidator } from 'gulp-w3c-html-validator';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "ERROR: <%= error.message %>"
            }))
        )
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(webpHtmlNosvg())
        .pipe(
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v', 
                    'cover': 0,
                    'to' : [
                        'css', 
                        'js'
                    ]
                },
                'output' : {
                    'file': 'gulp/version.json'
                }
            })
        )
        .pipe(htmlValidator.analyzer())
        .pipe(htmlValidator.reporter())
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}