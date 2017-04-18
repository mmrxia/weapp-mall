import cfg from '../../config/index.js';
let app = getApp();

Page({
    data: {
        pics: wx.getStorageSync(cfg.localKey.qcRpt)
    },
    onLoad (){

    }
});