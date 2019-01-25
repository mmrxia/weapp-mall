import regeneratorRuntime from '../../libs/regenerator-runtime';
import cfg from '../../config/index';
const app = getApp();
Page({
    data: {
        userInfo: {},
    },
    onLoad() {
        //app.login()
    },
    handlePhoneCall() {
        wx.makePhoneCall({
            phoneNumber: cfg.kf_phone
        });
    },

    navigateTo(e) {
        app.login({
            go: e.currentTarget.dataset.url
        });
    },

    handleAddress(){
        wx.chooseAddress();
    }
});
