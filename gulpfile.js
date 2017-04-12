'use strict';

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    ifElse = require('gulp-if-else');

//配置
var cfg = {
    env: 'pro',  //生产环境or开发环境
    imgPath:{
        pro: 'http://cdn.example.com/image/',
        dev: 'http://dev.example.com/image/'
    }
};

gulp.task('clean', function () {
    return gulp.src('./dist', {read: true})
        .pipe(clean());
});

gulp.task('clone', ['clean'], function () {
    return gulp.src(['./src/**/*.*', '!./src/images/**'])
        .pipe(replace('/images/', ifElse(cfg.env === 'pro', function () {
            return cfg.imgPath.pro
        }, function () {
            return cfg.imgPath.dev
        })))  //更改图片引用路径
        .pipe(replace(/(\d+)px/gi, function (m, num) {
            return 2 * num + 'rpx';
        })) //替换1px为2rpx
        .pipe(gulp.dest('./dist'))
});

gulp.task('build', ['clone'], function () {
    return gulp.src(['./src/images/**', '!./src/images/*.*'])
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('default', ['build'], function () {
    gulp.watch(['./src/**/*.*'], ['build']);
});
