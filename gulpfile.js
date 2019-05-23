'use strict';

/*
* 说明：gulp版本4.0及以上
* npm install gulp-cli -g
* npm install gulp@4 -D
* */

// 引入gulp组件
const gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    gulpif = require('gulp-if'),
    replace = require('gulp-replace'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    sftp = require('gulp-sftp-up4'),
    plumber = require('gulp-plumber');

/*===== 获取用户配置文件，可修改 ====*/
let config;
try {
    config = require('./config.custom.js'); // 获取用户配置
} catch (e) {
    try {
        config = require('./config.js');    //默认配置
    } catch (e) {
        log(gutil.colors.red('丢失配置文件(config.js/config.custom.js)'));
    }
}

/*===== 相关路径配置 ====*/
let paths = {
    src: {
        baseDir: 'src',
        baseFiles: ['src/**/*', '!src/assets/**', '!src/**/*.wxml', '!src/**/*.less'],
        wxmlFiles: ['src/**/*.wxml'],
        cssFiles: ['src/**/*.less'],
        assetsDir: 'src/assets/**',        //要上传到ftp或cdn的静态资源文件
    },
    dist: {
        baseDir: 'dist',
        wxssFiles: 'dist/**/*.wxss',
    }
};

/*===== 定义主要任务方法 ====*/

// 日志输出
function log() {
    let args = Array.prototype.slice.call(arguments);
    gutil.log.apply(null, args);
}

// clean 任务, dist 目录
function removeFiles() {
    return del(paths.dist.baseDir);
}

// 复制文件
function copyFiles(file, dest = paths.dist.baseDir) {
    let files = typeof file === 'function' ? paths.src.baseFiles : file;
    return gulp.src(files, {allowEmpty: true})
        .pipe(gulp.dest(dest));
}

// 编译.less
function compileCSS(file, dest = paths.dist.baseDir) {
    let files = typeof file === 'function' ? paths.src.cssFiles : file;
    return gulp.src(files, {allowEmpty: true})
        .pipe(plumber())
        .pipe(less())
        .pipe(replace(/(-?\d+(\.\d+)?)px/gi, function (m, num) {
            return 2 * num + 'rpx'; //替换1px为2rpx， 0.5px为1rpx
        }))
        .pipe(rename({extname: '.wxss'}))     //修改文件类型
        .pipe(replace(/.(less)/i, '.wxss'))        //替换引用其他样式文件时的路径
        .pipe(gulpif(!!config.assetsPath, replace('@assets', config.assetsPath)))
        .pipe(gulp.dest(dest));
}

// 复制.wxml
function copyWXML(file, dest = paths.dist.baseDir) {
    let files = typeof file === 'function' ? paths.src.wxmlFiles : file;
    return gulp.src(files, {allowEmpty: true})
        .pipe(gulpif(!!config.assetsPath, replace('@assets', config.assetsPath)))
        .pipe(gulp.dest(dest));
}

//监听文件
function watch() {
    let watcher = gulp.watch(['src/**', '!src/assets/**'], {ignored: /[/\\]\./});
    return watcher.on('all', watchHandler);
}

function watchHandler(event, file) {
    log(`${gutil.colors.yellow(file)} ${event}, running task...`);

    file = file.replace(/\\/g, '/');    //替换路径分隔符
    let ext_name = path.extname(file);  // 文件扩展名
    let dest  = replaceBaseDir(path.dirname(file)); // 文件输出目录

    if (event === 'unlink') {
        let tmp = replaceBaseDir(file);
        if (/.(less)$/i.test(ext_name)) {
            tmp = tmp.replace(ext_name, '.wxss');
        }
        del(tmp);
    } else {
        if (/.(less)$/i.test(ext_name)) {
            compileCSS(file, dest);  // 样式 文件
        } else if (/.(wxml)$/i.test(ext_name)) {
            copyWXML(file, dest); // wxml 文件
        } else {
            copyFiles(file, dest);
        }
    }
}

// 上传静态资源文件到FTP
function uploadFTP() {
    return gulp.src(paths.src.assetsDir)
        .pipe(sftp(config.ftp));
}

/*===== 定义其他util方法 ====*/

// 替换目录路径
function replaceBaseDir(file) {
    return file.replace(`${paths.src.baseDir}`, `${paths.dist.baseDir}`);
}


/*======= 注冊任務 =======*/

gulp.task('clean', removeFiles);  // 删除任务
gulp.task('FTP', uploadFTP);    // 上传FTP

//默认任务
gulp.task('dev', gulp.series(
    copyFiles,
    gulp.parallel(
        compileCSS,
        copyWXML
    ),
    watch
));
