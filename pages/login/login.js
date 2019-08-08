// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isCloseCode:false,
      phoneval:'',
      codeval:'',
      codeNameVal:'获取验证码',
      isbut:false
  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  bindCodeInput(e){
    this.setData({
      codeval: e.detail.value
    });
    if (e.detail.value>2){
      this.setData({
        isCloseCode:true,
        isbut:true
      })
    }
  },
  bindPhoneInput(e){
    this.setData({
      phoneval: e.detail.value
    });
  },
  rmInputCode(){
    this.setData({
      isCloseCode: false,
      codeval:'',
      isbut: false
    })
  },

  getCode(){
    if (this.data.phoneval==''){
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
        duration: 2000
      })
      return false;
    }
    if (this.data.phoneval.length!=11){
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
        duration: 2000
      })
      return false;
    }
    var that = this;
    var aa = 60;
    var interval = setInterval(function(){
      aa--;
      that.setData({
        codeNameVal: aa+'s',
      })
      if(aa==0){
        clearInterval(interval);
        that.setData({
          codeNameVal: '获取验证码',
        })
      }
    },1000)

  },

  formSubmit: function (e) {
    if (e.detail.value.phone == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.phone.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.code == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入验证码',
        duration: 2000
      })
      return false;
    }

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