// pages/payment/payment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    order_id:'',
    type:'',
    data:{},
    price:'',
    sharedata:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    if (options.type){
      that.setData({
        order_id: options.order_id,
        type: options.type,
        price: options.price
      })

      wx.request({
        url: app.baseUrl + '/gzytrading/get-pay-data',
        data: {
          openid: app.openid,
          type: options.type,
          order_id: options.order_id
        },
        success(res) {
          that.setData({
            data: res.data.result
          })
        }
      })
    }else{
      that.setData({
        orderid: options.orderid,
        order_id: options.order_id
      })
      wx.request({
        url: app.baseUrl + '/gzynew/isoperator',
        data: {
          orderid: that.data.orderid,
          openid: app.openid
        },
        success(res) {
          if (res.data.status == 0) {
            that.setData({
              sharedata: res.data.result
            })
            var phone = app.usermob;
            if (res.data.result.operator == 1) {
              phone = res.data.result.yun_mobile;
            }
            wx.request({
              url: app.baseUrl + '/gzynew/get-order-pay-charge',
              data: {
                openid: app.openid,
                phone: phone,
                order_id: options.order_id
              },
              success(res) {
                that.setData({
                  price: res.data.result.price
                })
              }
            })

            wx.request({
              url: app.baseUrl + '/gzynew/get-pay-data',
              data: {
                order_id: options.order_id,
                openid: app.openid,
                phone: phone,
              },
              success(res) {
                if (res.data.status == 1) {
                  wx.showToast({
                    icon: 'none',
                    title: res.data.msg
                  })
                  return false;
                }
                that.setData({
                  data: res.data.res
                })
              }
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
            return false;
          }
        }
      })
    }


  },
  topayment:function(){
    var that = this;
    var timeStamp = that.data.data.timestamp;
    console.log(timeStamp);
    wx.requestPayment({
      timeStamp: timeStamp.toString(),
      nonceStr: that.data.data.nonceStr,
      package: that.data.data.package,
      signType: that.data.data.signType,
      paySign: that.data.data.paySign,
      success(res) {
        wx.request({
          url: app.baseUrl + '/gzynew/get-order-info',
          data: {
            order_id: that.data.order_id,
            field: 'pay_status,gz_url'
          },
          success(res) {
            if (res.data.result.pay_status==1){
              if (that.data.sharedata.operator==1){
                wx.navigateTo({
                  url: '/pages/paymentresult/paymentresult?orderid=' + that.data.orderid+'&weburl=' + res.data.result.gz_url,
                })
                return false;
              }
              wx.navigateTo({
                url: '/pages/webview/webview?orderid=' + that.data.orderid +'&weburl=' + res.data.result.gz_url,
              })
            }
          }
        })
      },
      fail(res) { 
        wx.showToast({
          icon: 'none',
          title: res.errMsg
        })
      }
    })
  },

  backindex:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  onShareAppMessage: function (ops) {
    var that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target);

    }
    return {
      title: that.data.sharedata.username + '发起了公证，请使用手机尾号' + that.data.sharedata.yun_mobile.substring(that.data.sharedata.yun_mobile.length - 4)+'登录操作',
      path: 'pages/personCenter/personCenter',  // 路径，传递参数到指定页面。
      imageUrl: '../../imgs/xx.png',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

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


})