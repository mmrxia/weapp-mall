import regeneratorRuntime from '../../libs/regenerator-runtime';
import cfg from '../../config/index';

const app = getApp();
Page({
    data: {
        userInfo: {},
        quantity: 1,
        slideMenu: {
            list: [{
                id: 123,
                title: '测试侧滑菜单组件123'
            }, {
                id: 456,
                title: '测试侧滑菜单组件456'
            }]
        },
        numRoll: {
            value: 9593
        }
    },
    onLoad() {

    },
    onPullDownRefresh(){
        this.setData({
            'numRoll.value': 23456
        });
        this.selectComponent('#num-roll').init();
    },
    /*
    * 数量变化
    * */
    onQuantityChange(e) {
        console.info('当前数量变化为： ', e);
        this.setData({
            quantity: e.detail
        });
    },
    /*
    * 侧滑菜单操作
    * */
    onDelete(e) {
        console.info('当前侧滑菜单操作为： ', e);
    },
    /*
    * 显示dialog
    * */
    dialogShow() {
        this.selectComponent('#dialog').show();
    },
    /*
    * 显示dialog
    * */
    dialogConfirm() {
        this.selectComponent('#dialog').hide();
    },

    /*
    * 显示modal
    * */
    modalShow() {
        this.selectComponent('#modal').show();
    },
});
