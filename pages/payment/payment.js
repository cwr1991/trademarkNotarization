// pages/payment/payment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    order_id:'',
    data:{},
    price:''
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
      url: app.baseUrl + '/gzynew/get-pay-data',
      data: {
        order_id: options.order_id,
        openid: app.openid
      },
      success(res) {
        console.log(res);
        if (res.data.status==1){
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
          return false;
        }
        that.setData({
            data:res.data.res
        })
      }
    })

    wx.request({
      url: app.baseUrl + '/gzynew/get-order-info',
      data: {
        order_id: options.order_id,
        field: 'pay_charge'
      },
      success(res) {
        that.setData({
          price: res.data.result.pay_charge
        })
      }
    })

  },
  topayment:function(){
    var that = this;
    var timeStamp = that.data.data.timestamp;
    wx.requestPayment({
      timeStamp: timeStamp.toString(),
      nonceStr: that.data.data.nonceStr,
      package: that.data.data.package,
      signType: that.data.data.signType,
      paySign: that.data.data.paySign,
      success(res) {
        wx.request({
          url: app.baseUrl + '/gzynew/get-order-info',
          data: {
            order_id: that.data.order_id,
            field: 'pay_status,gz_url'
          },
          success(res) {
            if (res.data.result.pay_status==1){
              wx.navigateTo({
                url: '/pages/webview/webview?weburl=' + res.data.result.gz_url,
              })
            }
          }
        })
      },
      fail(res) { 
        wx.showToast({
          icon: 'none',
          title: res.errMsg
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})