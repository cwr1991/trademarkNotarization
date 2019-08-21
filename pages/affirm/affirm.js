// pages/affirm/affirm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issite:false,
    isshadowBox:false,
    orderid:'',
    order_id:'',
    data:{},
    imglist:[],
    mail:'',
    addr:''
  },
  bindKeyInput:function(e){
    this.setData({
      mail: e.detail.value
    })
  },
  switch1Change: function (e) {
    this.setData({
      issite: e.detail.value
    })
    var that = this;
    wx.request({
      url: app.baseUrl + '/gzynew/user-address',
      data: {
        openid: app.openid
      },
      success(res) {
        if(res.data.result.length>0){
          var r = res.data.result.filter(function (x) {
            return x.check == 1;
          });
          that.setData({
            addr: r[0].scity + r[0].address 
          })
        }
      }
    })
  },
  rmshadowBox:function(){
      this.setData({
        isshadowBox: false
      })
  },
  bindtapBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  sumbit:function(){
    var that = this;
    wx.request({
      url: app.baseUrl + '/gzynew/orderinfo',
      data: {
        openid: app.openid,
        orderid: that.data.orderid,
        confirm:1
      },
      success(res) {
        if(res.data.status==1){
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }else{
          that.setData({
            isshadowBox: true
          })
          // wx.navigateTo({
          //   url: '/pages/payment/payment?orderid=' + that.data.orderid + '&order_id=' + that.data.order_id,
          // })
        }
      }
    })
  
  },
  bindnext:function(){
    var that = this;
    // if (that.data.mail==''){
    //   wx.showToast({
    //     icon: 'none',
    //     title: '请输入邮箱'
    //   })
    //   return false;
    // }
    if (that.data.issite){
      var is_zhengshu = 1;
      if (that.data.addr==''){
        wx.showToast({
          icon: 'none',
          title: '请输入收件地址'
        })
        return false;
      }
    }else{
      var is_zhengshu = 0;
    }
    wx.request({
      url: app.baseUrl + '/gzynew/certificate',
      data: {
        orderid: that.data.orderid,
        openid: app.openid,
        email: that.data.mail,
        addr:that.data.addr,
        is_zhengshu: is_zhengshu
      },
      success(res) {
        if (res.data.status==1){
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
          return false;
        }else{
          wx.navigateTo({
            url: '/pages/payment/payment?orderid=' + that.data.orderid + '&order_id=' + that.data.order_id,
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
    that.setData({
      orderid: options.orderid,
      order_id: options.order_id
    })
    wx.request({
      url: app.baseUrl + '/gzynew/orderinfo',
      data: {
        orderid: options.orderid,
        openid: app.openid
      },
      success(res) {
        if(res.data.status==0){
          that.setData({
            data: res.data.result,
            imglist: res.data.result.tm_data.split(',')
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
    var that =this;
    wx.request({
      url: app.baseUrl + '/gzynew/user-address',
      data: {
        openid: app.openid
      },
      success(res) {
        if (res.data.result.length > 0) {
          var r = res.data.result.filter(function (x) {
            return x.check == 1;
          });
          that.setData({
            addr: r[0].scity + r[0].address 
          })
        }
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