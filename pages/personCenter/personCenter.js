// const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    imgUrl: "https://tmstore.oss-cn-hangzhou.aliyuncs.com/vxxcx/sbjy",
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
    islogin: true,
    telnumber: ''
  },
  bindlogin:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onLoad: function() {
    var that = this;
    that.setData({
      islogin: app.usermob,
      telnumber: app.usermob
    })
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       that.code = res.code;
    //       wx.request({
    //         url: app.baseUrl + '/gzynew/openid',
    //         data: {
    //           code: res.code
    //         },
    //         success(res) {
    //           that.setData({
    //             openid: res.data.result.openid,
    //             telnumber: res.data.result.username
    //           });
    //           let order_count = [];
    //           wx.request({
    //             url: `${app.baseUrl}/gzynew/queryorder`,
    //             data: {
    //               openid: that.data.openid,
    //             },
    //             success: function(res) {
    //               that.setData({
    //                 orderItems: res.data.result.nums[0]
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  onShow: function() {
    var that = this;
    that.setData({
      islogin: app.usermob,
      telnumber: app.usermob
    })
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       that.code = res.code;
    //       wx.request({
    //         url: app.baseUrl + '/gzynew/openid',
    //         data: {
    //           code: res.code
    //         },
    //         success(res) {
    //           that.setData({
    //             openid: res.data.result.openid,
    //             telnumber: res.data.result.username
    //           });
    //           let order_count = [];
    //           wx.request({
    //             url: `${app.baseUrl}/gzynew/queryorder`,
    //             data: {
    //               openid: that.data.openid,
    //             },
    //             success: function(res) {
    //               that.setData({
    //                 orderItems: res.data.result.nums[0]
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
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
    }
  },

  // 跳转登录页
  tologin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 跳转在线公证订单页
  togzOrder(e) {
    wx.navigateTo({
      url: '/pages/order/order?status=-1',
    })

  },
  tojyOrder() {
    wx.navigateTo({
      url: '/pages/buyerorder/buyerorder?status=-1',
    })
  },
  // 退出登录
  quit: function(e) {
    wx.redirectTo({
      url: '/pages/login/login?isquit=1'
    })
  },

  // 支付测试
  pay() {
    // var openid = "oKjx85YYAvzlPvGFU9ao4gC9uX3c"
    var order_id = "SBJY201908281802518285719948"
    wx.request({
      url: 'https://wwxs.86sb.com/gzytrading/get-pay-data',
      data: {
        openid: app.openid,
        order_id: order_id,
        type: 2
      },
      success: res => {
        this.setData({
          payment: res.data.result
        })
        wx.requestPayment({
          timeStamp: this.data.payment.timestamp.toString(),
          nonceStr: this.data.payment.nonceStr,
          package: this.data.payment.package,
          signType: this.data.payment.signType,
          paySign: this.data.payment.paySign,
          success(res) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              title: res.errMsg
            })
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: res.errMsg
            })
          }
        })
      }
    })
    console.log(this.data)
    
  }


})