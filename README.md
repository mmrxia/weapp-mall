###电商微信小程序

#### 一、 项目说明
微信小程序实现移动端商城系统示例，也是作为项目开发的一个总结。

1 . 全部使用es6进行代码编写。   
2 . 开发时可直接使用px作为单位，使用gulp替换1px为2rpx，提升开发效率。   
3 . gulp构建时会将最终资源打包到src同级目录dist中，开发者工具调试时引入该路径即可。  
4 . 引入es6的regenerator、Promise以及co库语法，处理异步回调。      
5 . 由于小程序文件体积限制，建议将images下的图片放在cdn服务器上，构建时在gulpfile.js中替换为相应路径即可。

#### 二、目录结构
|目录或文件     |作用                                        |
|-----------   |-------------------------------------------|
| `components` | 小程序组件                                 |
| `config`     | 项目配置文件                               |
| `images`     | 存放项目图片                               |
| `libs`       | 存放项目相关的第三方js库文件                 |
| `pages`      | 存放项目页面相关文件                        |
| `styles`     | 存放项目独立`wxss`样式文件，可`impoort`引入  |
| `utils`      | 存放`utils`文件，可`require`引入            |
| `app.js`     | 入口文件                                   |
| `app.json`   | 小程序公共配置                              |
| `app.wxss`   | 小程序公共样式表                            |
                                               
#### 三、其他
1. 微信开发者工具下载：[地址](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)   
2. 小程序开发参考文档：[地址](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
3. 项目工程Git路径：[地址](git@github.com:mmrxia/weapp-mall.git)
