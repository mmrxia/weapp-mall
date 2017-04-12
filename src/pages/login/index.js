import ApiList from  '../../config/api.js';
import request from '../../utils/request';
import {co, Promise, regeneratorRuntime} from '../../utils/co-loader';

let app = getApp();

Page({
    data: {
        userInfo: null,
        vcodeBtn: {
            text:'获取验证码',
            disabled: false
        }
    },
    onLoad (){
        app.WeToast();

        const me = this;
        co(function *() {
            const userInfo = yield app.getUserInfo();
            me.setData({
                userInfo: userInfo.wx
            });
        });
    },
    getVcode(){
        this.setData({
            'vcodeBtn.text':'重发(58)秒',
            'vcodeBtn.disabled': true
        })
    },
    bindAccount(e){
        const wx_user = this.data.userInfo;
        let {mobile, vcode} = e.detail.value;

        if(!/^1[3,4,5,7,8]\d{9}$/.test({mobile})){
            this.wetoast.toast({
                icon: 'fail',
                title: '手机号输入不正确'
            });
        }

        request({
            url: ApiList.bind,
            data: Object.assign({mobile, vcode}, {
                unionId: wx_user.unionId,
                openId: wx_user.openId,
                nickName: wx_user.nickName,
                thirdHeadPic: wx_user.avatarUrl
            }),
            success(res){

            }
        })
    }
});