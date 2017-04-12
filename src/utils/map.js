// 获取用户GPS定位信息;
import cfg from '../config/index.js';
import Map from '../libs/amap-wx.js';
import {co, Promise, regeneratorRuntime} from 'co-loader';

export default {
    /*
    * 获取地址描述数据
    * */
    getRegeo(){
        return new Promise((resolve, reject) => {
            co(function *() {
                let app = getApp();
                const userInfo = yield app.getUserInfo(),
                    mmh_user = userInfo.mmh;

                //优先级：默认收货地址、当前切换的地址、gps定位地址、默认定义的地址
                const location = mmh_user && mmh_user.defaultAddr || cfg.location.current || cfg.location.gps;
                if(location) return resolve(location);

                const __map = new Map.AMapWX({key: cfg.ak});

                __map.getRegeo({
                    success(res){
                        const data = res[0],
                            address = data.regeocodeData.addressComponent;

                        const gpsData = {
                            lat: data.latitude,
                            lng: data.longitude,
                            citycode: address.citycode,
                            areaId: address.adcode,
                            province: address.province,
                            city: address.city,
                            district: address.district,
                            street: address.streetNumber.street,
                            streetNumber: address.streetNumber.number,
                            township: address.township,
                            formattedAddress: data.regeocodeData.formatted_address,
                            source: "user"
                        };

                        cfg.location.gps = gpsData;
                        resolve(gpsData)
                    },
                    fail(){
                        console.warn('[AMapWX getRegeo] ', res);
                        resolve(cfg.location.defaults)
                    }
                })
            });

        })
    },
    /*
    * 获取周边
    * */
    getPoiAround(){
        return new Promise((resolve, reject) => {
            const __map = new Map.AMapWX({key: cfg.ak});
            __map.getPoiAround({
                success(res){
                    // const data = res[0];
                    resolve(res.poisData);
                },
                fail(){
                    console.warn('[AMapWX getRegeo] ', res);
                }
            })

        })
    },
    /*
    * 关键字搜索
    * */
    getSearchBy(o){
        return new Promise((resolve, reject) => {
            const __map = new Map.AMapWX({key: cfg.ak});
            __map.getInputtips(Object.assign(o,{
                citylimit:true,
                success(res){
                    resolve(res.tips);
                },
                fail(){
                    console.warn('[AMapWX getRegeo] ', res);
                }
            }));

        })
    }
}




