// 全局过滤器
export default {
    // 小数点后补多位0   ==>  12.00000000 || 12.12340000
    formatZero(number = 0, n = 8) {
        if (n <= 0) {
            return Math.round(number);
        }
        number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); // 四舍五入
        number = Number(number).toFixed(n); // 补足位数
        return number;
    },
    // 数据格式化保留小数点   ==>  12,345.12 || 12345.12
    formatNumber(value = 0, precision = 2, string = true) {
        const multiple = Math.pow(10, precision);
        if (string) {
            return (Math.round(value * multiple) / multiple).toLocaleString();
        } else {
            return (Math.round(value * multiple) / multiple);
        }
    },
    // 格式化日期 ==> 2018-01-01 08:00:00
    formatDate(input, b = 'yyyy-MM-dd hh:mm:ss') {
        if (!input) return '-';
        const date = new Date(Number(input) || input.replace(/-/gi, '/'));
        const c = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(b)) {
            b = b.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const a in c) {
            if (new RegExp('(' + a + ')').test(b)) {
                b = b.replace(RegExp.$1, RegExp.$1.length === 1 ? c[a] : ('00' + c[a]).substr(('' + c[a]).length));
            }
        }
        return b;
    },
    // 秒转换成天时分 ==> 1d 12h 59m
    formatSecond(time) {
        if (!time) return;
        const between = Number(time);
        const day = parseInt(between / 86400, 10); // 天
        const hour = parseInt((between - day * 86400) / 3600, 10); // 小时
        const minute = parseInt((between - day * 86400 - hour * 3600) / 60, 10); // 分
        return `${day}d ${hour}h ${minute}m`;
    },
    // 格式化商品数据
    formatCount(count) {
        const UNIT_ARRAY = ['', '万', '亿', '万亿', '兆', '万兆'];
        let exponent; let result = '';

        if (count > 0) {
            exponent = Math.floor(Math.log(count) / Math.log(10000));
            const val = (count / Math.pow(10000, exponent)).toFixed(1);
            result = val.replace(/\.0$/, '') + UNIT_ARRAY[exponent];
        } else if (count === 0) {
            result = 0;
        }
        return result;
    }
};
