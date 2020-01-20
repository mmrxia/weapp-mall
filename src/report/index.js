const {regeneratorRuntime} = global;
import utils from '../utils/index';
import {complete} from '../utils/promisify';
import config from '../config/index';
import $http from '../utils/x-http';
import reportConfig from './config';

/*
* 日志上报
* App:onLaunch 记录系统信息、网络、场景值等
* Page:onLoad 记录页面路径和参数
* Page:onHide 页面关闭时上报到服务器
* */

export default async (event, options = {}) => {
    const page = getCurrPage();
    const path = page && page.route || '';
    if (path && !reportConfig.allowPath.includes(path)) {
        return false; // 投放页才上报
    }

    // 初始化日志结构
    global._track = global._track || {
        project: config.appName,
        logs: []
    };

    // 添加记录
    const {_track} = global;
    _track.logs.push({
        event,
        options,
        timestamp: Date.now()
    });

    // 应用onLaunch时，记录场景值
    if (event === 'onLaunch') {
        const {networkType} = await complete(wx.getNetworkType)();
        const _system = wx.getSystemInfoSync(); // 设备系统信息
        const systemInfo = {};
        ['model', 'pixelRatio', 'system', 'language', 'version', 'SDKVersion', 'brand', 'platform'].map(v => {
            systemInfo[v] = _system[v];
        });
        global._launchInfo = {
            scene: options.scene, // 场景值
            networkType,
            systemInfo
        };
    }

    // 页面onLoad时，记录页面参数
    if (event === 'onLoad') {
        Object.assign(_track, {
            path // 页面路径
        });
    }

    // 上报数据
    if (event === reportConfig.opportunity) {
        console.log('【待上报日志数据】', _track);
        global._track = null; // 清除已有记录
        const {openid} = await utils.$login();
        if (openid) {
            const {_launchInfo} = global;
            Object.assign(_track, {
                version: reportConfig.version,
                openid,
                ..._launchInfo
            });
            $http({
                url: reportConfig.api,
                errType: 'none',
                data: {
                    _track
                }
            });
        }
    }
};

// 获取当前page
function getCurrPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
