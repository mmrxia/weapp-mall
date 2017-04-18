import ApiList from  '../../config/api';
import request from '../../utils/request.js';

Page({
    data: {
        types: [{
            "type": 0, "typeId": 0, "name": "热门品牌",
        }, {
            "typeId": 137,
            "name": "婴童服饰",
            "type": 1
        }, {
            "typeId": 306,
            "name": "时尚童鞋",
            "type": 1
        }, {
            "typeId": 34,
            "name": "喂养用品",
            "type": 1
        }, {
            "typeId": 61,
            "name": "宝宝洗护",
            "type": 1
        }, {
            "typeId": 108,
            "name": "出行装备",
            "type": 1
        }, {
            "typeId": 89,
            "name": "寝居用品",
            "type": 1
        }, {
            "typeId": 164,
            "name": "玩具早教",
            "type": 1
        }, {
            "typeId": 49,
            "name": "尿裤纸品",
            "type": 1
        }, {
            "typeId": 232,
            "name": "妈妈专区",
            "type": 1
        }, {
            "typeId": 370,
            "name": "奶粉辅食",
            "type": 1
        }
        ],
        typeTree: {
            "0": [{
                "type": "0",
                "data": [
                    {
                    "typeId": 1,
                    "name": "好孩子",
                    "pic": "http://bgo.mamhao.cn/6df62d20-2ec8-4b09-bd28-0ac451aa50ce.jpg",
                    "type": "0"
                }, {
                    "typeId": 64,
                    "name": "mothercare",
                    "pic": "http://bgo.mamhao.cn/ff3ed367-45bf-45b2-82e0-b915a124b755.png",
                    "type": "0"
                }, {
                    "typeId": 63,
                    "name": "NewBalance",
                    "pic": "http://bgo.mamhao.cn/cfd057e8-a088-4469-afaa-1adc47a232e5.png",
                    "type": "0"
                }, {
                    "typeId": 75,
                    "name": "NIKE",
                    "pic": "http://bgo.mamhao.cn/8de090c9-a5d4-4353-be1a-91fea4f8cc85.png",
                    "type": "0"
                }, {
                    "typeId": 203,
                    "name": "Columbia",
                    "pic": "http://bgo.mamhao.cn/e71f34c1-321e-497d-b666-0886487555ca.png",
                    "type": "0"
                }, {
                    "typeId": 79,
                    "name": "Quinny",
                    "pic": "http://bgo.mamhao.cn/76386e39-f262-4168-a9a2-e80a26e97403.png",
                    "type": "0"
                }, {
                    "typeId": 72,
                    "name": "adidas",
                    "pic": "http://bgo.mamhao.cn/c9bd134a-d325-4067-a31b-cf6d20994c51.png",
                    "type": "0"
                }, {
                    "typeId": 119,
                    "name": "BABYBJÖRN",
                    "pic": "http://bgo.mamhao.cn/b7851dde-d22e-4c05-9b4e-0967867da37b.jpg",
                    "type": "0"
                }, {
                    "typeId": 89,
                    "name": "PUMA",
                    "pic": "http://bgo.mamhao.cn/918b8220-b0a6-42af-9027-36b17d42d318.png",
                    "type": "0"
                }, {
                    "typeId": 251,
                    "name": "贝兜",
                    "pic": "http://bgo.mamhao.cn/52f1f545-202d-4caf-b6d1-85020036dc0c.jpg",
                    "type": "0"
                }, {
                    "typeId": 185,
                    "name": "RECARO",
                    "pic": "http://bgo.mamhao.cn/2581ac35-cbf6-489d-a0aa-086ba914ea1b.jpg",
                    "type": "0"
                }, {
                    "typeId": 127,
                    "name": "新安怡",
                    "pic": "http://bgo.mamhao.cn/b51a9ffc-6476-456d-9218-4a727138c389.jpg",
                    "type": "0"
                }, {
                    "typeId": 254,
                    "name": "亨氏",
                    "pic": "http://bgo.mamhao.cn/0a7574a6-43a5-489f-bc0c-aa658d27fa14.jpg",
                    "type": "0"
                }, {
                    "typeId": 114,
                    "name": "ELC",
                    "pic": "http://bgo.mamhao.cn/99e7ed98-4e19-43d4-b855-a7458d6f5055.png",
                    "type": "0"
                }, {
                    "typeId": 68,
                    "name": "CYBEX",
                    "pic": "http://bgo.mamhao.cn/82121bfc-2029-4fc5-8f95-a295668f85f7.png",
                    "type": "0"
                }, {
                    "typeId": 129,
                    "name": "Boori",
                    "pic": "http://bgo.mamhao.cn/555f03d7-4f3b-4885-9383-f94b5708b72c.png",
                    "type": "0"
                }, {
                    "typeId": 97,
                    "name": "The North Face",
                    "pic": "http://bgo.mamhao.cn/a688b6e2-9a67-4797-8a09-ab23ae9464c4.png",
                    "type": "0"
                }, {
                    "typeId": 192,
                    "name": "Silver Cross",
                    "pic": "http://bgo.mamhao.cn/10b80d0e-ed13-4f81-83c7-929f1e4ea5f6.jpg",
                    "type": "0"
                }, {
                    "typeId": 252,
                    "name": "德运/DEVONDALE",
                    "pic": "http://bgo.mamhao.cn/13bfe6c1-f39c-4d45-b548-152c6e9630e7.jpg",
                    "type": "0"
                }, {
                    "typeId": 188,
                    "name": "Travel Buddies",
                    "pic": "http://bgo.mamhao.cn/05f478fe-c815-48eb-be79-a71feda29703.png",
                    "type": "0"
                }, {
                    "typeId": 179,
                    "name": "Sanita U-ZA",
                    "pic": "http://bgo.mamhao.cn/25277e9e-d8d1-4a33-913a-a7ddad068169.jpg",
                    "type": "0"
                }, {
                    "typeId": 96,
                    "name": "CONVERSE",
                    "pic": "http://bgo.mamhao.cn/61e7cf72-2971-4461-948c-bf9fbac33b1d.png",
                    "type": "0"
                }, {
                    "typeId": 131,
                    "name": "Skip Hop",
                    "pic": "http://bgo.mamhao.cn/7bcd73a2-2ba0-4c28-9ea5-bf5a19bba416.png",
                    "type": "0"
                }, {
                    "typeId": 132,
                    "name": "Trunki",
                    "pic": "http://bgo.mamhao.cn/4e994e27-be12-405e-9928-06a588afa225.png",
                    "type": "0"
                }, {
                    "typeId": 168,
                    "name": "奥波",
                    "pic": "http://bgo.mamhao.cn/48985d99-942f-4dcc-a713-dfd992d58f98.png",
                    "type": "0"
                }, {
                    "typeId": 211,
                    "name": "Diono",
                    "pic": "http://bgo.mamhao.cn/70a7e3ea-09e7-4fb8-a2ca-2c125f209511.png",
                    "type": "0"
                }, {
                    "typeId": 182,
                    "name": "Inglesina",
                    "pic": "http://bgo.mamhao.cn/316af2d3-2b50-4d55-8b60-24ef23b7888f.png",
                    "type": "0"
                }, {
                    "typeId": 202,
                    "name": "Reebok",
                    "pic": "http://bgo.mamhao.cn/f0d2a67f-103a-413f-b234-0f360facb0b8.png",
                    "type": "0"
                }, {
                    "typeId": 150,
                    "name": "Chicco",
                    "pic": "http://bgo.mamhao.cn/74747a77-cc6a-47af-8576-83c9c8bb1a52.png",
                    "type": "0"
                }, {
                    "typeId": 160,
                    "name": "Peg Perego",
                    "pic": "http://bgo.mamhao.cn/dff4a489-353a-4a96-9e1e-fc5c5271f7e6.png",
                    "type": "0"
                }, {
                    "typeId": 70,
                    "name": "Clarks",
                    "pic": "http://bgo.mamhao.cn/bbfb2bed-8e5e-48b9-abe2-142e0ced53b1.png",
                    "type": "0"
                }, {
                    "typeId": 124,
                    "name": "Baby Banana",
                    "pic": "http://bgo.mamhao.cn/9aff07c4-50aa-49fe-ba82-c2b39467847c.png",
                    "type": "0"
                }, {
                    "typeId": 255,
                    "name": "micro",
                    "pic": "http://bgo.mamhao.cn/62360f29-d7cd-4625-bb90-4b51236017a6.png",
                    "type": "0"
                }, {
                    "typeId": 155,
                    "name": "BEABA",
                    "pic": "http://bgo.mamhao.cn/a4c7f800-6adf-404c-a58f-a491b3059629.png",
                    "type": "0"
                }, {
                    "typeId": 154,
                    "name": "妙思乐",
                    "pic": "http://bgo.mamhao.cn/b2b8a7db-a05b-4de5-98c4-ab3aa8ee4494.png",
                    "type": "0"
                }, {
                    "typeId": 159,
                    "name": "Nuna",
                    "pic": "http://bgo.mamhao.cn/a50ce550-70c6-47f1-8094-739acb3ef62e.png",
                    "type": "0"
                }, {
                    "typeId": 178,
                    "name": "Sanita-Denti",
                    "pic": "http://bgo.mamhao.cn/e1a853a6-bcf7-4a49-92e7-e0f03b986c13.png",
                    "type": "0"
                }, {
                    "typeId": 165,
                    "name": "Maxi-Cosi",
                    "pic": "http://bgo.mamhao.cn/7c8fdd26-dbea-4fd9-bde4-c4d6bd7becfa.png",
                    "type": "0"
                }, {
                    "typeId": 161,
                    "name": "OKBABY",
                    "pic": "http://bgo.mamhao.cn/43fe3c63-6e52-4383-bcf0-d1c404d37b41.png",
                    "type": "0"
                }, {
                    "typeId": 190,
                    "name": "Britax",
                    "pic": "http://bgo.mamhao.cn/46118521-1db3-4974-ba63-b3c2cf692181.png",
                    "type": "0"
                }, {
                    "typeId": 246,
                    "name": "Nuby",
                    "pic": "http://bgo.mamhao.cn/2f47a0c0-e75b-48e9-9ef9-0837c3d66964.png",
                    "type": "0"
                }, {
                    "typeId": 176,
                    "name": "RAZBABY",
                    "pic": "http://bgo.mamhao.cn/9cc9febd-51f5-42d1-b30f-0508bc74668e.png",
                    "type": "0"
                }, {
                    "typeId": 141,
                    "name": "OXO",
                    "pic": "http://bgo.mamhao.cn/d2b85060-c755-4ec1-8a5f-e903097399be.jpg",
                    "type": "0"
                }, {
                    "typeId": 244,
                    "name": "Manhattan",
                    "pic": "http://bgo.mamhao.cn/fd89f229-b99f-42e9-9267-5ef856400314.png",
                    "type": "0"
                }, {
                    "typeId": 135,
                    "name": "The Gro Company",
                    "pic": "http://bgo.mamhao.cn/681af751-190f-4a50-90b0-0383b173dae0.png",
                    "type": "0"
                }, {
                    "typeId": 214,
                    "name": "Summer Infant",
                    "pic": "http://bgo.mamhao.cn/70ad1cf6-6c21-46f8-bf25-4009755d86c8.png",
                    "type": "0"
                }, {
                    "typeId": 144,
                    "name": "Brother Max",
                    "pic": "http://bgo.mamhao.cn/a26350e2-7109-468d-86b1-4d332de4dd43.png",
                    "type": "0"
                }, {
                    "typeId": 243,
                    "name": "aden+anais",
                    "pic": "http://bgo.mamhao.cn/b12ef45c-47d5-454f-9474-d447a7d544de.jpg",
                    "type": "0"
                }, {
                    "typeId": 101,
                    "name": "SKECHERS",
                    "pic": "http://bgo.mamhao.cn/9effb807-a4c7-4ac6-aa62-e524b62677da.png",
                    "type": "0"
                }, {
                    "typeId": 104,
                    "name": "Family by GB",
                    "pic": "http://bgo.mamhao.cn/a7fab5ff-f975-428e-968b-c750f1eaf426.png",
                    "type": "0"
                }, {
                    "typeId": 153,
                    "name": "walking wings",
                    "pic": "http://bgo.mamhao.cn/a2ceb520-87a7-40d3-a6cb-54c84a705642.jpg",
                    "type": "0"
                }, {
                    "typeId": 137,
                    "name": "bubble",
                    "pic": "http://bgo.mamhao.cn/6961f92c-0db5-4987-8a51-763f74deedd0.png",
                    "type": "0"
                }, {
                    "typeId": 138,
                    "name": "GEOX",
                    "pic": "http://bgo.mamhao.cn/0606efea-7e48-4884-9714-1d9b4c0f1a19.png",
                    "type": "0"
                }, {
                    "typeId": 235,
                    "name": "easywalker",
                    "pic": "http://bgo.mamhao.cn/3b3cfc22-6451-4c87-9000-490748578a47.jpg",
                    "type": "0"
                }, {
                    "typeId": 189,
                    "name": "Wilson",
                    "pic": "http://bgo.mamhao.cn/e3194c81-0d3d-4bcb-8bd7-f9b36c232acf.png",
                    "type": "0"
                }, {
                    "typeId": 146,
                    "name": "Ben Bat",
                    "pic": "http://bgo.mamhao.cn/5c58e1da-2891-44f9-85fd-7dd1c91b3b9d.png",
                    "type": "0"
                }, {
                    "typeId": 187,
                    "name": "zo·li",
                    "pic": "http://bgo.mamhao.cn/c37e69eb-7b85-4461-b46e-4b978ab775a7.png",
                    "type": "0"
                }, {
                    "typeId": 148,
                    "name": "EZEE REACH",
                    "pic": "http://bgo.mamhao.cn/53644e98-a839-4ed9-824e-f13ebe3619aa.jpg",
                    "type": "0"
                }, {
                    "typeId": 134,
                    "name": "pearhead",
                    "pic": "http://bgo.mamhao.cn/87eaf26d-e0cd-4c26-a65a-ddb614c30aa4.png",
                    "type": "0"
                }, {
                    "typeId": 136,
                    "name": "Hippychick",
                    "pic": "http://bgo.mamhao.cn/18b22852-2207-42b3-960f-7aea6f7735a7.png",
                    "type": "0"
                }, {
                    "typeId": 221,
                    "name": "小龙哈彼",
                    "pic": "http://bgo.mamhao.cn/bdf59bfe-402c-40d7-b5eb-d3435f81a852.jpg",
                    "type": "0"
                }]
            }]
        },       // 数据缓存
        currType: 0       // 当前类型
    },
    onLoad (){
        var me = this;
        request({
            url: ApiList.goodsType,
            success: function (res) {
                me.setData({
                    types: res.data.data
                });
            }
        });
        this.getTypeTree(this.data.currType);
    },
    changeType(e){
        const currType = e.currentTarget.dataset.typeId;
        this.setData({
            currType: currType
        });
        this.getTypeTree(currType);
    },
    // 加载品牌、二级类目数据
    getTypeTree (currType) {
        const me = this, _data = me.data;
        if (!_data.typeTree[currType]) {
            request({
                url: ApiList.goodsTypeTree,
                data: {typeId: +currType},
                success: function (res) {
                    me.setData({
                        [`typeTree.${currType}`]: res.data.data
                    });
                }
            });
        }
    }
})