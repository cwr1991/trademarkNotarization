//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          var that = this;
          that.code = res.code;
          wx.request({
            url: that.baseUrl+'/gzynew/openid',
            data:{
              code:res.code
            },
            success(res){
              that.openid = res.data.result.openid;
              if (res.data.status==0){
                // wx.reLaunch({
                //   url: '/pages/login/login',
                // })
              // }else{
                that.username = res.data.result.username;
                that.usermob = res.data.result.usermob;
                // wx.switchTab({
                //   url: '/pages/index/index', 
                // })
              }
            }
          })
        }
      }
    })



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  openid:'',
  // baseUrl:'https://www.86sb.com',
  baseUrl:'https://wwxs.86sb.com',
  newbaseUrl:'https://api.86sb.com.cn',
  username:'',
  usermob:'',
  sbclasses:''
})