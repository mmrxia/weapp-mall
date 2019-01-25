import regeneratorRuntime from '../libs/regenerator-runtime';
/*
 * 将浮点数去除小数点，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param n {number} 浮点数
 * return {object}
 * {num: 314, times: 100}
 * */
const fnMathExt = function () {

    function toInt(n) {
        n = +n;
        var res = {num: n, times: 1};
        if (n !== (n | 0)) { //判断浮点数，n===parseInt(n)
            var arr = ('' + n).split('.');
            var len = arr[1].length; //小数长度
            res.times = Math.pow(10, len); //需要乘的倍数=>10的指数
            res.num = Math.round(n * res.times); //四舍五入取整
        }
        return res;
    }

    function operation(a, b, op) {
        var result; //最终计算的值
        var o1 = toInt(a), o2 = toInt(b);

        var n1 = o1.num, t1 = o1.times;
        var n2 = o2.num, t2 = o2.times;

        var max = Math.max(t1, t2);

        switch (op) {
            case 'add':
                if (t1 > t2) {
                    result = n1 + n2 * (t1 / t2);
                } else {
                    result = n2 + n1 * (t2 / t1);
                }
                result = result / max;
                break;
            case 'subtract':
                if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2);
                } else {
                    result = n1 * (t2 / t1) - n2;
                }
                result = result / max;
                break;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                return result;
            case 'divide':
                result = (n1 / n2) * (t2 / t1);
                return result;

        }
        return result;
    }

    /*加*/
    function add(a, b) {
        return operation(a, b, 'add');
    }

    /*减*/
    function subtract(a, b) {
        return operation(a, b, 'subtract');
    }

    /*乘*/
    function multiply(a, b) {
        return operation(a, b, 'multiply');
    }

    /*除*/
    function divide(a, b) {
        return operation(a, b, 'divide');
    }

    //exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    };
};
Object.assign(Math, fnMathExt());


Object.assign(JSON, {
    /**
     * 序列化json对象为string
     * {a: 1, b: 2} --> a=1&b=2
     */
    param: function (n) {
        var e = [];
        for (var o in n) e.push(encodeURIComponent(o) + '=' + encodeURIComponent(null == n[o] ? '' : n[o]));
        return e.join('&').replace(/%20/g, '+');
    }
});


/*
 * 扩展Array方法
 * 数组去重，支持数组内存储的是对象
 * */
Array.prototype.unique = function () {
    const res = [], json = {}, len = this.length;
    for (let i = 0; i < len; i++) {
        let key = this[i];
        if (Object.prototype.toString.call(this[i]) == '[object Object]') {
            key = JSON.stringify(this[i]);
        }
        if (!json[key]) {
            res.push(this[i]);
            json[key] = 1;
        }
    }
    return res;
};

//时间对象的格式化 Date.format("yyyy-MM-dd hh:mm:ss");
Date.prototype.format = function (b) {
    let c = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(b)) {
        b = b.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let a in c) {
        if (new RegExp('(' + a + ')').test(b)) {
            b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ('00' + c[a]).substr(('' + c[a]).length));
        }
    }
    return b;
};

/**防止页面快速点击可以重复触发调用方法 app.preventMoreTap()
 * let app = getApp();
 * Page({
 *   xxx: function (e) {
 *       if (app.multiTap(e))  return;
 *      }
 *   })
 */
const multiTap = function (e) {
    let lastTime = this.globalLastTapTime || 0;
    let result = e.timeStamp - lastTime < 500;
    this.globalLastTapTime = e.timeStamp;
    return result;
};

export default {multiTap};

