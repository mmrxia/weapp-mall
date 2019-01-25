//app.js
import ext from 'utils/ext';
import utils from  'utils/index';

//app.js
App({
    ...ext,
    ...utils,
    onLaunch () {
        try {
            const {model, system} = wx.getSystemInfoSync();
            this.globalData.os = /ios/gi.test(system) ? 'ios' : 'android';
            this.globalData.isIphoneX = new RegExp('iPhone X', 'gi').test(model);
        } catch (e) {
            console.log(e);
        }
    },
    globalData: {
        os: 'ios',
        isIphoneX: false,
    }
});
