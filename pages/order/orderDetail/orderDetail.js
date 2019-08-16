// pages/order/orderDetail.js
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
  onLoad: function (options) {
    console.log(options.orderId)
    var that=this
    wx.request({
      url:`${app.baseUrl}/gzynew/orderinfo`,
      data:{
        orderid: options.orderId,
        openid: app.openid,
        review:1

      },
      success(res){
        console.log(res)
        // console.log(res.data.result.code_front)
        res.data.result.tm_data = res.data.result.tm_data.split(',')
        res.data.result.code_front = res.data.result.code_front.split(',')

        that.setData({
          detail:res.data.result
        })
        console.log(that.data.detail)
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