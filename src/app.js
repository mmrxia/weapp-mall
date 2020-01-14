// 全局的工具类方法
import regeneratorRuntime from './libs/regenerator-runtime';
import _config from './config/index';
import utils from './utils/index';

// 拦截器
import { $report } from './report/index'; // 日志上报
import interceptor from './report/interceptor';
interceptor.init();

/**
 * 需要用到 async/await 的页面引出以下内容即可
 * const { regeneratorRuntime } = global
 * */
Object.assign(global, {
    regeneratorRuntime,
    _config,
    _track: null
});


App({
    $report,
    ...utils,
    onLaunch () {

    }
});
