Component({
    properties: {
        value: {
            type: Number,
            value: 0
        },
        grid: {
            type: Number,
            value: 6
        }
    },
    data: {
        numArr: [],
        number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    ready() {
        this.init();
    },
    methods: {
        init(reset = false) {
            this.initNum();

            reset && this.doAnimation(reset);

            setTimeout(() => {
                this.doAnimation();
            }, 200);
        },
        /*
        * 初始化数据
        * */
        initNum() {
            const numStr = this.prefixInteger(this.data.value, this.data.grid);
            this.data.numArr = numStr.split('').map(v => ({num: +v}));
            this.setData({
                numArr: this.data.numArr
            });
        },
        /*
        * 滚动动画
        * */
        doAnimation(reset) {
            const animation = wx.createAnimation({
                duration: reset ? 0 : 1800,
                timingFunction: 'ease',
            });

            const {numArr} = this.data;
            numArr.forEach(v => {
                if (v) {
                    v.animationData = animation.translateY(reset ? 0 : `-${v.num}0%`).step().export();
                }
            });

            this.setData({
                numArr
            });
        },
        /*
        * 数字前补0
        * */
        prefixInteger(num, length) {
            return (Array(length).join('0') + num).slice(-length);
        }

    }
});
