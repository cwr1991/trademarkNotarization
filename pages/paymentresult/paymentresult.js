// pages/paymentresult/paymentresult.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid:'',
    order_id:'',
    gz_url:'',
    sharedata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      orderid: options.orderid,
      order_id: options.order_id
    })
    wx.request({
      url: app.baseUrl + '/gzynew/isoperator',
      data: {
        orderid: that.data.orderid,
        openid: app.openid
      },
      success(res) {
        if (res.data.status == 0) {
          that.setData({
            sharedata: res.data.result
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
          return false;
        }
      }
    })
  },
  onShareAppMessage: function (ops) {
    var that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      // console.log(ops.target);
    }
    return {
      title: that.data.sharedata.username + '发起了公证，请使用手机尾号' + that.data.sharedata.yun_mobile.substring(that.data.sharedata.yun_mobile.length - 4) + '登录操作',
      path: 'pages/order/order',  // 路径，传递参数到指定页面。
      imageUrl: '../../imgs/xx.png',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  backindex: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  continues: function () {
    wx.navigateTo({
      url: '/pages/webview/webview?weburl=' + this.data.gz_url,
    })
  }
  
})