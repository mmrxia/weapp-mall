Component({
    options: {
        multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        slot: {
            type: Boolean,
            value: false
        },
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: '提示'
        },
        content: {
            type: String,
            value: 'modal内容'
        }
    },
    data: {},
    methods: {
        /*
        * 初始化数据
        * */
        display(params){
            this.setData({
                ...params
            });
        },
        // 打开弹窗
        show() {
            this.setData({
                show: true
            });
        },
        // 关闭弹窗
        hide() {
            this.setData({
                show: false
            });
        },
        /*
        * 点击取消
        * */
        cancel(){
            this.setData({
                show: false
            });
        },
        /*
        * 点击确定
        * */
        confirm(){
            console.log('tap confirm');
        },
        /*
        * doNothing
        * */
        doNothing(){
            return false;
        }
    }
});
