const project_folder= "app";
const source_folder="#src";

const fs = require ('fs');

const path={
    build:{
        html:project_folder+"/",
        css: project_folder+"/css/",
        js: project_folder+"/js/",
        img: project_folder+"/img/",
        fonts:project_folder+"/fonts/",
        video:project_folder+"/video/",
    },
    src:{
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder+"/scss/style.scss",
        js: source_folder+"/js/script.js",
        img: source_folder+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts:source_folder+"/fonts/*.ttf",
        video:source_folder+"/video/**/*.{mp4,avi,mkv,mov,flv,vob}",
    },
    watch:{
        html:source_folder+"/**/*.html",
        css: source_folder+"/scss/**/*.scss",
        js: source_folder+"/js/**/*.js",
        img: source_folder+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
        video:source_folder+"/video/*.{mp4,avi,mkv,mov,flv,vob}",
    },
    clean : "./" + project_folder + "/"

}

const{src,dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    svgSprite = require("gulp-svg-sprite");

function browserSync(params){
    browsersync.init({
        server:{
            baseDir:"./" + project_folder + "/"
        },
        port:3000,
        notify:false
    })

}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(
            clean_css()
        )
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}


function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())

}


function images(){
    return src(path.src.img)
        .pipe(
            webp({
                quality: 85

            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive : true,
                svgoPlugins : [{removeViewBox: false}],
                interlaced : true,
                optimizationLevel : 2      // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}
function videos(){
    return src(path.src.video)
        .pipe(dest(path.build.video))
        .pipe(src(path.src.video))
        .pipe(browsersync.stream())
}
function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));

};


const otf2ttf = () => {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
};

exports.otf2ttf = otf2ttf;

const svgSprites = () => {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../icons/icons.svg",
                example: true
            }
        },
    }
    ))
    .pipe(dest(path.build.img))
  };

exports.svgSprites = svgSprites;

function fontsStyle(params) {

        let file_content = fs.readFileSync(source_folder + '/scss/utils/fonts.scss');
        if (file_content == '') {
            fs.writeFile(source_folder + '/scss/utils/fonts.scss', '', cb);
            return fs.readdir(path.build.fonts, function (err, items) {
                if (items) {
                    let c_fontname;
                    for (var i = 0; i < items.length; i++) {
                        let fontname = items[i].split('.');
                        fontname = fontname[0];
                        if (c_fontname != fontname) {
                            fs.appendFile(source_folder + '/scss/utils/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                        }
                        c_fontname = fontname;
                    }
                }
            })
        }
}
function cb(){

}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.video], videos);
}

function clean(params) {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, videos), fontsStyle);
const watch = gulp.parallel(build, watchFiles, browserSync,fontsStyle,images, videos);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.videos = videos;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
