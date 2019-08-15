// pages/czroperation/czroperation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:''
  },
  formSubmit: function (e) {
    if (e.detail.value.name==''){
      wx.showToast({
        icon: 'none',
        title: '请输入操作人姓名'
      })
      return false;
    }
    wx.request({
      url: app.baseUrl + '/gzynew/operator',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        openid: app.openid,
        operator: e.detail.value.name,
        type:1
      },
      success(res) {
        if (res.data.status == 0) {
          wx.navigateTo({
            url: '/pages/applicantSelect/applicantSelect'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.baseUrl + '/gzynew/operator',
      method:'post',
      header: { 'content-type':'application/x-www-form-urlencoded'},
      data: {
        openid: app.openid
      },
      success(res) {
        if (res.data.status==0){
            that.setData({
              names: res.data.result.operator
            })
        }
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