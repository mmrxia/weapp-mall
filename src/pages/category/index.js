import ApiList from  '../../config/api';
import request from '../../utils/request.js';

Page({
    data: {
        types: [{"type":0,"typeId":0,"name":"热门品牌","pic":"a.png","description":""},{"typeId":137,"name":"童装童鞋","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":34,"name":"喂养用品","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":61,"name":"宝宝洗护","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":108,"name":"出行装备","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":89,"name":"寝居用品","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":164,"name":"婴童玩具","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":49,"name":"尿裤湿巾","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1},{"typeId":232,"name":"妈妈专区","pic":"http://bgo.mamhao.cn/null","description":"简短描述","type":1}],
        typeTree: {
            0: [{"type":"0","data":[{"typeId":1,"name":"好孩子","pic":"http://bgo.mamhao.cn/4f9cfee3-71d6-4269-ae5d-c326bf312cd7.png","description":"好孩子旗下包含好孩子中国控股有限公司和好孩子国际控股有限公司，是全球领先的儿童用品公司及中国最大的孕婴童产品全渠道专业零售商和行业领先的销售平台，于1989年由宋郑还在昆山创立，专业从事孕婴童产品的研发、制造及全球范围内的全渠道分销和零售。同时，好孩子还是全球著名的孕婴童品牌。","type":"0"},{"typeId":114,"name":"ELC","pic":"http://bgo.mamhao.cn/99e7ed98-4e19-43d4-b855-a7458d6f5055.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":82,"name":"小龙哈彼","pic":"http://bgo.mamhao.cn/53b0b967-9e3f-47e0-82ff-6aac023abeff.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":64,"name":"mothercare","pic":"http://bgo.mamhao.cn/a1c9340d-3365-4b0b-8901-1db1837b698a.png","description":"Mothercare","type":"0"},{"typeId":101,"name":"SKECHERS","pic":"http://bgo.mamhao.cn/9effb807-a4c7-4ac6-aa62-e524b62677da.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":104,"name":"Family by GB","pic":"http://bgo.mamhao.cn/a7fab5ff-f975-428e-968b-c750f1eaf426.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":70,"name":"Clarks","pic":"http://bgo.mamhao.cn/72a5dc81-bd3c-40db-b6d7-ddd432234366.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":105,"name":"Innosense","pic":"http://bgo.mamhao.cn/d8f37e2c-c035-4c87-8d3e-41fb1f639e6c.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":96,"name":"CONVERSE","pic":"http://bgo.mamhao.cn/61e7cf72-2971-4461-948c-bf9fbac33b1d.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":99,"name":"汤美天地","pic":"http://bgo.mamhao.cn/46bfbc8a-7d7c-42c7-a628-0cc084e366cc.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":79,"name":"Quinny","pic":"http://bgo.mamhao.cn/76386e39-f262-4168-a9a2-e80a26e97403.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":97,"name":"The North Face","pic":"http://bgo.mamhao.cn/a688b6e2-9a67-4797-8a09-ab23ae9464c4.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":110,"name":"玛格罗兰","pic":"http://bgo.mamhao.cn/81b8d4cc-ad03-49a5-b7c0-3ca828ae2837.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":72,"name":"adidas","pic":"http://bgo.mamhao.cn/581926d6-c247-4d1b-b5af-852468e32fa8.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"},{"typeId":75,"name":"NIKE","pic":"http://bgo.mamhao.cn/8de090c9-a5d4-4353-be1a-91fea4f8cc85.png","description":"我是NIKE","type":"0"},{"typeId":89,"name":"PUMA","pic":"http://bgo.mamhao.cn/918b8220-b0a6-42af-9027-36b17d42d318.png","description":"品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试品牌类目列表改版测试","type":"0"}]}],"banner":[]
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
    tapType(e){
        const currType = e.currentTarget.dataset.typeId;
        this.setData({
            currType: currType
        });
        this.getTypeTree(currType);
    },
    // 加载品牌、二级类目数据
    getTypeTree (currType) {
        const me = this, _data = me.data;
        if(!_data.typeTree[currType]){
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