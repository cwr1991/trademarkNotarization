//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isAnnouncement:false,
    isagreement:false,
    isprotocol:false,
    price:'',
    nodes:'',
    openid:''
  },
  rmAnnouncement:function(){
    this.setData({
      isAnnouncement:false
    })
  },
  openAgreement:function(){
    this.setData({
      isagreement: true
    })
  },
  rmAgreement:function(){
    this.setData({
      isagreement: false,
    })
  },
  rmAgreementNo:function(){
    this.setData({
      isagreement: false,
      isprotocol:true
    })
  },
  rmAgreementYes:function(){
    this.setData({
      isagreement: false,
      isprotocol: false
    })
  },
  toOperation:function(){
    wx.navigateTo({
      url: '/pages/operation/operation'
    })
  },
  tobuyercompany:function(){
    if (this.data.isprotocol){
      wx.showToast({
        icon: 'none',
        title: '请同意协议',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: app.baseUrl + '/gzynew/operator',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        openid: app.openid,
        operator: '111111111',
        type: 0
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
  onLoad: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          that.code = res.code;
          wx.request({
            url: app.baseUrl + '/gzynew/openid',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res);
              that.setData({
                openid: res.data.result.openid
              });
              wx.request({
                url: app.baseUrl + '/gzynew/get-order-pay-charge',
                data: {
                  openid: res.data.result.openid,
                  phone: res.data.result.username
                },
                success(res) {
                  if(res.data.status==0){
                    that.setData({
                      price: res.data.result.price
                    })
                  }
                }
              })
            }
          })
        }
      }
    })

    wx.request({
      url: app.baseUrl +'/gzynew/get-xie-yi-info',
      success(res) {
        that.setData({
          nodes:res.data
        })
      }
    })
    
  },


})
