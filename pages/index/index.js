//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isAnnouncement:false,
    isagreement:false,
    isprotocol:false
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
    wx.navigateTo({
      url: '/pages/buyercompany/buyercompany'
    })
  },
  onLoad: function () {

  },

})
