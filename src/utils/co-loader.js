/*
* 引用co库封装
* 导入方式：
* import {co, Promise, regeneratorRuntime} from 'utils/co-loader';
* 处理异常：
* 使用try{//code here}catch(e){//...}
* by xqs 2017
* */

import Promise from '../libs/es6-promise.min'
import regeneratorRuntime from '../libs/regenerator-runtime';
import co from  '../libs/co';

export {Promise,  regeneratorRuntime, co}