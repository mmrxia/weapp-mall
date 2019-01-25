import regeneratorRuntime from '../../libs/regenerator-runtime';
import cfg from '../../config/index';
const app = getApp();
Component({
    properties: {
        info: {
            type: Object,
            default: {}
        },
        quantity: {
            type: Number,
            value: 1,
        }
    },
    data: {
        checkedInfo: {}
    },
    ready() {
        this.triggerEvent('ready');
    },
    methods: {
        /*
        * 选中sku
        * */
        skuClick(e) {

        },
        /*
        * 修改数量
        * */
        onQuantityChange(e) {
            this.data.quantity = e.detail;
        },
        /*
        * 确认sku
        * */
        sku_confirm() {
            this.triggerEvent('confirm');
        },
        /*
        * 获取当前选择的详细信息
        * */
        getCheckedInfo(checkedValue) {

        }
    }
});
