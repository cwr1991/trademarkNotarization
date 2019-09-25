// pages/buyerorderDetail/buyerorderDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: `${app.baseUrl}/gzytrading/orderdetail`,
      data: {
        order_id: options.orderId,
        openid: app.openid

      },
      success(res) {
        // res.data.result.tm_data = res.data.result.tm_data.split(',')
        // res.data.result.code_front = res.data.result.code_front.split(',')

        that.setData({
          detail: res.data.result
        })
        console.log(that.data.detail)
      }
    })

  },
  calltel(e) {
    wx.makePhoneCall({
      phoneNumber: '4007110860' //仅为示例，并非真实的电话号码
    })
  },
  topayment(e) {

    let type = e.currentTarget.dataset.type,
        order_id = e.currentTarget.dataset.orderid,
        price = e.currentTarget.dataset.price
    if (type == 1) {
      price = Math.round(parseFloat(price) * 100) / 100;
      wx.navigateTo({
        url: '../payment/payment?order_id=' + order_id + '&price=' + price + '&type='+ type,
      })
    } else if (type == 2) {
      price = Math.round(parseFloat(price) * 100) / 100;
      wx.navigateTo({
        url: '../payment/payment?order_id=' + order_id + '&price=' + price + '&type='+ type,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})