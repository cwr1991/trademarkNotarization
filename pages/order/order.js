// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['全部', '未公证', '受理中', '已发证', '已终止'],
    currentTab: 0,
    isClickEdit: false,
    isClickEdit2: false,
    allChecked: false,
    allChecked2: false,
    // isfapiao:false,
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
    // this.setData({
    //   infolength:content.info.length
    // })

    var status, currentTab
    if (options.status) {
      status = options.status
      currentTab = parseInt(status) + 1
    } else {
      currentTab = 0
    }
    let that = this;
    wx.request({
      url: `${app.baseUrl}/gzynew/queryorder`,
      data: {
        openid: app.openid,
        flowStatus: status
      },
      success: function(res) {

        let content = res.data.result.datas
        if (content != 0) {
          content.forEach((element) => {
            element.checked = false;
            element.checked2 = false;
          })
        }
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
            gz_address: r[0].scity + r[0].address,
            gz_name:r[0].sname,
            gz_tel:r[0].stel
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

  // 点击tab
  currentTab(e) {
    let that = this;
    let content;
    // if (this.data.currentTab == e.currentTarget.dataset.idx) {
    //   return;
    // }
    let idx = parseInt(e.currentTarget.dataset.idx) - 1;

    wx.request({
      url: `${app.baseUrl}/gzynew/queryorder`,
      data: {
        openid: app.openid,
        flowStatus: idx
      },
      success(res) {
        content = res.data.result.datas
        if (content != 0) {
          content.forEach((element) => {
            element.checked = false;
            element.checked2 = false;
          })
        }

        var length = content.length
        if (length == undefined) {
          length = 0
        }
        that.setData({
          currentTab: e.currentTarget.dataset.idx,
          content: content,
          contentLength: length,
          allChecked: false,
          allChecked2: false
        })
      }
    })

  },

  // 点击编辑按钮toggle(索取发票)
  clickEdit(e) {
    var toggle = !this.data.isClickEdit
    this.setData({
      isClickEdit: toggle
    })

  },

  // 点击全选按钮(索取发票)
  allChecked(e) {
    var allchecked = !this.data.allChecked;

    let content = this.data.content

    content.forEach((element) => {
      element.checked = allchecked
    })

    this.setData({
      allChecked: allchecked,
      content: content,
      isClickEdit: true
    })
  },
  // 点击单选按钮(索取发票)
  singleChecked(e) {
    var index = e.currentTarget.dataset.index
    let content = this.data.content
    let allChecked = this.data.allChecked
    content[index].checked = !e.currentTarget.dataset.checked;
    // every()检测数组中的所有元素的checked是否为true
    let result = content.every((elm) => {
      return elm.checked == true
    })
    console.log(result)
    result ? allChecked = result : allChecked = false
    this.setData({
      allChecked,
      content
    })
  },

  //不同按钮跳转
  goto: function(e) {

    if (e.currentTarget.dataset.type == '查看详情') {
      wx.navigateTo({
        url: './orderDetail/orderDetail?orderId=' + e.currentTarget.dataset.orderid,
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
        title: '请先选择订单',
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
            gz_address: r[0].scity + r[0].address,
            gz_name: r[0].sname,
            gz_tel: r[0].stel
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
        sendName:that.data.gz_name,
        sendPhone:that.data.gz_tel,
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

  // 20190919在线公证优化start
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

  // 删除单个订单
  deleteSingleorder(e, order_id) {
    // 避免批量删除orderid undefined
    let order_ids = e.currentTarget.dataset.orderid;
    if(order_ids == undefined){
      order_ids = order_id;
    }
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除此公证订单吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: `${app.baseUrl}/gzynew/cancel-order`,
            data: {
              openid: app.openid,
              order_id: order_ids
            },
            success(res) {

              wx.request({
                url: `${app.baseUrl}/gzynew/queryorder`,
                data: {
                  openid: app.openid,
                  flowStatus: 3
                },
                success: function(res) {

                  let content = res.data.result.datas
                  if (content != 0) {
                    content.forEach((element) => {
                      element.checked = false,
                      element.checked2 = false

                    })
                  }
                  var length = res.data.result.datas.length;
                  var isClickEdit2=false;
                  if (length == undefined) {
                    length = 0
                  }

                  that.setData({
                    content,
                    contentLength: length,
                    currentTab: 4,
                    isClickEdit2
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 点击编辑按钮toggle(删除订单)
  clickEdit2(e) {
    var toggle = !this.data.isClickEdit2
    this.setData({
      isClickEdit2: toggle
    })

  },

  // 点击全选按钮(删除订单)
  allChecked2(e) {
    var allchecked2 = !this.data.allChecked2;

    let content = this.data.content

    content.forEach((element) => {
      element.checked2 = allchecked2
    })

    this.setData({
      allChecked2: allchecked2,
      content: content,
      isClickEdit2: true
    })
  },
  // 点击单选按钮(删除订单)
  singleChecked2(e) {
    var index = e.currentTarget.dataset.index
    let content = this.data.content
    let allChecked2 = this.data.allChecked2
    content[index].checked2 = !e.currentTarget.dataset.checked2;
    // every()检测数组中的所有元素的checked是否为true
    let result = content.every((elm) => {
      return elm.checked2 == true
    })
    console.log(result)
    result ? allChecked2 = result : allChecked2 = false
    this.setData({
      allChecked2,
      content
    })
  },
  // 批量删除
  deleteAllOrder: function(e) {
    var that = this;
    var arrnum = [];
    for (var i = 0; i < that.data.content.length; i++) {
      if (that.data.content[i].checked2) {
        arrnum.push(that.data.content[i].order_id)
      }
    }
    if (arrnum.length == 0) {
      wx.showToast({
        title: '请先选择订单',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let order_ids = arrnum.join(',');
    that.setData({
      alldeleteid: order_ids
    })

    this.deleteSingleorder(e, this.data.alldeleteid);


  },
  // 20190919在线公证优化end

})