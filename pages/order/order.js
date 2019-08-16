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
    content: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   infolength:content.info.length
    // })
    let that=this;
    wx.request({
      url: `${app.baseUrl}/gzynew/queryorder`,
      data:{
        openid:app.openid
      },
      success:function(res){
        console.log(res.data.msg,res.data.result)
        // let contentLength=res.data.result.nums;
        that.setData({
          content: res.data.result.datas,
          contentLength: res.data.result.nums
        })
      }
    })
    console.log(that.data)
  },

  towebview:function(e){
    wx.navigateTo({
      url: '/pages/webview/webview?orderid=' + e.currentTarget.dataset.id
    })
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
    let that=this;
    let content;
    // if (this.data.currentTab == e.currentTarget.dataset.idx) {
    //   return;
    // }
    let idx=parseInt(e.currentTarget.dataset.idx)-1;
    if(idx == -1){
      idx='all';
    }
    wx.request({
      url:`${app.baseUrl}/gzynew/queryorder`,
      data:{
        openid: app.openid,
        flowStatus:idx
      },
      success(res){
        console.log('tab,',res)
        content=res.data.result.datas
        that.setData({
          currentTab: e.currentTarget.dataset.idx,
          content: content,
          contentLength: res.data.result.nums
          
        })
      }
    })
    
    console.log(this.data)
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
    if (e.currentTarget.dataset.type == '立即支付') {
      wx.navigateTo({
        url: '../payment/payment?order_id=' + e.currentTarget.dataset.orderid + '&orderid=' + e.currentTarget.dataset.id,
      })
    }
  }
})