import regeneratorRuntime from '../libs/regenerator-runtime';
import {promisify, complete} from 'promisify';
import cfg from '../config/index';

/*
 * 检验是否授权
 * 处理未授权的情况
 * */

const checkAuthorize = async (scope) => {
    //scope列表
    const scopeList = {
        'scope.userInfo': '用户信息',
        'scope.userLocation': '地理位置',
        'scope.address': '通讯地址',
        'scope.record': '录音功能',
        'scope.writePhotosAlbum': '保存到相册',
    };

    await complete(wx.authorize)({scope: scope});
    let {authSetting} = await promisify(wx.getSetting)();
    console.info('wx.getSetting => ', authSetting);

    if (!authSetting[scope]) {
        const page = getCurrPage();

        //这个地方不能使用wx.showModal，需要自定义，否则无法触发wx.openSetting
        const modal = page.selectComponent('#modal');
        if (modal) {
            modal.display({
                show: true,
                title: '授权提示',
                content: `检测到您未打开${scopeList[scope]}权限，请在设置中打开`,
                async fnConfirm() {
                    let {authSetting} = await promisify(wx.openSetting)();
                    return authSetting[scope] || Promise.reject();
                }
            });
        } else {
            console.log('请在页面节点中增加modal组件');
            return Promise.reject();
        }

    }
    return true;
};

/*
 * 需要登录，未获取到用户信息，需要跳转到绑定页
 * 1. 需要登录信息，不需要强制跳转到登录页面。app.login().then(res=>{})
 * 2. 登录后返回当前页面。 app.login(true)或app.login(true).then(res=>{})
 * 3. 登录后跳转到目标url。 app.login({go: target_url})
 * */
const login = async (params) => {
    /*
     * 获取本地存储的用户信息
     * 这里查询用户信息，没有则重新请求一次，可能在其他端进行了绑定
     * */
    let userInfo = await getLocalUserInfo();

    const goUrl = params && params.go;

    /*
     * 未授权，则先授权，获取用户信息
     * 注：必须要先授权，获取到用户openid等信息，才能跳转到绑定页面
     * */
    if (!userInfo) {
        userInfo = await decodeUserInfo();
    }

    /*
     * 已有用户信息，直接next
     * */
    if (userInfo) {
        if (goUrl) {
            return wx.navigateTo({
                url: goUrl
            });
        }
        return userInfo;
    }

    /*
     * 未绑定，跳转到绑定页面
     * */
    if (params) {
        let loginUrl = '/pages/login/index';
        if (goUrl) loginUrl += ('?go=' + goUrl);
        return wx.navigateTo({
            url: loginUrl
        });
    }
    return Promise.reject(userInfo);
};


/*
 * 获取用户信息，来源：本地存储
 * */
function getLocalUserInfo() {
    const userInfo = wx.getStorageSync('user_info');
    return userInfo || null;
}

/*
 * 解密微信用户信息，根据openid查询是否已有用户信息
 * https://api.weixin.qq.com/sns/jscode2session
 * 返回用户信息
 * */
const decodeUserInfo = async () => {
    let userInfo = null;
    //允许授权
    const basic = await promisify(wx.login)();
    console.info('login => ', basic);

    //code换取session_key
    const session = await request({
        mode: 'natural',
        url: '/wx/openid',
        showLoading: {type: 2},
        data: {
            appid: cfg.appid,
            jsCode: basic.code,
        }
    });

    //成功获取用户信息
    if (session && session.data) {
        //{"session_key":"7LWhkZRqwRkbUvqODOnMfg==","openid":"oz2cB5ZI9T-vaHz1MXekyBwwUc8c"}
        userInfo = {openid: session.data};
        //存储到本地缓存
        wx.setStorageSync('user_info', userInfo);
    } else {
        //wx.login 接口返回报错
        wx.showModal({
            title: '提示',
            content: '接口请求失败，请重试！#[wx.login]'
        });
        return Promise.reject();
    }
    //成功获取用户信息
    if (session && session.data) {
        //{"session_key":"7LWhkZRqwRkbUvqODOnMfg==","openid":"oz2cB5ZI9T-vaHz1MXekyBwwUc8c"}
        userInfo = {openid: session.data};
        //存储到本地缓存
        wx.setStorageSync('user_info', userInfo);
    } else {
        //wx.login 接口返回报错
        wx.showModal({
            title: '提示',
            content: '接口请求失败，请重试！#[wx.login]'
        });
        return Promise.reject();
    }

    return userInfo;
};

/*
 * 封装request
 * 参数说明：
 * @params {Boolean} login           是否需要登录
 * @params {String} url              请求的url地址，可传api中的key或http绝对路径
 * @params {String} method           请求方式：GET/POST
 * @params {Object} header           请求头，如contentType等
 * @params {Object} data             请求数据体参数
 * @params {Object} showLoading      是否显示加载loading提示，默认为false不显示。 可设置true默认为{type: 1, title: '加载中'}。
 *                                   type：1为默认加载样式，type：2为顶部导航条进度提示loading样式。
 * @params {String} errType          统一处理错误或异常，默认以toast的形式弹出
 * @params {String} mode             'natural': 直接使用wx.request发起请求，不处理授权等用户信息
 * */

