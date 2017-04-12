// pages/stores/index.js
import ApiList from  '../../config/api';
import request from '../../utils/request';
import promisify from '../../utils/promisify';

let app = getApp();

Page({
    data: {
        __dialog__: {
            showDialog: false
        },
        "bannerList": [
            {
                "pic":"http://bgo.mamhao.cn/1627db37-16c3-4708-920a-9409ca6f46ac.jpg@100p_90q",
                "linkType":9,
                "linkTo":"137",
                "linkName":""
            },
            {
                "pic":"http://bgo.mamhao.cn/b26087f8-5323-4873-a2a6-87669e179fa5.jpg@100p_90q",
                "linkType":2,
                "linkTo":"3456",
                "itemNumId":100
            },
            {
                "pic":"http://bgo.mamhao.cn/00700303-45f1-4bc3-a190-1fb102bf3dc7.jpg@100p_90q",
                "linkType":8,
                "linkTo":"1"
            },
            {
                "pic":"http://bgo.mamhao.cn/c8cb7aa2-c285-453c-ad2a-7e565d8caf05.jpg@100p_90q",
                "linkType":8,
                "linkTo":"1"
            },
            {
                "pic":"http://bgo.mamhao.cn/8936693b-97ff-46a4-b6ec-57d93842fcea.jpg@100p_90q",
                "linkType":8,
                "linkTo":"1"
            }
        ],
        "nav":  {
            "pic":"http://bgo.mamhao.cn/15798732-c55c-470d-9fec-72031c88a2d4.jpg@100p.png",
            "linkType":8,
            "linkTo":"1"
        },
        "shopList": [
            {
                "shopId":43388,
                "lng":120.165651,
                "lat":30.243801,
                "shopAddr":"杭州市上城区延安路98号银泰西湖店地下一楼",
                "shopName":"PUMA Kids银泰西湖店",
                "shopLogo":"http://bgo.mamhao.cn/f8e3bb18-cd83-4f33-9171-511a8c281585.jpg",
                "type":1, //
                //标识该门店类型 1-热门店 2-购买过 3-关注店 4-附近店
                "shopActList": [
                    {
                        "iconName":"满减",
                        "iconColor":"#ff4d61",
                        "actName":"满5000减1000,满10000减2000  满5000减1000,满10000减2000 满5000减1000,满10000减2000"
                    },
                    {
                        "iconName":"公告",
                        "iconColor":"#ff4d61",
                        "actName":"满5000减1000,满10000减2000  满5000减1000,满10000减2000 满5000减1000,满10000减2000"
                    }
                ]
            },
            {
                "shopId":43388,
                "lng":120.165651,
                "lat":30.243801,
                "shopAddr":"杭州市上城区延安路98号银泰西湖店地下一楼",
                "shopName":"PUMA Kids银泰西湖店",
                "shopLogo":"http://bgo.mamhao.cn/f8e3bb18-cd83-4f33-9171-511a8c281585.jpg",
                "type":1, //
                //标识该门店类型 1-热门店 2-购买过 3-关注店 4-附近店
                "shopActList": [
                    {
                        "iconName":"公告",
                        "iconColor":"#ff4d61",
                        "actName":"满5000减1000,满10000减2000"
                    },
                    {
                        "iconName":"满减",
                        "iconColor":"#ff4d61",
                        "actName":"满5000减1000,满10000减2000"
                    }
                ]
            }
        ],
        "totalRow":100
    },
    onLoad (options){
        // 页面初始化 options为页面跳转所带来的参数



        /*wx.request({
            method: 'post',
            url: ApiList.storeList,
            success: function (res) {
                console.log(res)
            }
        })*/
    },
    switchAddress(){
        const me = this;
        request({
            url: ApiList.deliveryAddr,
            login: true,
            success(res){
                console.log('deliveryAddr',res)
                me.setData({
                    '__dialog__.showDialog': true,
                    '__dialog__.content': res.data
                })
            }
        })

    },
    closeDialog(){
        this.setData({
            '__dialog__.showDialog': false
        })
    },
    onShareAppMessage (){
        return {
            title: '门店购',
            path: 'pages/stores/index'
        }
    }
});