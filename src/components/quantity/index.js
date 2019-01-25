Component({
    properties: {
        quantity: {
            type: Number,
            value: 1,
        },
        quantityLimit: {
            type: Number,
            value: 10000,
        }
    },
    data: {},
    methods: {
        /*
       * 数量减少
       * */
        quantity_decrement() {
            let _count = this.data.quantity - 1, _min = 1;
            if (_count < _min) return false;
            this.setData({
                quantity: _count
            });
            this.triggerEvent('change', _count);
        },
        /*
        * 数量增加
        * */
        quantity_increment() {
            let _count = this.data.quantity + 1, _max = this.data.quantityLimit;
            if (_count > _max) return false;
            this.setData({
                quantity: _count
            });
            this.triggerEvent('change', _count);
        },
    }
});
