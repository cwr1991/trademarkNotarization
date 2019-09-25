//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isAnnouncement:false,
    isagreement:false,
    isprotocol:false,
    price:'360',
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
  toczroperation:function(){
    if (!app.usermob) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.navigateTo({
        url: '/pages/czroperation/czroperation',
      })
    }
  },
  tobuyercompany:function(){
    if (!app.usermob) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
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
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.baseUrl +'/gzynew/get-xie-yi-info',
      success(res) {
        that.setData({
          nodes:res.data
        })
      }
    })
    
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '商标在线公证就在尚标',
      path: 'pages/index/index',  // 路径，传递参数到指定页面。
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})
