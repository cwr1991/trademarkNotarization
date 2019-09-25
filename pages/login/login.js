// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isCloseCode:false,
      phoneval:'',
      codeval:'',
      codeNameVal:'获取验证码',
      isbut:false,
      wxcode:''
  },

  getPhoneNumber(e) {
    var that = this;
    if ("getPhoneNumber:ok" != e.detail.errMsg) {
      wx.showToast({
        icon: 'none',
        title: '快捷登陆失败'
      })
      return;
    }
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.baseUrl + '/gzynew/getmobile',
      data: {
        code: that.data.wxcode,
        encrypted_data: encryptedData,
        iv: iv
      },
      success(res) {
        if (res.data.phoneNumber){
          wx.request({
            url: app.baseUrl + '/gzynew/loginwx',
            data: {
              openid: app.openid,
              mobile: res.data.phoneNumber
            },
            success(res) {
              console.log(res);
              if(res.data.status==0){
                app.username = res.data.result.username;
                app.usermob = res.data.result.usermob;
                app.openid = res.data.result.openid;
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
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
    if (this.data.codeNameVal !='获取验证码'){
        return false;
    }
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
    wx.request({
      url: app.baseUrl +'/gzynew/sendsms',
      data: {
        mobile: that.data.phoneval
      },
      success(res) {
        if(res.data.status==0){
        
          var aa = 60;
          var interval = setInterval(function () {
            aa--;
            that.setData({
              codeNameVal: aa + 's',
            })
            if (aa == 0) {
              clearInterval(interval);
              that.setData({
                codeNameVal: '获取验证码'
              })
            }
          }, 1000)
        }else{
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2000
          })
          return false;
        }
      }
    })
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
    var that = this;
    wx.request({
      url: app.baseUrl + '/gzynew/loginwx',
      data: {
        mobile: that.data.phoneval,
        openid: app.openid,
        code: e.detail.value.code
      },
      success(res) {
        app.username = res.data.result.username;
        app.usermob = res.data.result.usermob;
        app.openid = res.data.result.openid;
        if(res.data.status==0){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })

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
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          that.setData({
            wxcode:res.code
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