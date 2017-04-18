import ApiList from  '../../config/api';
import request from '../../utils/request.js';
import Map from '../../utils/map'

let app = getApp();

Page({
    data: {
        "basicInfo": {
            "shopId":38948,
            "shopName":"NIKE Kids银泰西湖店",
            "shopTel":"4000-123-990",
            "shopLogo":"http://bgo.mamhao.cn/fb3fef77-7a46-472b-99b0-5a006d09fe36.png@95q.jpg",
            "pic":"http://bgo.mamhao.cn/f8e3bb18-cd83-4f33-9171-511a8c281585.jpg@640w_306h_1e_100q.jpg",
            "shopAddr":"好孩子杭州银泰西湖PUMA 店",
            "lng":"120.165651",
            "lat":"30.243801",
            "companyId":31,
            "distance":0,
            "workingTime":"营业时间 9:00-21:00"
        },
        "comment": {
            "rating":17.5,
            "commentCount":5,
            "people": [
                {
                    "memberId":384,
                    "memberHeadPic":"http://cmi.mamhao.cn/member-head-images/384/871b9c2437cbc283ea1dd1c13971d2f2"
                },
                {
                    "memberId":360,
                    "memberHeadPic":"http://cmi.mamhao.cn/member-head-images/360/af89c1d2d8dbe60567f8563e2a899656"
                },
                {
                    "memberId":360,
                    "memberHeadPic":"http://cmi.mamhao.cn/member-head-images/defaultHeadPic/default.png@50w_50h_100q.jpg"
                },
                {
                    "memberId":2736,
                    "memberHeadPic":"http://cmi.mamhao.cn/member-head-images/2736/719199d60e131569cd8caddb9263e929.jpg@50w_50h_100q.jpg"
                },
                {
                    "memberId":886697,
                    "memberHeadPic":"http://cmi.mamhao.cn/member-head-images/2980/f6b414e02cf1912728220118b970ca49@50w_50h_100q.jpg"
                }
            ]
        },
        "shopActList": [
            {
                "iconName":"公告",
                "iconColor":"#ff4d61",
                "actName":"满5000减1000,满10000减2000",
                "landingType":2,
                "landingDesc":"http://www.baidu.com",
                "landingName":"类目标题",
                "itemNumId":111111,
                "sort":2
            },
            {
                "iconName":"满减",
                "iconColor":"#ff4d61",
                "actName":"满5000减1000,满10000减2000",
                "landingType":2,
                "landingDesc":"http://www.baidu.com",
                "landingName":"类目标题",
                "itemNumId":"",
                "sort":1
            }
        ],
        "shopServiceLabels": [
            {
                "tagId":610,
                "tagTitle":"送货上门",
                "tagPic":"http://bgo.mamhao.cn/shop/service/b1fdd6a6-4c73-4515-9aac-853417d28709.png",
                "tagDesc":"在门店支持的配送区域内下单，选择门店配送，最快3小时送达",
                "orderBy":4,
                "isDelete":0
            },
            {
                "tagId":608,
                "tagTitle":"积分共享",
                "tagPic":"http://bgo.mamhao.cn/shop/service/b8b00439-bd0d-4e2e-8daf-a7daff719d26.png",
                "tagDesc":"在自营门店购物获赠积分，可在妈妈好app直接抵扣现金；在app购物获赠妈豆，可在门店扫码支付时抵扣现金",
                "orderBy":3,
                "isDelete":0
            },
            {
                "tagId":609,
                "tagTitle":"上门退换",
                "tagPic":"http://bgo.mamhao.cn/shop/service/823420aa-42e6-4c35-bcc8-f43fc18e8d30.png",
                "tagDesc":"下单后在app端发起上门退/换货服务，将有专业的门店配送人员上门取/换货",
                "orderBy":2,
                "isDelete":0
            },
            {
                "tagId":611,
                "tagTitle":"预约安装",
                "tagPic":"http://bgo.mamhao.cn/shop/service/1e0c4af9-e764-4ebd-91f0-994c5662b234.png",
                "tagDesc":"推车，婴儿床、汽车安全座、餐椅、电动车等大件商品享受专业团队上门安装和维修",
                "orderBy":1,
                "isDelete":0
            }
        ],
        "typeList": [
            {
                "typeId":1,
                "typeName":"童车",
                "link":"",
                "type":0, // 0 标识原类目，1 新类目
                "linkType":0 // 商品列表 1 H5
            },
            {
                "typeId":2,
                "typeName":"上新",
                "link":"http://www.baidu.com",
                "type":1,
                "linkType":1
            },
            {
                "typeId":2,
                "typeName":"服饰",
                "link":"http://www.baidu.com",
                "type":1,
                "linkType":1
            },
            {
                "typeId":2,
                "typeName":"推车",
                "link":"http://www.baidu.com",
                "type":1,
                "linkType":1
            },
            {
                "typeId":2,
                "typeName":"鞋类",
                "link":"http://www.baidu.com",
                "type":1,
                "linkType":1
            },
            {
                "typeId":2,
                "typeName":"童车",
                "link":"http://www.baidu.com",
                "type":1,
                "linkType":1
            }
        ],
        goodsList:[
            {
                "formartTotalSale":"1",
                "goodsPic":"http://img.mamhao.cn/PM073598/main_PM073598_01.jpg",
                "itemId":356720,
                "itemName":"PUMA彪马儿童卡通双肩书包（钠矿蓝）",
                "price":239,
                "proFlag":1,
                "proLabel":"",
                "proTag": [
                    1,7,4
                ],
                "retailPrice":239,
                "styleId":"PM073598",
                "templateId":189192,
                "totalSale":1
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADAB2224/main_ADAB2224_01.jpg",
                "itemId":335002,
                "itemName":"adidas阿迪达斯女童袜（一套三双）",
                "price":79,
                "proFlag":2,
                "proLabel":"",
                "proTag": [
                    1,5
                ],
                "retailPrice":79,
                "styleId":"ADAB2224",
                "templateId":184186,
                "totalSale":0
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADAB2223/main_ADAB2223_01.jpg",
                "itemId":334475,
                "itemName":"adidas阿迪达斯可爱印花儿童袜（3双）",
                "price":79,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":79,
                "styleId":"ADAB2223",
                "templateId":184185,
                "totalSale":0
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADS23096/main_ADS23096_01.jpg",
                "itemId":324089,
                "itemName":"adidas阿迪达斯经典男童背包",
                "price":199,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":199,
                "styleId":"ADS23096",
                "templateId":182041,
                "totalSale":0
            },
            {
                "formartTotalSale":"1",
                "goodsPic":"http://img.mamhao.cn/ADS23089/main_ADS23089_01.jpg",
                "itemId":323142,
                "itemName":"adidas阿迪达斯儿童背包",
                "price":199,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":199,
                "styleId":"ADS23089",
                "templateId":182039,
                "totalSale":1
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADS20512/main_ADS20512_01.jpg",
                "itemId":322490,
                "itemName":"adidas阿迪达斯儿童运动帽（白色）",
                "price":89,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":89,
                "styleId":"ADS20512",
                "templateId":181947,
                "totalSale":0
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADS20461/main_ADS20461_01.jpg",
                "itemId":322360,
                "itemName":"adidas阿迪达斯男童经典鸭舌帽（白色）",
                "price":99,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":99,
                "styleId":"ADS20461",
                "templateId":181944,
                "totalSale":0
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADS20460/main_ADS20460_01.jpg",
                "itemId":322354,
                "itemName":"adidas阿迪达斯男大童鸭舌帽（黑/白）",
                "price":99,
                "proFlag":1,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":99,
                "styleId":"ADS20460",
                "templateId":181943,
                "totalSale":0
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADS20449/main_ADS20449_01.jpg",
                "itemId":322350,
                "itemName":"adidas阿迪达斯经典鸭舌帽（亮荧光粉）",
                "price":129,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":129,
                "styleId":"ADS20449",
                "templateId":181942,
                "totalSale":0
            },
            {
                "goodsPic":"http://img.mamhao.cn/ADS02159/main_ADS02159_01.jpg",
                "itemId":322153,
                "itemName":"adidas阿迪达斯条纹图案短袜",
                "price":99,
                "proFlag":2,
                "proLabel":"",
                "proTag": [

                ],
                "retailPrice":99,
                "styleId":"ADS02159",
                "templateId":181869,
                "totalSale":0
            }
        ]
    },
    onLoad (options){
        const me = this;

        request({
            location: true,
            url: ApiList.storeInfo,
            data: {shopId: options.shopId},
            success(res){

            }
        });

        request({
            url: ApiList.storeGoodsList,
            data: {shopId: options.shopId},
            success(){

            }
        });


        //重排proTag
        me.data.goodsList.map((v, i)=>{
            const rules= [4,7,5,1];
            return v.proTag = v.proTag.map(function (v) {
                return {index: rules.indexOf(v), value: v};
            }).sort(function (a, b) {
                return a.index - b.index;
            }).map(function (v) {
                return v.value
            });
        });

        me.setData({
            goodsList: me.data.goodsList
        })

    },
    /*
    * 显示地图
    * */
    showMap(){
        const me = this, _shop = me.data.basicInfo;
        if(_shop){
            wx.openLocation({
                latitude: +_shop.lat,
                longitude: +_shop.lng,
                name: _shop.shopName,
                address: _shop.shopAddr,
                complete(res){
                    console.log('wx.openLocation--->',res)
                }
            })
        }
    },
    /*
    * 拨打客服
    * */
    callService(){
        const me = this;
        wx.makePhoneCall({
            phoneNumber: me.data.basicInfo.shopTel
        })
    }
});