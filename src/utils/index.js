/**
* 全局工具类导出
* */
const { regeneratorRuntime } = global;
import { promisify, complete } from 'promisify';
import $http from './x-http'; // 二次封装 wx.request
import $filters from './x-filters'; // 过滤器
import { $report } from './report'; // 日志上报
/*
 * 静默授权登录，获取用户信息
 * app.login().then(res=>{})
 * */
const $login = async() => {
    // 获取本地存储的用户信息
    let userInfo = wx.getStorageSync('user_info');
    if (!userInfo) {
        try {
            // 解密微信用户信息，根据openid查询是否已有用户信息
            const { code: jsCode } = await promisify(wx.login)();
            const { data } = await $http({
                url: '/wx/openid',
                errType: 'none',
                data: { jsCode }
            });
            userInfo = typeof data === 'string' ? { openid: data } : data;
            // 存储到本地缓存
            wx.setStorageSync('user_info', userInfo);
        } catch (e) {
            console.log('[$login failed] ', e);
        }
    }
    return userInfo;
};

/*
 * 检验是否授权
 * 处理部门权限未授权的情况
 * */

const $authorize = async (scope) => {
    //scope列表
    const scopeList = {
        'scope.userLocation': '地理位置',
        'scope.address': '通讯地址',
        'scope.record': '录音功能',
        'scope.writePhotosAlbum': '保存到相册',
    };

    await complete(wx.authorize)({scope: scope});
    let {authSetting} = await promisify(wx.getSetting)();
    console.info('wx.getSetting => ', authSetting);

    if (!authSetting[scope]) {
        wx.showModal({
            title: '授权提示',
            content: `检测到您未打开${scopeList[scope]}权限，请在设置中打开`,
            async success (res) {
                if (res.confirm) {
                    let {authSetting} = await promisify(wx.openSetting)();
                    return authSetting[scope] || Promise.reject();
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });

    }
    return true;
};

export default {
    $http,
    $filters,
    $login,
    $authorize,
    $report
};
