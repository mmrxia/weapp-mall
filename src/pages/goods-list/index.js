let app = getApp();

Page({
    data: {
        __dialog__: {
            showDialog: false
        },
        goodsList:{
            rows: [
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
        }
    },
    onLoad (){

    },
    /*
    * 显示筛选条件
    * */
    showFilter(){
        this.setData({
            '__dialog__.showDialog': true,
            '__dialog__.content': {}
        })
    },
    closeDialog(){
        this.setData({
            '__dialog__.showDialog': false
        })
    }
});