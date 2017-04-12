import Map from 'map';
import {co, Promise, regeneratorRuntime} from 'co-loader';
import {complete} from 'promisify';

const request = co.wrap(function *(opt) {
    let app = getApp();
    const option = {
        url: opt.url,
        method: (opt.method || "POST").toUpperCase(),
        header: Object.assign({'content-type': 'application/x-www-form-urlencoded'}, opt.header),
        data: opt.data || {},
        success: opt.success || null,
        fail: opt.fail || null,
        complete: opt.complete || null
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

    return yield complete(wx.request)(option);

});

export default request