Component({
    properties: {
        height: {
            type: Number,
            value: 150
        },
        callback: {
            type: Boolean,
            default: false
        }
    },
    data: {
        swipeCheckX: 35,            //激活检测滑动的阈值
        swipeCheckState: 0,         //0未激活 1激活
        maxMoveLeft: 75,            //列表项最大左滑距离
        correctMoveLeft: 75,        //显示菜单时的左滑距离
        thresholdMoveLeft: 38,      //左滑阈值，超过则显示菜单
        moveX: 0,                   //记录平移距离
        showState: 0,               //0 未显示菜单 1显示菜单
        touchStartState: 0,         // 开始触摸时的状态 0 未显示菜单 1 显示菜单
        swipeDirection: 0,          //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
    },
    methods: {
        ontouchstart(e) {
            if (this.data.showState === 1) {
                this.data.touchStartState = 1;
                this.data.showState = 0;
                this.data.moveX = 0;
                this.translateXItem(0, 300);
                return;
            }
            this.firstTouchX = e.touches[0].clientX;
            this.firstTouchY = e.touches[0].clientY;
            if (this.firstTouchX > this.data.swipeCheckX) {
                this.data.swipeCheckState = 1;
            }
        },

        ontouchmove(e) {
            if (this.data.swipeCheckState === 0) {
                return;
            }
            //当开始触摸时有菜单显示时，不处理滑动操作
            if (this.data.touchStartState === 1) {
                return;
            }
            let moveX = e.touches[0].clientX - this.firstTouchX;
            let moveY = e.touches[0].clientY - this.firstTouchY;
            //已触发垂直滑动，由scroll-view处理滑动操作
            if (this.data.swipeDirection === 2) {
                return;
            }
            //未触发滑动方向
            if (this.data.swipeDirection === 0) {
                //触发垂直操作
                if (Math.abs(moveY) > 4) {
                    this.data.swipeDirection = 2;
                    return;
                }
                //触发水平操作
                if (Math.abs(moveX) > 4) {
                    this.data.swipeDirection = 1;
                    this.triggerEvent('moving', true);
                } else {
                    return;
                }

            }

            //处理边界情况
            if (moveX > 0) {
                moveX = 0;
            }
            //检测最大左滑距离
            if (moveX < -this.data.maxMoveLeft) {
                moveX = -this.data.maxMoveLeft;
            }
            this.data.moveX = moveX;
            this.translateXItem(moveX, 0);
        },
        ontouchend(e) {
            this.data.swipeCheckState = 0;
            let swipeDirection = this.data.swipeDirection;
            this.data.swipeDirection = 0;
            if (this.data.touchStartState === 1) {
                this.data.touchStartState = 0;
                this.triggerEvent('moving', false);
                return;
            }
            //垂直滚动，忽略
            if (swipeDirection !== 1) {
                return;
            }
            if (this.data.moveX === 0) {
                this.data.showState = 0;
                //不显示菜单状态下,激活垂直滚动
                this.triggerEvent('moving', false);
                return;
            }
            if (this.data.moveX === this.data.correctMoveLeft) {
                this.data.showState = 1;
                return;
            }
            if (this.data.moveX < -this.data.thresholdMoveLeft) {
                this.data.moveX = -this.data.correctMoveLeft;
                this.data.showState = 1;
            } else {
                this.data.moveX = 0;
                this.data.showState = 0;
            }

            this.triggerEvent('moving', false);
            this.translateXItem(this.data.moveX, 300);
        },
        translateXItem(moveX, duration) {
            let animation = wx.createAnimation({duration: duration});
            animation.translateX(moveX).step();
            this.setData({
                animation: animation.export()
            });
        },
        /*
        * 刪除操作
        * */
        onSlideMenuDelete(e) {
            this.triggerEvent('delete');
            if (!this.callback) {
                this.removeDom();
            }
        },
        /*
        * 移出dom
        * this.selectComponent(id).removeDom(callback);
        * */
        removeDom(cb) {
            const duration = 200;
            let animation = wx.createAnimation({duration});
            animation.height(0).opacity(0).step();
            this.setData({
                wrapAnimation: animation.export()
            });
            this.data.showState = 0;
            this.triggerEvent('moving', false);

            //回调函数
            cb && this.wait(duration).then(cb);
        },
        /*
        * setTimeout
        * */
        wait(delay) {
            return new Promise(resolve => {
                setTimeout(resolve, delay || 0);
            });
        }
    },

});
