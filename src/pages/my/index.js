const { regeneratorRuntime, _config } = global;
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
            phoneNumber: _config.kf_phone
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
