// 全局的工具类方法
import regeneratorRuntime from './libs/regenerator-runtime';
import _config from './config/index';
import utils from './utils/index';
import interceptor from './utils/interceptor';

/**
 * 需要用到 async/await 的页面引出以下内容即可
 * const { regeneratorRuntime } = global
 * */
Object.assign(global, {
    regeneratorRuntime,
    _config,
    _track: null
});

// 拦截器
interceptor.init();

App({
    ...utils,
    onLaunch () {

    }
});
