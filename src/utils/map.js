/*
 * 地理位置相关方法
 * by xqs 2018/11/21
 * */
import Map from '../libs/amap-wx.js';
import cfg from '../config/index.js';

const __map = new Map.AMapWX({
    key: cfg.amap_key     //高德地图key
});

export default {
    /*
     * 获取地址描述数据
     * 数据结构(8个字段)：经纬度、区域ID、省市区、街道、数据标识source
     * */
    getRegeo() {
        return new Promise((resolve, reject) => {
            //优先级：当前切换的地址、gps定位地址、默认定义的地址
            /* step: 1 */
            let result = cfg.location.current || cfg.location.gps;
            if (result) {
                return resolve(result);
            }

            /* step: 2 */
            __map.getRegeo({
                success(res) {
                    const data = res[0], address = data.regeocodeData.addressComponent;
                    cfg.location.gps = {
                        lat: data.latitude,
                        lng: data.longitude,
                        areaId: address.adcode,
                        province: address.province,
                        city: address.city,
                        district: address.district,
                        street: address.streetNumber.street,
                        source: 'gps'
                    };
                    resolve(cfg.location.gps);
                },
                fail(res) {
                    console.info('AMapWX getRegeo fail => ', res);
                    /* step: 3 */
                    resolve(cfg.location.defaults);
                }
            });

        });
    },
    /*
     * 获取周边
     * */
    getPoiAround(o) {
        return new Promise((resolve, reject) => {
            __map.getPoiAround(Object.assign({
                success(res) {
                    // const data = res[0];
                    resolve(res.poisData);
                },
                fail(res) {
                    console.warn('[AMapWX getRegeo] ', res);
                    reject(res);
                }
            }, o));
        });
    },
    /*
     * 关键字搜索
     * */
    getSearchBy(o) {
        return new Promise((resolve, reject) => {
            __map.getPoiSearch(Object.assign({
                citylimit: true,
                success(res) {
                    resolve(res.poisData);
                },
                fail(res) {
                    console.warn('[AMapWX getRegeo] ', res);
                    reject(res);
                }
            }, o));

        });
    },
    /*
     * 地址编码
     * 根据关键字获取经纬度
     * */
    getGeo(o) {
        return new Promise((resolve, reject) => {
            __map.getGeo(Object.assign({
                success(res) {
                    resolve(res.geocodes[0]);
                },
                fail(res) {
                    console.warn('[AMapWX getRegeo] ', res);
                    reject(res);
                }
            }, o));

        });
    },
    /*
     * 基于js利用经纬度进行两地的距离计算
     * 参数分别为第一点的纬度，经度；第二点的纬度，经度
     * */
    getDistance(lat1, lng1, lat2, lng2) {
        const EARTH_RADIUS = 6378137.0;    //地球半径，单位为M
        const radLat1 = this.rad(lat1), radLat2 = this.rad(lat2);
        const a = radLat1 - radLat2;                    //两点纬度之差
        const b = this.rad(lng1) - this.rad(lng2);      //两点经度之差

        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        return s < 1000 ? ~~s + 'm' : (s / 1000).toFixed(1) + 'km';
    },
    /*
     * 经纬度转换成三角函数中度分表形式
     * */
    rad(d) {
        return d * Math.PI / 180.0;
    }
};




