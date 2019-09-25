// pages/search/search.js
// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    fapiao_alert: false,
    express_alert: false,
    content: [],
    email: "",
    allid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    // var status, currentTab
    // if (options.status) {
    //   status = options.status
    //   currentTab = parseInt(status) + 1
    // } else {
    //   currentTab = 0
    // }
    // let that = this;
    // wx.request({
    //   url: `${app.baseUrl}/gzynew/queryorder`,
    //   data: {
    //     openid: app.openid
    //   },
    //   success: function(res) {

    //     let content = res.data.result.datas
    //     if (content != 0) {
    //       content.forEach((element) => {
    //         element.checked = false
    //       })
    //     }
    //     var length = res.data.result.datas.length
    //     if (length == undefined) {
    //       length = 0
    //     }

    //     that.setData({
    //       content,
    //       contentLength: length,
    //       currentTab
    //     })
    //   }
    // })

  },
  onShow() {
    this.getTicket();
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/user-address`,
      data: {
        openid: app.openid
      },
      success(res) {
        if (res.data.result.length > 0) {
          var r = res.data.result.filter(function(x) {
            return x.check == 1;
          });
          that.setData({
            gz_address: r[0].scity + r[0].address
          })
        }
      }
    })
  },
  towebview: function(e) {
    wx.navigateTo({
      url: '/pages/webview/webview?orderid=' + e.currentTarget.dataset.id
    })
  },

  

  
  //不同按钮跳转
  goto: function(e) {

    if (e.currentTarget.dataset.type == '查看详情') {
      wx.navigateTo({
        url: '../order/orderDetail/orderDetail?orderId=' + e.currentTarget.dataset.orderid,
      })
    }
    if (e.currentTarget.dataset.type == '立即支付') {
      wx.navigateTo({
        url: '../payment/payment?order_id=' + e.currentTarget.dataset.orderid + '&orderid=' + e.currentTarget.dataset.id,
      })
    }
  },

  // 点击索取发票列表第一条
  fapiao(e, ids) {
    //订单id号，不是order_id
    let id = e.currentTarget.dataset.id;
    if (id == '001') {
      id = ids
    }
    this.setData({
      fapiao_alert: true,
      fp_order_id: id
    })
    this.getTicket()
  },
  getTicket() {
    var that = this;

    wx.request({
      url: `${app.baseUrl}/gzynew/get-invoice-info`,
      data: {
        openid: app.openid
      },
      success(res) {
        //fapiao_title抬头展示用
        if (res.data.msg != "fail") {
          let fapiao_title = res.data.result[0].title
          // fapiao_id 发票主体id
          let fapiao_id = res.data.result[0].id
          that.setData({
            fapiao_title: fapiao_title,
            fapiao_id: fapiao_id,
          })
        }
      }
    })
  },
  toSelectInvoice() {
    wx.navigateTo({
      url: '/pages/invoice/invoice',
    })
  },
  closefapiao() {
    this.setData({
      fapiao_alert: false
    })
  },
  bindemail(e) {

    var email = e.detail.value
    this.setData({
      email: email
    })

  },
  // 索取发票
  fapiao_sure(id) {
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/send-mail`,
      data: {
        id: that.data.fp_order_id,
        invoice_id: that.data.fapiao_id,
        email: that.data.email
      },
      success(res) {

        that.setData({
          fapiao_alert: false
        })

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        // 重新获取已发证订单
        wx.request({
          url: `${app.baseUrl}/gzynew/queryorder`,
          data: {
            openid: app.openid,
            flowStatus: 2
          },
          success: function(res) {
            // let contentLength=res.data.result.nums;
            let content = res.data.result.datas
            content.forEach((element) => {
              element.checked = false
            })

            that.setData({
              content,
              contentLength: res.data.result.datas.length,
              isClickEdit: false,
              allChecked: false
            })
          }
        })
      }
    })
  },
  // 批量获取发票
  allfapiao: function(e) {
    var that = this;
    var arrnum = [];
    for (var i = 0; i < that.data.content.length; i++) {
      if (that.data.content[i].checked) {
        arrnum.push(that.data.content[i].id)
      }
    }
    if (arrnum.length == 0) {
      wx.showToast({
        title: '请选择订单索取发票',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let ids = arrnum.join(',');
    that.setData({
      allid: ids
    })

    that.fapiao(e, ids);


  },



  //点击索取公证书按钮
  gongzhengshu(e) {
    //订单id号，不是order_id
    let id = e.currentTarget.dataset.id;

    this.setData({
      gz_alert: true,
      gz_order_id: id
    })
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/user-address`,
      data: {
        openid: app.openid
      },
      success(res) {
        if (res.data.result.length > 0) {
          var r = res.data.result.filter(function(x) {
            return x.check == 1;
          });

          that.setData({
            gz_address: r[0].scity + r[0].address
          })
        }

      }
    })
  },
  toSelectAddress() {
    wx.navigateTo({
      url: '/pages/address/address?affirm=1',
    })
  },
  closegz() {
    this.setData({
      gz_alert: false
    })
  },
  bindemail(e) {

    var email = e.detail.value
    this.setData({
      email: email
    })

  },
  // 索取公证书
  gz_sure(id) {
    var that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/certificate`,
      data: {
        orderid: that.data.gz_order_id,
        email: that.data.email,
        is_zhengshu: 1,
        addr: that.data.gz_address,
        openid: app.openid,
        type: 1
      },
      success(res) {

        that.setData({
          gz_alert: false
        })

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        // 重新获取已发证订单
        wx.request({
          url: `${app.baseUrl}/gzynew/queryorder`,
          data: {
            openid: app.openid,
            flowStatus: 2
          },
          success: function(res) {
            // let contentLength=res.data.result.nums;
            let content = res.data.result.datas
            content.forEach((element) => {
              element.checked = false
            })

            that.setData({
              content,
              contentLength: res.data.result.datas.length,
              isClickEdit: false,
              allChecked: false
            })
          }
        })
      }
    })
  },

  // 20190919订单页在线公证优化
  // 查看物流
  showExpress: function(e) {
    let that = this;
    wx.showLoading({
      title: '请稍后',
    })
    var express_alert = !this.data.express_alert


    wx.request({
      url: `${app.baseUrl}/gzynew/orderinfo`,
      data: {
        openid: app.openid,
        review: 1,
        orderid: e.currentTarget.dataset.id
      },
      success(res) {
        if (res.data.status == 0 || res.data.msg == "成功") {
          wx.hideLoading();
          if (res.data.result.order_code == 3) {
            that.setData({
              flow_remark: res.data.result.flow_remark,
              express_alert
            })
          } else {
            wx.showToast({
              title: '暂无快递信息',
              icon: 'none',
              duration: 2000
            })
          }

        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  copyExpressNum: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.expressno,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  closeExpress() {
    var express_alert = !this.data.express_alert
    this.setData({
      express_alert
    })
  },

  // 跳转补充材料
  extraFiles(e) {
    var orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../extrafiles/extrafiles?orderid=' + orderid,
    })
  },
  // 跳转搜索页
  search: function(e) {
    wx.redirectTo({
      url: '../search/search',
    })
  },

  inputSearch:function(e){
    var search = e.detail.value
    this.setData({
      search: search
    })
  },
  // 20190919在线公证优化
  tosearch:function(){
    let that = this;
    wx.showLoading({
      title: '请稍后',
    })
    wx.request({
      url: `${app.baseUrl}/gzynew/queryorder`,
      data: {
        openid: app.openid,
        sbSearch:that.data.search
      },
      success: function(res) {
        wx.hideLoading()
        let content = res.data.result.datas
        // if (content != 0) {
        //   content.forEach((element) => {
        //     element.checked = false
        //   })
        // }
        
        
        var length = res.data.result.datas.length
        if (length == undefined) {
          length = 0
        }

        that.setData({
          content,
          contentLength: length
        })
      }
    })
  }
})