import cfg from '../config/index.js';
import ApiList from  '../config/api';
import {promisify, complete} from 'promisify';
import {co, Promise, regeneratorRuntime} from 'co-loader';
import request from 'request';

/*
 * 获取用户信息
 * 引用：import {getUserInfo} from  'utils/index';
 * 调用：
 * co(function *() {
 *    var res = yield app.getUserInfo()
 *    console.info('userInfo', res)
 * })
 * 或
 * app.getUserInfo().then(res=>{
 *   console.info('userInfo', res)
 * })
 * */
const getUserInfo = co.wrap(function *() {
    const key_user = cfg.localKey.user;
    let userInfo = wx.getStorageSync(key_user);
    if (!userInfo) {
        userInfo = {
            wx: null,
            mmh: null
        };
        const basic = yield promisify(wx.login)();
        //console.info('login---',basic);

        //用户明文信息
        const user = yield promisify(wx.getUserInfo)({withCredentials: true});
        userInfo.wx = user.userInfo;
        //console.info('user---',user);

        //code换取session_key
        const session = yield request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
                appid: cfg.appid,
                secret: cfg.secret,
                js_code: basic.code,
                grant_type: "authorization_code"
            }
        });
        //console.info('jscode2session---',session);

        //解密encryptedData
        if(session.data){
            const decodeInfo = yield request({
                url: ApiList.decodeWechatInfo,
                data: {
                    appId: cfg.appid,
                    data: user.encryptedData,
                    iv: user.iv,
                    sessionKey: session.data.session_key
                }
            });
            //console.info('decodeInfo---',decodeInfo);

            if(decodeInfo.data){
                userInfo.mmh = decodeInfo.data.mmhUser;
                userInfo.wx = decodeInfo.data.wxUser;
            }
        }

        wx.setStorage({
            key: key_user,
            data: userInfo
        });
    }
    return userInfo;
});

export {getUserInfo};

