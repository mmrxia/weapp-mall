/**
 * api list
 */
const host = "https://api.example.com/api/";

export default {
    "decodeWechatInfo":     `${host}V1/tools/signature`,                                    //解密微信用户信息
    "vcode":                `${host}V1/basic/vcode.htm`,                                    //绑定获取验证码
    "bind":                 `${host}V1/basic/bind.htm`,                                     //绑定
    "getCenterInfo":        `${host}V1/basic/memberInfo.htm`,                               //个人中心


    //门店相关
    "storeList":            `${host}V3/member/shop/queryMemberShopIndex.htm`,               //门店列表
    "storeInfo":            `${host}V2/shop/basic/queryShopBasicInfo.htm`,                  //门店首页
    "storeSimInfo":         `${host}V1/shop/basic/queryShopSimBasicInfo.htm`,               //门店详情
    "storeGoodsList":       `${host}V3/shop/goods/list.htm`,                                //门店商品列表


    //商品分类
    "goodsType":            `${host}V1/goods/queryGoodsType.htm`,                           // 商品分类
    "goodsTypeTree":        `${host}V1/goods/queryGoodsTypeTree.htm`,                       // 商品二级分类


    //商品详情相关
    "goodsDetail":          `${host}V1/goods/queryGoodsDetail.htm`,                         // 商品详情

}
