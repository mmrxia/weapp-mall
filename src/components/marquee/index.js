Component({
    properties: {
        show: {
            type: Boolean,
            value: true
        },
        goods: {
            type: Array,
            value: []
        }
    },
    data: {
        firstName: ['胡', '张', '王', '魏', '张', '李', '董', '崔', '吴', '郑', '冯', '杨', '朱', '王', '曹', '张', '王', '颜', '王', '孙', '李', '秦'],
        city: ['杭州', '上海', '成都', '北京', '哈尔滨', '无锡', '苏州', '南京', '福州', '太原', '杭州', '大连', '鸡西', '襄阳', '临汾', '西安', '厦门', '阜阳', '西安', '济南', '合肥', '沈阳'],
        animationData: {},
        marqueeItem: null
    },
    ready() {
        this.setMarqueeItem();
        this.marquee();
    },
    methods: {
        /*
         * 跑马灯效果
         */
        marquee(opacity = 0, delay = 1000) {
            const animation = wx.createAnimation({
                duration: 600,
                timingFunction: 'ease',
            });

            if (opacity === 1) {
                delay = 3000;
                this.setMarqueeItem();
                animation.opacity(opacity).scale(1).step();
            } else {
                animation.opacity(opacity).scale(0.9).step();
            }
            this.setData({
                animationData: animation.export()
            });
            setTimeout(() => {
                this.marquee(+!opacity);
            }, delay);

        },
        /*
        * 随机展示
        * */
        setMarqueeItem() {
            const marqueeItem = {
                avatar: `./icons/${this.range(1, 22)}.png`,
                name: `${this.random(this.data.firstName)[0]}**`,
                time: this.range(4, 59),
                city: this.random(this.data.city)[0]
            };

            if (this.data.goods[0]) {
                marqueeItem.goods = this.random(this.data.goods)[0];
            }

            this.setData({
                marqueeItem
            });
        },
        random(arr) {
            return arr.sort(() => 0.5 - Math.random());
        },
        range(min, max) {
            return min + Math.round(Math.random() * (max - min));
        },
        // 点击滚动条
        onTap(e) {
            this.triggerEvent('tap', this.data.marqueeItem);
        }
    }
});
