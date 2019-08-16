// pages/kaipiao/kaipiao.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  toEditInvoice: function (e) {

    wx.navigateTo({
      url: './editInvoice/editInvoice?company=' + e.currentTarget.dataset.company +
        '&num=' + e.currentTarget.dataset.num + '&address=' + e.currentTarget.dataset.address +
        '&bank=' + e.currentTarget.dataset.bank + '&count=' + e.currentTarget.dataset.count +
        '&id=' + e.currentTarget.dataset.id + '&types=' + e.currentTarget.dataset.types +
        '&isDefault=' + e.currentTarget.dataset.isdefault + '&isEdit=true'
    })
    console.log(e)
  },
  toAddInvoice: function (e) {
    wx.navigateTo({
      url: './editInvoice/editInvoice?data=null'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/get-invoice-info`,
      data: {
        openid: app.openid
      },
      success(res) {
        that.setData({
          invoiceInfo: res.data.result
        })
        console.log(that.data.invoiceInfo)
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
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/get-invoice-info`,
      data: {
        openid: app.openid
      },
      success(res) {
        that.setData({
          invoiceInfo: res.data.result
        })
        console.log(that.data.invoiceInfo)
      }
    })
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