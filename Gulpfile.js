var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    $            = require('gulp-load-plugins')();
 
var config = {
    css: {
        src: 'assets/scss/**/*.scss',
        dest: 'assets/css'
    },
    js: {
        src: [ // List libraries in the order you want them loaded (deps first)
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/foundation/js/foundation.min.js",
            "assets/js/jquery.slicknav.min.js",
            "assets/js/fastclick.js",
            "assets/js/jquery.mixitup.min.js",
            "assets/js/slick.min.js",
            "assets/js/app.js"
        ],
        dest: 'assets/js'
    }
 
};






gulp.task('css', function() {
    gulp.src( config.css.src )
        .pipe( $.plumber() )                   // error handling w/o breaking streams
        .pipe( $.sourcemaps.init() )           // generate sourcemaps 
        .pipe( $.sass() )                      // preprocess css
        .pipe( $.sourcemaps.write('./'))       // write sourcemaps
        .pipe( gulp.dest( config.css.dest ) ) // write compiles files
        .pipe( reload( { stream:true } ) );          // let BrowserSync handle the live reload
});
 
gulp.task('js', function(){
    // Uglify / rename main script
    gulp.src( config.js.src )
        .pipe( $.sourcemaps.init() ) 
        .pipe( $.uglify() )
        .pipe( $.concat('script.min.js') )
        .pipe( $.sourcemaps.write( './' )) 
        .pipe( gulp.dest( config.js.dest ) );
 
});
 
gulp.task('watch', ['css', 'js', 'browser-sync'],function() {
    // $.livereload.listen();      
    // gulp.watch( [config.css.src, config.js.src] ).on('change', $.livereload.changed);
    // gulp.watch( [config.css.src, config.js.src] ).on('change', $.livereload.changed);
    gulp.watch( config.css.src, ['css'] );
    gulp.watch( config.js.src, ['js', browserSync.reload] );
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

 
 
gulp.task('default', ['watch']);