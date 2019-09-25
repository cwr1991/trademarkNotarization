// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['全部', '代付款', '处理中', '已完成'],
    currentTab: 0,
    fapiao_alert: false,
    content: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status, currentTab
    if (options.status) {
      status = options.status
      currentTab = parseInt(status) + 1
    } else {
      currentTab = 0;
      status = -1;
    }
    let that = this;
    wx.request({
      url: `${app.baseUrl}/gzytrading/orderlist`,
      data: {
        openid: app.openid,
        pay_status: status
      },
      success: function(res) {

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
          contentLength: length,
          currentTab
        })
      }
    })

  },
  onShow() {
    // console.log(this.data)
    // let that = this;
    // let status = parseInt(this.data.currentTab)-1
    // wx.request({
    //   url: `${app.baseUrl}/gzytrading/orderlist`,
    //   data: {
    //     openid: app.openid,
    //     pay_status: status
    //   },
    //   success: function (res) {

    //     let content = res.data.result.datas
    //     // if (content != 0) {
    //     //   content.forEach((element) => {
    //     //     element.checked = false
    //     //   })
    //     // }
    //     var length = res.data.result.datas.length
    //     if (length == undefined) {
    //       length = 0
    //     }

    //     that.setData({
    //       content,
    //       contentLength: length,
    //       currentTab:that.data.currentTab
    //     })
    //   }
    // })
    // this.getTicket();
    // var that = this;
    // wx.request({
    //   url: `${app.baseUrl}/gzynew/user-address`,
    //   data: {
    //     openid: app.openid
    //   },
    //   success(res) {
    //     if (res.data.result.length > 0) {
    //       var r = res.data.result.filter(function(x) {
    //         return x.check == 1;
    //       });
    //       that.setData({
    //         gz_address: r[0].scity + r[0].address
    //       })
    //     }
    //   }
    // })
  },
  // towebview: function(e) {
  //   wx.navigateTo({
  //     url: '/pages/webview/webview?orderid=' + e.currentTarget.dataset.id
  //   })
  // },

  // 点击tab
  currentTab(e) {
    let that = this;
    let content;
    // if (this.data.currentTab == e.currentTarget.dataset.idx) {
    //   return;
    // }
    let idx = parseInt(e.currentTarget.dataset.idx) - 1;

    wx.request({
      url: `${app.baseUrl}/gzytrading/orderlist`,
      data: {
        openid: app.openid,
        pay_status: idx
      },
      success(res) {
        content = res.data.result.datas
        var length = content.length
        if (length == undefined) {
          length = 0
        }
        that.setData({
          currentTab: e.currentTarget.dataset.idx,
          content: content,
          contentLength: length

        })
      }
    })

  },

  // 点击编辑按钮toggle
  // clickEdit(e) {
  //   var toggle = !this.data.isClickEdit
  //   this.setData({
  //     isClickEdit: toggle
  //   })
  // },

  // 点击全选按钮
  // allChecked(e) {
  //   var allchecked = !this.data.allChecked;

  //   let content = this.data.content

  //   content.forEach((element) => {
  //     element.checked = allchecked
  //   })

  //   this.setData({
  //     allChecked: allchecked,
  //     content: content,
  //     isClickEdit: true
  //   })
  // },
  // 点击单选按钮
  // singleChecked(e) {
  //   var index = e.currentTarget.dataset.index
  //   let content = this.data.content
  //   let allChecked = this.data.allChecked
  //   content[index].checked = !e.currentTarget.dataset.checked;
  //   let result = content.every((elm) => {
  //     return elm.checked == true
  //   })
  //   result ? allChecked = result : allChecked = false
  //   this.setData({
  //     allChecked,
  //     content
  //   })
  // },

  //不同按钮跳转
  goto: function(e) {

    if (e.currentTarget.dataset.type == '查看详情') {
      wx.navigateTo({
        url: '../buyerorderDetail/buyerorderDetail?orderId=' + e.currentTarget.dataset.orderid,
      })
    } 

    else if (e.currentTarget.dataset.type == '支付定金') {
      let type = 1,
        order_id = e.currentTarget.dataset.orderid,
        price = e.currentTarget.dataset.price;
      this.topayment(type, price, order_id)
    } 

    else if (e.currentTarget.dataset.type == '支付尾款') {
      let type = 2,
        order_id = e.currentTarget.dataset.orderid,
        price = e.currentTarget.dataset.price;
      this.topayment(type, price, order_id)
    } 

    else if (e.currentTarget.dataset.type == '取消订单') {
      let that = this;
      let status = parseInt(this.data.currentTab)-1
      wx.showModal({
        title: '提示',
        content: '确定要取消此订单吗？',
        success(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            let order_id = e.currentTarget.dataset.orderid
            wx.request({
              url: `${app.baseUrl}/gzytrading/cancel-order`,
              data: {
                openid: app.openid,
                order_id
              },
              success(res) {
                if (res.data.status == 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000
                  })
                  //调订单列表接口
                  wx.request({
                    url: `${app.baseUrl}/gzytrading/orderlist`,
                    data: {
                      openid: app.openid,
                      pay_status: status
                    },
                    success(res) {
                      var content = res.data.result.datas
                      var length = content.length
                      if (length == undefined) {
                        length = 0
                      }
                      that.setData({
                        currentTab: that.data.currentTab,
                        content: content,
                        contentLength: length

                      })
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
  },

  topayment(type, price, order_id) {
    //支付定金

    if (type == 1) {
      price = Math.round(parseFloat(price * 0.3) * 100) / 100;
      wx.navigateTo({
        url: '../payment/payment?order_id=' + order_id + '&price=' + price + '&type=1',
      })
    } else if (type == 2) {
      price = Math.round(parseFloat(price * 0.7) * 100) / 100;
      wx.navigateTo({
        url: '../payment/payment?order_id=' + order_id + '&price=' + price + '&type=2',
      })
    }
  }
  // 点击索取发票列表第一条
  // fapiao(e, ids) {
  //   //订单id号，不是order_id
  //   let id = e.currentTarget.dataset.id;
  //   if (id == '001') {
  //     id = ids
  //   }
  //   this.setData({
  //     fapiao_alert: true,
  //     fp_order_id: id
  //   })
  //   this.getTicket()
  // },
  // getTicket() {
  //   var that = this;

  //   wx.request({
  //     url: `${app.baseUrl}/gzynew/get-invoice-info`,
  //     data: {
  //       openid: app.openid
  //     },
  //     success(res) {
  //       //fapiao_title抬头展示用
  //       if (res.data.msg != "fail") {
  //         let fapiao_title = res.data.result[0].title
  //         // fapiao_id 发票主体id
  //         let fapiao_id = res.data.result[0].id
  //         that.setData({
  //           fapiao_title: fapiao_title,
  //           fapiao_id: fapiao_id,
  //         })
  //       }
  //     }
  //   })
  // },
  // toSelectInvoice() {
  //   wx.navigateTo({
  //     url: '/pages/invoice/invoice',
  //   })
  // },
  // closefapiao() {
  //   this.setData({
  //     fapiao_alert: false
  //   })
  // },
  // bindemail(e) {

  //   var email = e.detail.value
  //   this.setData({
  //     email: email
  //   })

  // },

  // 索取发票
  // fapiao_sure(id) {
  //   var that = this;
  //   wx.request({
  //     url: `${app.baseUrl}/gzynew/send-mail`,
  //     data: {
  //       id: that.data.fp_order_id,
  //       invoice_id: that.data.fapiao_id,
  //       email: that.data.email
  //     },
  //     success(res) {

  //       that.setData({
  //         fapiao_alert: false
  //       })

  //       wx.showToast({
  //         title: '成功',
  //         icon: 'success',
  //         duration: 2000
  //       })

  //       // 重新获取已发证订单
  //       wx.request({
  //         url: `${app.baseUrl}/gzynew/queryorder`,
  //         data: {
  //           openid: app.openid,
  //           flowStatus: 2
  //         },
  //         success: function(res) {
  //           // let contentLength=res.data.result.nums;
  //           let content = res.data.result.datas
  //           content.forEach((element) => {
  //             element.checked = false
  //           })

  //           that.setData({
  //             content,
  //             contentLength: res.data.result.datas.length,
  //             isClickEdit: false,
  //             allChecked: false
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
  // 批量获取发票
  // allfapiao: function(e) {
  //   var that = this;
  //   var arrnum = [];
  //   for (var i = 0; i < that.data.content.length; i++) {
  //     if (that.data.content[i].checked) {
  //       arrnum.push(that.data.content[i].id)
  //     }
  //   }
  //   if (arrnum.length == 0) {
  //     wx.showToast({
  //       title: '请选择订单索取发票',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //     return false;
  //   }
  //   let ids = arrnum.join(',');
  //   that.setData({
  //     allid: ids
  //   })

  //   that.fapiao(e, ids);


  // },



  //点击索取公证书按钮
  // gongzhengshu(e) {
  //   //订单id号，不是order_id
  //   let id = e.currentTarget.dataset.id;

  //   this.setData({
  //     gz_alert: true,
  //     gz_order_id: id
  //   })
  //   var that = this;
  //   wx.request({
  //     url: `${app.baseUrl}/gzynew/user-address`,
  //     data: {
  //       openid: app.openid
  //     },
  //     success(res) {
  //       if (res.data.result.length > 0) {
  //         var r = res.data.result.filter(function(x) {
  //           return x.check == 1;
  //         });

  //         that.setData({
  //           gz_address: r[0].scity + r[0].address
  //         })
  //       }

  //     }
  //   })
  // },
  // toSelectAddress() {
  //   wx.navigateTo({
  //     url: '/pages/address/address?affirm=1',
  //   })
  // },
  // closegz() {
  //   this.setData({
  //     gz_alert: false
  //   })
  // },
  // bindemail(e) {

  //   var email = e.detail.value
  //   this.setData({
  //     email: email
  //   })

  // },
  // 索取公证书
  // gz_sure(id) {
  //   var that = this;
  //   wx.request({
  //     url: `${app.baseUrl}/gzynew/certificate`,
  //     data: {
  //       orderid: that.data.gz_order_id,
  //       email: that.data.email,
  //       is_zhengshu: 1,
  //       addr: that.data.gz_address,
  //       openid: app.openid,
  //       type: 1
  //     },
  //     success(res) {

  //       that.setData({
  //         gz_alert: false
  //       })

  //       wx.showToast({
  //         title: '成功',
  //         icon: 'success',
  //         duration: 2000
  //       })

  //       // 重新获取已发证订单
  //       wx.request({
  //         url: `${app.baseUrl}/gzynew/queryorder`,
  //         data: {
  //           openid: app.openid,
  //           flowStatus: 2
  //         },
  //         success: function(res) {
  //           // let contentLength=res.data.result.nums;
  //           let content = res.data.result.datas
  //           content.forEach((element) => {
  //             element.checked = false
  //           })

  //           that.setData({
  //             content,
  //             contentLength: res.data.result.datas.length,
  //             isClickEdit: false,
  //             allChecked: false
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
})