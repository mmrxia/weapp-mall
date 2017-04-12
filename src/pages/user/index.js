// pages/my/index.js
import request from '../../utils/request.js';
import APIs from '../../config/api.js';
import {co, Promise, regeneratorRuntime} from '../../utils/co-loader';

let app = getApp()

Page({
    data: {
        '__modal__': {
            show: false
        },
        name: '用户昵称',     // 用户昵称
        avatar: '/images/avatar_moren_daishu.png',   // 用户头像
        mbeanCount: 0,   // 妈豆数
        couponCount: 0,   // 优惠券数
        waitPayOrderCount: 0,        // 待付款
        waitDeliverOrderCount: 0,    // 待发货
        waitReceiveOrderCount: 0,    // 待收货
        waitCommentOrderCount: 0    // 待评价
    },
    onLoad() {
        const me = this;
        co(function *() {
            const userInfo = yield app.getUserInfo();
            if(!userInfo.mmh){
                // 跳转绑定页面
                console.warn('用户未登录,需要跳转登录页~');
            }
            let {memberNickName:name, headPic:avatar} = userInfo.mmh;
            me.setData({name, avatar});
            request({
                login:true,
                url: APIs.getCenterInfo,
                success(res) {
                    me.setData(res.data);
                }
            })
        })
    },
    onReady(){
    }
});