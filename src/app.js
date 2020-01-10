// 全局的工具类方法
import utils from './utils/index';
import interceptor from './utils/interceptor';

/**
 * 需要用到 async/await 的页面引出以下内容即可
 * const { regeneratorRuntime } = global
 * */
Object.assign(global, {
    regeneratorRuntime: require('./libs/regenerator-runtime'),
    _config: require('./config/index'),
    _track: null
});
const { regeneratorRuntime } = global;

// 拦截器
interceptor.init();

App({
    ...utils,
    onLaunch () {

    }
});