const request = async (opt) => {

    if (!/^http/i.test(opt.url)) {
        opt.url = cfg.api + opt.url;
    }

    const option = {
        url: opt.url,
        method: (opt.method || 'POST').toUpperCase(),
        header: opt.header || {},
        data: opt.data || {}
    };

    switch (opt.mode) {
        case 'natural':
            //自然模式，不进行任何附加处理
            break;
        default:
            //设置loading
            showLoading(opt);

            //是否需要用户登录信息
            if (opt.login) {
                const {openid} = await login();
                Object.assign(option.data, {openid: openid || 'Abcdefghigklmnopqrstuvwxyz'});
            }
            break;
    }

    //wx.request
    console.info('wx.request参数', option);
    const res = await complete(wx.request)(option);
    return await handleResponse(opt, res);
};

/*
* 处理请求回来的结果
* */
const handleResponse = async function (opt, res) {
    hideLoading(opt);   //隐藏loading

    let errInfo, status = res.statusCode;
    console.info(opt.url, status, '=> ', res);

    //处理请求出错的情况
    if (status !== 200) {
        let errMsg = '服务器竟然在开小差', errCode = status || 1000;
        if (/timeout/gi.test(res.errMsg)) {
            errCode = 1001;
        }
        res.data = {
            code: errCode,
            message: [errMsg, ' #', errCode].join('')
        };
    }

    const {code, message} = res.data;
    if (code && !/^(000000|200)$/.test(code)) {
        errInfo = {code, message};
        //错误类型处理
        switch (opt.errType) {
            case 'page':
                //页面数据增加error字段
                getCurrPage().setData({
                    error: errInfo
                });
                break;
            case 'modal':

                break;
            case 'none':

                break;
            default:
                //默认为toast
                wx.showToast({
                    title: errInfo.message,
                    icon: 'none',
                    duration: 2000
                });
                break;
        }
        return Promise.reject(errInfo);
    } else {
        //页面数据重置已有error字段
        const page = getCurrPage();
        if (page.data.error) {
            page.setData({
                error: null
            });
        }
    }
    return res.data;
};

//获取当前page
function getCurrPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}

/*
 * 显示loading
 * */
function showLoading(opt) {
    let _loading = opt.showLoading;
    if (!_loading) return false;
    switch (_loading.type) {
        case 1:
            //微信系统的loading
            opt.timer && clearTimeout(opt.timer);
            opt.timer = setTimeout(() => {
                wx.showLoading({
                    mask: true,
                    title: _loading.title || '加载中'
                });
            }, 180);
            break;
        case 2:
            //顶部导航栏loading
            wx.showNavigationBarLoading();
            break;
        default:
            //自定义loading
            opt.timer && clearTimeout(opt.timer);
            opt.timer = setTimeout(() => {
                getCurrPage().setData({
                    '__loading__.show': true
                });
            }, 180);
            break;
    }
    return true;
}

/*
 * 隐藏loading
 * */
function hideLoading(opt) {
    let _loading = opt.showLoading;
    if (!_loading) return false;
    switch (_loading.type) {
        case 1:
            //微信系统的loading
            opt.timer && clearTimeout(opt.timer);
            wx.hideLoading();
            break;
        case 2:
            //顶部导航栏loading
            wx.hideNavigationBarLoading();
            break;
        default:
            //自定义loading
            opt.timer && clearTimeout(opt.timer);
            getCurrPage().setData({
                '__loading__.show': false
            });
            break;
    }
    return true;
}

/*
* 获取access_token
* */
const getAccessToken = async function () {
    const data = wx.getStorageSync('access_token');
    if (data && +new Date() - data.timestamp < data.expires_in * 1000) {
        return data;  //有效期内
    }

    //重新获取access_token
    const res = await request({
        mode: 'natural',
        showLoading: {type: 2},
        //url: "/wx/token",
        url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${cfg.appid}&secret=${cfg.secret}`,
    });
    const info = {
        access_token: res.access_token,
        expires_in: res.expires_in,
        timestamp: +new Date()
    };
    wx.setStorageSync('access_token', info);
    return info;
};

/*
* 下发小程序和公众号统一的服务消息
* https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=${info.access_token}
* */
const sendUniformMessage = async function (data) {
    await request({
        mode: 'natural',
        showLoading: {type: 2},
        url: '/wx/sendUniformMsg',
        data: {
            appid: cfg.appid,
            data: JSON.stringify(data)
        }
    });
};


export default {request, login, sendUniformMessage, checkAuthorize};
