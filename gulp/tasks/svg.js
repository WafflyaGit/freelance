import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css'

export const svg = () => {
    return app.gulp.src(app.path.src.svg)
        .pipe(iconfontCss({
            fontName: '_icons',
            path: app.path.templates._icons,
            targetPath: '../scss/_icons.scss',
            fontPath: '../fonts/icons/',
            cssClass: '_icon'
        }))
        .pipe(iconfont({
            fontName: '_icons',
            prependUnicode: true,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(app.gulp.dest(app.path.src.fonts))
        .pipe(app.gulp.src(app.path.src.fonts))
        .pipe(app.gulp.dest(app.path.build.fonts));
}