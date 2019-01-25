import regeneratorRuntime from '../../../libs/regenerator-runtime';

const app = getApp();
Page({
    data: {
        goodsBanner: [
            '//img12.360buyimg.com/n1/s450x450_jfs/t1/27491/2/4431/289258/5c321c30E280237c3/86ed242b2360a2cd.jpg',
            '//img12.360buyimg.com/n1/s450x450_jfs/t1/18848/17/4571/212369/5c32ce88E1ddec98d/67af5d6fb1577cd3.jpg',
            '//img12.360buyimg.com/n1/s450x450_jfs/t1/7211/16/8954/485449/5c1088ecE9884e066/542088e742e6169c.jpg'
        ]
    },
    onLoad() {

    },

    // 添加购物车
    addCart() {
        this.selectComponent('#dialog_sku').show();
        this.data.skuTarget = 1;
    },

    // 立即购买
    async buyGoods() {
        this.selectComponent('#dialog_sku').show();
        this.data.skuTarget = 2;
    },
    /*
    * 点击sku确认
    * */
    async sku_confirm(e) {
        const sku_detail = e.detail;
        console.log('sku_confirm', sku_detail);

        this.selectComponent('#dialog_sku').hide();
    },
});
