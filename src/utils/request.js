import Map from 'map';
import {co, Promise, regeneratorRuntime} from 'co-loader';
import {promisify, complete} from 'promisify';
import ApiList from  '../config/api';
import cfg from  '../config/index';

/*
 * 封装request
 * 参数说明：
 * @params {Boolean} login           是否需要登录
 * @params {Boolean} location        是否需要获取地理位置信息
 * @params {String} url              请求的url地址，可传api中的key或http绝对路径
 * @params {String} method           请求方式：GET/POST
 * @params {Object} header           请求头，如contentType等
 * @params {Object} data             请求数据体参数
 * */

const request = co.wrap(function *(opt) {
    let app = getApp();

    //env:local时使用本地数据
    if(!cfg.api){
        var mock = require('../config/local/data.js');
        return opt.success.call(opt, {data: mock[opt.url] || {}});
    }

    //请求方式不同设置不同的contentType
    const contentType = /GET/i.test(opt.method) ? 'application/json' : 'application/x-www-form-urlencoded';

    const reqUrl = getRequestUrl(opt.url);
    if(!reqUrl) return;

    const option = {
        url: reqUrl,
        method: (opt.method || "POST").toUpperCase(),
        header: Object.assign({'content-type': contentType}, opt.header),
        data: opt.data || {}
    };

    //需要登录用户信息
    if(opt.login){
        const userInfo = yield app.getUserInfo();
        if (userInfo.mmh) {
            const {memberId, token} = userInfo.mmh;
            Object.assign(option.header, {memberId, token})
        }
    }

    //需要地理位置信息
    if (opt.location) {
        const location = yield Map.getRegeo();
        const {lat, lng, areaId} = location;
        Object.assign(option.data, {lat, lng, areaId});
    }

    return yield promisify(wx.request)(option).then(opt.success, opt.fail);

});

/*
 * 判断是否包含http协议
 * */
function isHttpUrl(url) {
    return /^http/i.test(url);
}

/*
 * 兼容获取请求url
 * */
function getRequestUrl(url) {
    let reqUrl;
    const api = ApiList[url];
    if(!api){
        if(isHttpUrl(url)){
            reqUrl = url;
        }else{
            console.error('[config/api.js]中未配置', url, '映射');
        }
    }else{
        reqUrl = isHttpUrl(api) ? api : (cfg.api + api);
    }
    return reqUrl;
}

export default request