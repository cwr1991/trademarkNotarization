// pages/address/address.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: [],
    isaffirm:false
  },

  selectitem:function(e){
    if (this.data.isaffirm){
      wx.request({
        url: `${app.baseUrl}/gzynew/edit-address`,
        data: {
          openid: app.openid,
          sort: e.currentTarget.dataset.idx+1,
          sname: e.currentTarget.dataset.username,
          stel: e.currentTarget.dataset.tel,
          check: 1,
          scity: e.currentTarget.dataset.scity.toString().replace(",", " ").replace(",", " "),
          address: e.currentTarget.dataset.address,
        },
        success(res) {
          if(res.data.status==0){
            wx.navigateBack({
              delta: 1
            })
          }
        },
      })
      // 修改默认地址成功之后走
    
    }
  },

  toEditAddress:function(e){
    // var editInfo={
    //   "username": e.currentTarget.dataset.username,
    //   "tel": e.currentTarget.dataset.tel,
    //   "address": e.currentTarget.dataset.address
    // }
    // editInfo = JSON.stringify(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: './editAddress/editAddress?username=' + e.currentTarget.dataset.username + '&tel=' + e.currentTarget.dataset.tel + '&scity=' + e.currentTarget.dataset.scity+ '&address=' + e.currentTarget.dataset.address + '&isDefault='+ e.currentTarget.dataset.isdefault +'&isEdit=true'+
'&sort=' + e.currentTarget.dataset.idx

      
    })
  },
  toAddAddress:function(e){
    if (this.data.isaffirm){
      wx.navigateTo({
        url: './editAddress/editAddress?data=null&affirm=1&lengths=' + this.data.addressInfo.length
      })
    }else{
      wx.navigateTo({
        url: './editAddress/editAddress?data=null&lengths=' + this.data.addressInfo.length
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.affirm == 1) {
      this.setData({
        isaffirm: true
      })
    }

    var that=this;
    wx.request({
      url: `${app.baseUrl}/gzynew/user-address`,
      data:{
        openid: app.openid
      },
      success(res){
        // if(res.data.result.length>0){
          that.setData({
            addressInfo:res.data.result
          });
        // }
      }
    })
    that.setData({
      source: options.source
    })
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
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/user-address`,
      data: {
        openid: app.openid
      },
      success(res) {
        // if (res.data.result.length > 0) {
          that.setData({
            addressInfo: res.data.result
          });
        // }
      }
    })
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