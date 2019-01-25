Component({
    options: {
        multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        show: {
            type: Boolean,
            value: false
        }
    },
    data: {},
    methods: {
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

    }
});
