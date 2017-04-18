Page({
    onLoad (){
        wx.showLoading({
            title: '加载中',
        })

        setTimeout(function(){
            wx.hideLoading()
        },5000)
    }
})