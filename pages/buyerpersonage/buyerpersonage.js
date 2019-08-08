// pages/buyercompany/buyercompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trademarkimgList: [],
    items: [
      { name: '0', value: '未下证' },
      { name: '1', value: '已下证' },
    ],
    array: ['身份证', '港澳居民通行证', '香港永久性居民身份证', '澳门永久性居民身份证', '台湾居民通行证', '台湾地区身份号码'],
    isradioActive: 2,
    index: 0,
    idcord: '',
    idcords:''
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          trademarkimgList: that.data.trademarkimgList.concat(tempFilePaths)
        });
      }
    })
  },
  rmtrademarkimgList: function (e) {
    var that = this;
    delete that.data.trademarkimgList[e.currentTarget.id];
    that.setData({
      trademarkimgList: that.data.trademarkimgList
    });
  },
  radioChange: function (e) {
    this.setData({
      isradioActive: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  chooseImagez: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          idcord: tempFilePaths[0]
        });
      }
    })
  },
  chooseImagesm:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          idcords: tempFilePaths[0]
        });
      }
    })
  },
  formSubmit: function (e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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