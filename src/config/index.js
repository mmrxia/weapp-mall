// 小程序通过配置信息;
const AppConfig = {
    appid: "your appid",                //app id
    secret: "your appsecret",           //app secret

    ak: "your amap key",                // 高德地图key
    bk: "your baidu map key",           // 百度地址key

    //定位信息
    location: {
        //默认
        defaults: {
            lat: 30.22965,
            lng: 120.192567,
            areaId: "330102",
            province: "浙江省",
            city: "杭州市",
            district: "上城区",
            street: "望江东路",
            source: "default"
        },
        //当前
        current: null,
        //GPS
        gps: null
    },

    // 本地存储名称集合
    localKey: {
        user: "_user_info",                     // 用户信息
        qcRpt: "_qc_report",                    // 质检报告
    },
};

export default AppConfig;