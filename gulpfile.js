const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const connect = require('gulp-connect');

const scssInputPath = "./styles/*.scss";
const htmlInputFiles = "./*.html";
const scssOutputPath = "./styles/";

function server() {
  return connect.server({
    port: 8000,
    root: './',
    livereload: true
  })
}

function styles() {
  return gulp
    .src(scssInputPath)
    .pipe(sourcemaps.init()) // 1 Transformation: add sourcemap scss -> css
    .pipe(sass().on("error", sass.logError)) // 2 Transformation: scss will be css
    .pipe(
      autoprefixer({
        cascade: false, // 3 Transformation: add some prefixes
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" })) // 4 Transformation: css minification
    .pipe(sourcemaps.write("./", {}))
    .pipe(gulp.dest(scssOutputPath))
    .pipe(connect.reload());;
}

function watch() {
  gulp.watch([scssInputPath, htmlInputFiles], styles);
}

// Run: gulp <command name>
exports.styles = styles;
exports.watch = watch;

exports.dev = gulp.parallel(server, watch);

