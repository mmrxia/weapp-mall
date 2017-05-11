'use strict';

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    ifElse = require('gulp-if-else'),
    gutil = require('gulp-util'),
    stripDebug = require('gulp-strip-debug');

var env_pro = false; //生产环境

gulp.task('clean', function () {
    return gulp.src('./dist', {read: true})
        .pipe(clean());
});

gulp.task('clone', ['clean'], function () {
    return gulp.src(['./src/**/*.*', '!./src/images/**', '!./src/config/local/**'])
        .pipe(replace('/images/', ifElse(env_pro, function () {
            return 'http://img.mamahao.cn/'
        }, function () {
            return 'http://s.mamhao.cn/wxapp/'
        })))  //更改图片引用路径
        .pipe(replace(/(\d+)px/gi, function (m, num) {
            return 2 * num + 'rpx';
        })) //替换1px为2rpx
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err);})
        .pipe(gulp.dest('./dist'))
});

gulp.task('build', ['clone'], function () {
    return gulp.src(['./src/images/**', '!./src/images/*.*'])
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('default', ['build'], function () {
    gulp.watch(['./src/**/*.*'], ['build']);
});
