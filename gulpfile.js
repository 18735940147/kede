// 导入模块
let $ = mod => require(mod),
{src,dest,watch,parallel,series} = $('gulp'),
htmlmin = $('gulp-htmlmin'),
sass = $('gulp-sass'),
rename = $('gulp-rename'),
babel = $('gulp-babel'),
uglify = $('gulp-uglify');

// 创建任务

    // 创建测试任务
    function test(done){
        console.log(">>> it's ok.");
        done();
    }


 // index.html
 function copy(){
    return src('./src/index.html')
    .pipe(dest('dist'));
}

// pages
function html(){
    return src('./src/pages/*')
    .pipe(htmlmin())
    .pipe(dest('dist/pages'));
}

// css
function css(){
    return src('./src/sass/*')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/css'));
}

// js
function js(){
    return src('./src/js/*')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/js'))
}



    // listen
    function listen(){
        watch('./src/index.html',copy);
        watch('./src/pages/*',html);
        watch('./src/sass',css);
        watch('./src/js',js);
    }

// 发布任务
    exports.test = test;
    exports.copy = copy;
    exports.html = html;
    exports.css = css;
    exports.js = js;
    exports.all = series(copy,html,css,js);
    exports.default = listen;