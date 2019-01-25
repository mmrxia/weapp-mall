//小程序基础配置 wx09fae71b8f9b5d9c

export default {
    api: 'https://api.yourdomain.com',  //正式API域名地址
    amap_key: 'a8a06158a8034e1e4da698bfa6827b55',   //高德地图开发者key
    kf_phone: '400-820-5555',
    //定位信息
    location: {
        //默认
        defaults: {
            lat: 30.22965,
            lng: 120.192567,
            areaId: '330102',
            province: '浙江省',
            city: '杭州市',
            district: '上城区',
            street: '望江东路',
            source: 'default'
        },
        //当前
        current: null,
        //GPS
        gps: null
    },
};
