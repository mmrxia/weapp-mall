/*
* 地理位置相关方法
* by xqs 2017/4/14
* */
import cfg from '../config/index.js';
import Map from '../libs/amap-wx.js';
import {co, Promise, regeneratorRuntime} from 'co-loader';

export default {
    /*
    * 获取地址描述数据
    * 数据结构(8个字段)：经纬度、区域ID、省市区、街道、数据标识source
    * */
    getRegeo(){
        return new Promise((resolve, reject) => {
            co(function *() {
                let app = getApp();
                const userInfo = yield app.getUserInfo(),
                    mmh_user = userInfo.mmh;

                //优先级：默认收货地址、当前切换的地址、gps定位地址、默认定义的地址
                 /* step: 1 */
                const userAddr = mmh_user && mmh_user.defaultAddr;
                if(userAddr){
                    return resolve({
                        lat: userAddr.lat,
                        lng: userAddr.lng,
                        areaId: userAddr.areaId,
                        province: userAddr.prv,
                        city: userAddr.city,
                        district: userAddr.area,
                        street: userAddr.gpsAddr,
                        source: "user"
                    });
                }

                /* step: 2 */
                if(cfg.location.current || cfg.location.gps){
                    return resolve(cfg.location.current || cfg.location.gps);
                }

                /* step: 3 */
                const __map = new Map.AMapWX({key: cfg.ak});
                __map.getRegeo({
                    success(res){
                        const data = res[0],
                            address = data.regeocodeData.addressComponent;

                        cfg.location.gps = {
                            lat: data.latitude,
                            lng: data.longitude,
                            areaId: address.adcode,
                            province: address.province,
                            city: address.city,
                            district: address.district,
                            street: address.streetNumber.street,
                            source: "gps"
                        };
                        resolve(cfg.location.gps);
                    },
                    fail(res){
                        console.warn('[AMapWX getRegeo] ', res);
                        resolve(cfg.location.defaults);
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




