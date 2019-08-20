// const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderItems: [],
    infoItems: [{
        icon: "/images/address.png",
        iconTitle: "常用地址",
        titleElse: "(纸质公证书送达地址)",
      },
      {
        icon: "/images/shenhe.png",
        iconTitle: "常用申请人"
      },
      {
        icon: "/images/kaipiao.png",
        iconTitle: "开票信息"
      }
    ],
    telnumber: 15112345678
  },

  onLoad: function() {
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
              that.setData({
                openid: res.data.result.openid,
                telnumber:res.data.result.username
              });
              let order_count = [];
              wx.request({
                url: `${app.baseUrl}/gzynew/queryorder`,
                data: {
                  openid: that.data.openid,
                },
                success: function (res) {
                  that.setData({
                    orderItems: res.data.result.nums[0]
                  })
                }
              })
            }
          })
        }
      }
    })
  },



  // 跳转地址、常用申请人、开票信息
  toWork: function(event) {

    switch (event.currentTarget.dataset.idx) {
      case 0:
        wx.navigateTo({
          url: '/pages/address/address?source=personcenter',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
          }
        })
        break;

      case 1:
        wx.navigateTo({
          url: '/pages/applicantList/applicantList',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
          }
        })
        break;

      case 2:
        wx.navigateTo({
          url: '/pages/invoice/invoice?source=personcenter',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
          }
        })
        break;
      default:
        console.log("default");
    }
  },

  // 跳转登录页
  tologin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 跳转订单页
  toOrder(e) {
    console.log(e.currentTarget.dataset.id)
    let id;
    if (e.currentTarget.dataset.id){
      id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/order/order?status=' + id,
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
    
  },

  // 退出登录
  quit: function(e) {
    wx.redirectTo({
      url: '/pages/login/login?isquit=1'
    })
  }
})