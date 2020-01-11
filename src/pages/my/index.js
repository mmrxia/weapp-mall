const { regeneratorRuntime, _config } = global;
const app = getApp();
Page({
    data: {
        userInfo: {},
    },
    onLoad() {
        //app.$login()
    },
    handlePhoneCall() {
        wx.makePhoneCall({
            phoneNumber: '400-1001-1002'
        });
    },

    navigateTo(e) {
        app.$login({
            go: e.currentTarget.dataset.url
        });
    },

    handleAddress(){
        wx.chooseAddress();
    }
});
