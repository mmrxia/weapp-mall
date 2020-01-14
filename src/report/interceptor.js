import { $report } from './index'; // 日志上报

export default {
    init() {
        /* global App */
        const oldApp = App;
        // eslint-disable-next-line
        App = function (Obj) {
            interceptor(Obj, 'onLaunch');
            interceptor(Obj, 'onPageNotFound');
            interceptor(Obj, 'onError');
            oldApp(Obj);
        };

        /* global Page */
        const oldPage = Page;
        // eslint-disable-next-line
        Page = function (Obj) {
            interceptor(Obj, 'onLoad');
            interceptor(Obj, 'onShow');
            interceptor(Obj, 'onHide');
            interceptor(Obj, 'onReachBottom');
            interceptor(Obj, 'onShareAppMessage');
            oldPage(Obj);
        };
    }
};

/*
* 生命周期函数拦截器
* */
function interceptor(Obj, event) {
    const e = Obj[event];
    Obj[event] = function (option) {
        // 自定义code
        $report(event, option); // 日志上报
        // 原始方法调用
        e && e.call(this, option);
    };
}
