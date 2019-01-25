/*
* 使用示例：
* <component-image src="{{item}}" mode="aspectFill" bind:error='error' bind:load='load' lazyload='true'></component-image>
* */
Component({
    properties: {
        src: {
            type: String,
            value: ''
        },
        mode: {
            type: String,
            value: 'scaleToFill'
        },
        lazyload: {
            type: Boolean,
            value: false
        }
    },
    data: {
        visible: false
    },
    methods: {
        /*
        * 加载完成
        * */
        loaded() {
            this.setData({
                visible: true
            });
            this.triggerEvent('load');
        },
        /*
        * 加载出错
        * */
        error() {
            this.setData({
                visible: true
            });
            this.triggerEvent('error');
        }
    }
});
