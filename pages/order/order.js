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
    allChecked: false,
    content: [{
        type: 0, //全部
        info: [{
            times: {
              date: "2019-06-01",
              time: "14:00:30"
            },
            status: "代付款",
            SBname: "白兰地",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 196,
            btntype: ['查看详情', '立即支付']

          },
          {
            times: {
              date: "2019-07-01",
              time: "16:00:30"
            },
            status: "代付款",
            SBname: "黑兰地",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['查看详情', '立即支付']
          },
          {
            times: {
              date: "2019-07-01",
              time: "16:00:30"
            },
            status: "代付款",
            SBname: "黑兰地",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['查看详情', '立即支付']
          },
          {
            times: {
              date: "2019-07-01",
              time: "16:00:30"
            },
            status: "代付款",
            SBname: "黑兰地",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['查看详情', '立即支付']
          },
        ]
      },
      {
        type: 1, //未公证
        info: [{
          times: {
            date: "2019-08-01",
            time: "14:00:30"
          },
          status: "代付款",
          SBname: "1",
          SBperson: "陈伟",
          SBnum: 18203141,
          SBclass: 30,
          orderNum: 18512345678,
          btntype: ['查看详情', '立即支付']
        }]
      },
      {
        type: 2,
        info: [{
          times: {
            date: "2019-09-01",
            time: "14:00:30"
          },
          status: "代付款",
          SBname: "1",
          SBperson: "陈伟",
          SBnum: 18203141,
          SBclass: 30,
          orderNum: 18512345678,
          btntype: ['查看详情', '立即支付']
        }]
      },
      {
        type: 3,
        info: [{
            times: {
              date: "2019-10-02",
              time: "14:00:30"
            },
            status: "代付款",
            SBname: "1",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['纸质证书', '索取发票', '查看详情'],
            singleChecked: false
          },
          {
            times: {
              date: "2019-10-01",
              time: "14:00:30"
            },
            status: "代付款",
            SBname: "1",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['纸质证书', '索取发票', '查看详情'],
            singleChecked: false
          },
          {
            times: {
              date: "2019-10-01",
              time: "14:00:30"
            },
            status: "代付款",
            SBname: "1",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['纸质证书', '索取发票', '查看详情'],
            singleChecked: false
          },
          {
            times: {
              date: "2019-10-01",
              time: "14:00:30"
            },
            status: "代付款",
            SBname: "1",
            SBperson: "陈伟",
            SBnum: 18203141,
            SBclass: 30,
            orderNum: 18512345678,
            btntype: ['纸质证书', '索取发票', '查看详情'],
            singleChecked: false
          }
        ]
      },
      {
        type: 4,
        info: [{
          times: {
            date: "2019-11-01",
            time: "14:00:30"
          },
          status: "代付款",
          SBname: "1",
          SBperson: "陈伟",
          SBnum: 18203141,
          SBclass: 30,
          orderNum: 18512345678,
          btntype: ['查看详情', '立即支付']
        }]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   infolength:content.info.length
    // })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 点击tab
  currentTab(e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  // 点击编辑按钮toggle
  clickEdit(e) {
    var toggle = !this.data.isClickEdit;
    this.setData({
      isClickEdit: toggle
    })
  },

  // 点击全选按钮
  allChecked(e) {
    var allchecked = !this.data.allChecked;
    // var singlechecked=!this.data.content.info.singleChecked
    let content = this.data.content
    let info = content[3].info
    info.forEach((element) => {
      element.singleChecked = allchecked
    })
    content[3].info = info
    this.setData({
      allChecked: allchecked,
      content: content,
      isClickEdit: true
    })
  },
  // 点击单选按钮
  singleChecked(e) {
    var index = e.currentTarget.dataset.index
    let content = this.data.content 
    let info = content[3].info
    let allChecked = this.data.allChecked
    info[index].singleChecked = !e.currentTarget.dataset.checked;
    let result = info.every((elm)=>{
      return elm.singleChecked == true
    })
    result ? allChecked = result : allChecked=false
    this.setData({
      allChecked,
      content
    })
  },

  //不同按钮跳转
  goto:function(e){
    // console.log(e)
    if(e.currentTarget.dataset.type=='查看详情'){
      wx.navigateTo({
        url: './orderDetail/orderDetail?orderId='+e.currentTarget.dataset.orderid,
      })
    }
  }
})