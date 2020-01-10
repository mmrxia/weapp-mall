/*
* 使用方式
const app = getApp()
await app.$http({
  url: 'uuid'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
* */
import config from '../config/index'; // 全局配置
const { appName, platform } = config;

const http = options => new Promise((resolve, reject) => {
    // 全局loading
    if (options.loading) {
        wx.showLoading({
            mask: true
        });
    }

    options.data = Object.assign(options.data || {}, {
        appName: options.data ? options.data.appName || appName : appName,
        platform: options.data ? options.data.platform || platform : platform
    });
    console.info('options.data => ', options.data);
    wx.request({
        url: /^http/i.test(options.url) ? options.url : config.baseUrl + options.url,
        method: options.method || 'POST',
        header: Object.assign({}, options.header || {}),
        data: options.data,
        success(response) {
            console.info('request success => ', options.url, response.data);
            const res = response.data;
            const code = res.code;
            if (response.statusCode === 200) {
                if (code && !/^(000000|200)$/.test(code)) {
                    // 不进行统一处理错误提示信息
                    if (options.errType === 'none') {
                        return reject(res);
                    }
                    // API接口错误提示信息统一处理，前期把报错的API地址一同暴露给用户，便于开发人员排查问题
                    console.warn('API地址：', options.url);
                    console.warn('API结果：', res);
                    wx.showToast({
                        icon: 'none',
                        title: res.message
                    });
                    return reject(res);
                } else {
                    return resolve(res);
                }
            } else {
                // 不进行统一处理错误提示信息
                if (options.errType === 'none') {
                    return reject(res);
                }
                // 统一的错误提示信息
                const errorMsg = `${options.url} #${String(response.statusCode)}`;
                // 统一错误提示
                wx.showToast({
                    icon: 'none',
                    title: errorMsg
                });
                return reject(res);
            }
        },
        fail(err) {
            console.info('request fail => ', err);
            reject(err);
        },
        complete() {
            // 隐藏全局loading
            setTimeout(() => {
                options.loading && wx.hideLoading();
            }, 500);
        }
    });
});

export default http;
