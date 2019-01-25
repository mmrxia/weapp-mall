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
    gutil = require('gulp-util'),
    sftp = require('gulp-sftp');

/*===== 获取用户配置文件，可修改 ====*/
let config;
try {
    config = require('./config.js');
} catch (e) {
    log(gutil.colors.red('丢失配置文件config.js'));
}

/*===== 相关路径配置 ====*/
let paths = {
    src: {
        baseDir: 'src',
        baseFiles: ['src/**/*', '!src/assets/**', '!src/**/*.wxml', '!src/**/*.less'],
        wxmlFiles: ['src/**/*.wxml'],
        lessFiles: ['src/**/*.less'],
        assetsDir: 'src/assets',        //要上传到ftp或cdn的静态资源文件
    },
    dist: {
        baseDir: 'dist',
        wxssFiles: 'dist/**/*.wxss',
    }
};

/*===== 定义主要方法 ====*/

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
function copyFiles(file) {
    let files = typeof file === 'string' ? file : paths.src.baseFiles;
    return gulp.src(files)
        .pipe(gulp.dest(paths.dist.baseDir));
}

// 编译.less
function compileLESS(file) {
    let files = typeof file === 'string' ? file : paths.src.lessFiles;
    return gulp.src(files)
        .pipe(replace(/(\d+)px/gi, function (m, num) {
            return 2 * num + 'rpx'; //替换1px为2rpx， 0.5px为1rpx
        }))
        .pipe(less())
        .pipe(gulp.dest(paths.dist.baseDir));
}

// 复制.wxml
function copyWXML(file) {
    let files = typeof file === 'string' ? file : paths.src.wxmlFiles;
    return gulp.src(files)
        .pipe(gulpif(config.assetsPath, replace('@assets', config.assetsPath)))
        .pipe(gulp.dest(paths.dist.baseDir));
}

// 替换目录路径
function replaceDir(file) {
    return file.replace(`${paths.src.baseDir}`, `${paths.dist.baseDir}`);
}

//监听文件
function watch() {
    let watcher = gulp.watch([paths.src.baseDir], {ignored: /[/\\]\./});
    return watcher.on('all', watchHandler);
}

function watchHandler(event, file) {
    log(`${gutil.colors.yellow(file)} ${event}, running task...`);

    file = file.replace(/\\/, '/');    //替换路径分隔符, 只替换第一个'\', 重要！
    let extname = path.extname(file);
    if (event === 'unlink') {
        let tmp = replaceDir(file);
        if (extname === '.less') {
            tmp = tmp.replace(extname, '.wxss');
        }
        del(tmp);
    } else {
        if (extname === '.less') {
            compileLESS(file);  // less 文件
        } else if (extname === '.wxml') {
            copyWXML(file); // wxml 文件
        } else {
            copyFiles(file);
        }
    }
}

// 上传静态资源文件到FTP
function uploadFTP() {
    return gulp.src(paths.src.assetsDir)
        .pipe(sftp(config.ftp));
}

/*======= 注冊任務 =======*/

gulp.task('clean', removeFiles);  // 删除任务
gulp.task('FTP', uploadFTP);    // 上传FTP

//默认任务
gulp.task('default', gulp.series(
    removeFiles,
    copyFiles,
    gulp.parallel(
        compileLESS,
        copyWXML
    ),
    watch
));
