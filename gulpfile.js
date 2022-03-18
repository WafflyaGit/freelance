import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

// tasks
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svg } from "./gulp/tasks/svg.js";
import { favicon } from "./gulp/tasks/favicon.js"
import { fonts } from "./gulp/tasks/fonts.js"

function watcher () {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svg, fonts }

const dev = gulp.series(reset, gulp.parallel(html, scss, js, images, favicon), gulp.parallel(watcher, server));

gulp.task('default', dev);