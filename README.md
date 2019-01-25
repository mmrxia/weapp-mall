## 微信小程序电商系统
> 本开源项目旨在根据如今流行的电商app作为参考，开发出一套基础功能完善的小程序电商系统，帮助中小电商企业能够快速引流和推广使用。
> 还可以为广大的前端开发工程师、小程序开发者快速迭代出公司需要的电商项目。

### 小程序功能

+ 首页
+ 分类
+ 搜索
+ 商品详情
+ 购物车
+ 下单、支付
+ 个人中心
+ 订单
+ 收货地址（使用微信官方模块）

### 项目结构设计

现今已有很多基于webpack打包进行开发的小程序开发框架，比较知名的有美团小程序框架[mpvue](https://github.com/Meituan-Dianping/mpvue)和腾讯开源的[wepy](https://github.com/Tencent/wepy)。

对于vue开发和webpack打包比较熟悉的同学，以及希望后期能进一步开发，web端、小程序、weex共用一套代码打包出多端通用的应用程序，建议尝试了解和使用该框架。

但随着微信官网对于小程序组件化开发的进一步支持，以及开发的曲线越来越低，直接使用官方开发规范进行开发，使用gulp类工具打包会更加便捷。

另外，考虑到项目开源后，开发者能快速修改迭代，后期会将接口api拆分到独立文件中进行配置，依照文档规范本地存放模拟数据。

下面是项目代码目录：

```
.
├── src                        
│   ├── assets                  // 要上传到ftp的静态资源文件
│   ├── components              // 组件
│   │   ├── dialog   
│   │   ├── quantity   
│   ├── config              // 组件
│   │   ├── api.js   
│   │   ├── index.js   
│   ├── images                  // 项目内公用图片文件, tabbar等
│   ├── libs                    // 库文件
│   ├── pages                   // 业务页面
│   │   ├── ...                
│   ├── styles                  // 样式文件
│   ├── subPages                // 分包页面
│   │   ├── ...                
│   ├── utils                   // 通用方法
│   ├── app.js                  // 全局入口及配置
│   ├── app.json                  
│   └── app.less                  
├── .editorconfig                 
├── .eslintignore                 
├── .eslintrc.js                 
├── .gitignore                 
├── config.js                   // 配置文件，如ftp、cdn路径等，可修改
├── gulpfile.js                 // gulp打包
├── package.json                // npm的依赖、项目信息文件
├── README.md                   

```

本项目特性：   
基于Gulp 4.0开发，开发者工具引入`dist`目录，开发时使用`src`目录。
    
+ 全面使用es6语法，支持async/await
+ 封装通用组件，如modal、dialog、sku、侧滑删除、数量增减、图片fadeIn、marquee等
+ iphone6尺寸作为标准设计稿，使用px作为css编写单位，自动转换为rpx
+ 使用less、sass（需要改配置）编写样式
+ 通过gulp sftp，一键上传静态资源到FTP或CDN
+ 定义api接口文档规范，配置mock数据


#### 开发必备
1 . [微信开发者工具下载](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
   
2 . [小程序开发参考文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
