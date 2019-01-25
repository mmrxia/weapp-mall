function AMapWX(a) {
    this.key = a.key, this.requestConfig = {
        key: a.key,
        s: "rsx",
        platform: "WXJS",
        appname: a.key,
        sdkversion: "1.2.0",
        logversion: "2.0"
    }
}
AMapWX.prototype.getWxLocation = function (a, b) {
    wx.getLocation({
        type: "gcj02", success: function (a) {
            var c = a.longitude + "," + a.latitude;
            wx.setStorage({key: "userLocation", data: c}), b(c)
        }, fail: function (c) {
            wx.getStorage({
                key: "userLocation", success: function (a) {
                    a.data && b(a.data)
                }
            }), a.fail({errCode: "0", errMsg: c.errMsg || ""})
        }
    })
}, AMapWX.prototype.getGeo = function (a) {
    //地址编码
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/geocode/geo",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            var f;
            if (b.data.status && "1" == b.data.status) {
                if (b = b.data, b && b.geocodes) {
                    f = {geocodes: b.geocodes}, a.success(f)
                }
            } else a.fail({errCode: b.data.infocode, errMsg: b.data.info})
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, AMapWX.prototype.getRegeo = function (a) {
    //逆地址编码
    function c(c) {
        var d = b.requestConfig;
        wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: Object.assign(d, {
                location: c,
                extensions: "all"
            }),
            method: "GET",
            header: {"content-type": "application/json"},
            success: function (b) {
                var d, e, f, g, h, i, j, k;
                b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = d.roads[0].name + "附近", h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : f.push(d.roads[0].name), f = f.join(""), k = [{
                        iconPath: a.iconPath,
                        width: a.iconWidth,
                        height: a.iconHeight,
                        name: f,
                        desc: g,
                        longitude: h,
                        latitude: i,
                        id: 0,
                        regeocodeData: d
                    }], a.success(k)) : a.fail({errCode: b.data.infocode, errMsg: b.data.info})
            },
            fail: function (b) {
                a.fail({errCode: "0", errMsg: b.errMsg || ""})
            }
        })
    }

    var b = this;
    a.location ? c(a.location) : b.getWxLocation(a, function (a) {
            c(a)
        })
}, AMapWX.prototype.getWeather = function (a) {
    //获取天气信息
    function d(d) {
        var e = "base";
        a.type && "forecast" == a.type && (e = "all"), wx.request({
            url: "https://restapi.amap.com/v3/weather/weatherInfo",
            data: Object.assign(c, {
                city: d,
                extensions: e
            }),
            method: "GET",
            header: {"content-type": "application/json"},
            success: function (b) {
                function c(a) {
                    var b = {
                        city: {text: "城市", data: a.city},
                        weather: {text: "天气", data: a.weather},
                        temperature: {text: "温度", data: a.temperature},
                        winddirection: {text: "风向", data: a.winddirection + "风"},
                        windpower: {text: "风力", data: a.windpower + "级"},
                        humidity: {text: "湿度", data: a.humidity + "%"}
                    };
                    return b
                }

                var d, e;
                b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({forecast: b.data.forecasts[0]}) : a.fail({
                        errCode: b.data.infocode,
                        errMsg: b.data.info
                    })
            },
            fail: function (b) {
                a.fail({errCode: "0", errMsg: b.errMsg || ""})
            }
        })
    }

    function e(e) {
        wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: Object.assign(c, {
                location: e,
                extensions: "all"
            }),
            method: "GET",
            header: {"content-type": "application/json"},
            success: function (b) {
                var c, e;
                b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({
                        errCode: b.data.infocode,
                        errMsg: b.data.info
                    })
            },
            fail: function (b) {
                a.fail({errCode: "0", errMsg: b.errMsg || ""})
            }
        })
    }

    var b = this, c = b.requestConfig;
    a.city ? d(a.city) : b.getWxLocation(a, function (a) {
            e(a)
        })
}, AMapWX.prototype.getPoiAround = function (a) {
    //搜索周边
    function d(d) {
        var e = Object.assign(c, {
            location: d
        });
        Object.assign(e, a);
        wx.request({
            url: "https://restapi.amap.com/v3/place/around",
            data: e,
            method: "GET",
            header: {"content-type": "application/json"},
            success: function (b) {
                var c, d, e, f;
                if (b.data.status && "1" == b.data.status) {
                    if (b = b.data, b && b.pois) {
                        for (c = [], d = 0; d < b.pois.length; d++)e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({
                            latitude: parseFloat(b.pois[d].location.split(",")[1]),
                            longitude: parseFloat(b.pois[d].location.split(",")[0]),
                            iconPath: e,
                            width: 22,
                            height: 32,
                            id: d,
                            name: b.pois[d].name,
                            address: b.pois[d].address
                        });
                        f = {markers: c, poisData: b.pois}, a.success(f)
                    }
                } else a.fail({errCode: b.data.infocode, errMsg: b.data.info})
            },
            fail: function (b) {
                a.fail({errCode: "0", errMsg: b.errMsg || ""})
            }
        })
    }

    var b = this, c = b.requestConfig;
    a.location ? d(a.location) : b.getWxLocation(a, function (a) {
            d(a)
        })
}, AMapWX.prototype.getStaticmap = function (a) {
    function f(b) {
        c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);
        var e = d + c.join("&");
        a.success({url: e})
    }

    var e, b = this, c = [], d = "https://restapi.amap.com/v3/staticmap?";
    c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {
            f(a)
        })
}, AMapWX.prototype.getInputtips = function (a) {
    //搜索关键字下拉提示
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/assistant/inputtips",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            b && b.data && b.data.tips && a.success({tips: b.data.tips})
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, AMapWX.prototype.getDrivingRoute = function (a) {
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/direction/driving",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            b && b.data && b.data.route && a.success({
                paths: b.data.route.paths,
                taxi_cost: b.data.route.taxi_cost || ""
            })
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, AMapWX.prototype.getWalkingRoute = function (a) {
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/direction/walking",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            b && b.data && b.data.route && a.success({paths: b.data.route.paths})
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, AMapWX.prototype.getTransitRoute = function (a) {
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/direction/transit/integrated",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            if (b && b.data && b.data.route) {
                var c = b.data.route;
                a.success({distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits})
            }
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, AMapWX.prototype.getRidingRoute = function (a) {
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/direction/riding",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            b && b.data && b.data.route && a.success({paths: b.data.route.paths})
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, AMapWX.prototype.getPoiSearch = function (a) {
    //Poi搜索
    var b = this, d = b.requestConfig;
    Object.assign(d, a);
    wx.request({
        url: "https://restapi.amap.com/v3/place/text",
        data: d,
        method: "GET",
        header: {"content-type": "application/json"},
        success: function (b) {
            var f;
            if (b.data.status && "1" == b.data.status) {
                if (b = b.data, b && b.pois) {
                    f = {poisData: b.pois}, a.success(f)
                }
            } else a.fail({errCode: b.data.infocode, errMsg: b.data.info})
        },
        fail: function (b) {
            a.fail({errCode: "0", errMsg: b.errMsg || ""})
        }
    })
}, module.exports.AMapWX = AMapWX;