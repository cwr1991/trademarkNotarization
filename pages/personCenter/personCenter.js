// const util = require('../../utils/util.js')

Page({
  data: {
    orderItems: [{
        type: "全部",
        count: 18
      },
      {
        type: "未公证",
        count: 24
      },
      {
        type: "受理中",
        count: 1
      },
      {
        type: "已发证",
        count: 3
      },
      {
        type: "已终止",
        count: 4
      }
    ],
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
    isLogin: true,
    telnumber: 15112345678
  },

  onLoad: function() {
    this.setData({

    })
  },

  // 跳转地址、常用申请人、开票信息
  toWork: function(event) {

    switch (event.currentTarget.dataset.idx) {
      case 0:
        wx.navigateTo({
          url: '/pages/address/address',
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
          url: '/pages/invoice/invoice',
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
  tologin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 跳转订单页
  toOrder(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
})