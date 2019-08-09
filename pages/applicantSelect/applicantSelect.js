// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[
          {
            id:1,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:11,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:111,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:11111,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:111111,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:11111111,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:21,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:31,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:41,
            name:"上海尚标互联网科技公司1"
          },
          {
            id:2,
            name:"上海尚标互联网科技公司2"
          },
          {
            id:3,
            name:"上海尚标互联网科技公司3"
          },
          {
            id:4,
            name:"上海尚标互联网科技公司4"
          },
          {
            id:5,
            name:"上海尚标互联网科技公司5"
          },
          {
            id:6,
            name:"上海尚标互联网科技公司6"
          }
        ],
        empty:false, //是否显示空状态
        checkAll:false //是否全选
    },
    // 搜索功能
    searchFun(e){
      console.log(e.detail)
      let val = e.detail.value
      wx.showLoading({
        title: '搜索中',
        mask:true
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

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
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })