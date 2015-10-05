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
            "app/bower_components/jquery/dist/jquery.min.js",
            "app/bower_components/foundation/js/foundation.min.js",
            "app/bower_components/foundation/js/foundation/foundation.reveal.js",
            "app/bower_components/gridster/dist/jquery.gridster.min.js",
            "app/bower_components/fastclick/lib/fastclick.js",
            "assets/js/typeahead.js",
            "assets/js/html2canvas.js",
            "assets/js/jspdf.min.js",
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