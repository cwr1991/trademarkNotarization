// pages/login/login.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        manager:true,//右上角管理功能 
        checkAll:false ,//是否全选
        keyword:""
    },
    // 搜索功能
    searchFun(e){
      let keyword = e.detail.value
      this.setData({
        keyword
      })
      wx.showLoading({
        title: '搜索中',
        mask:true
      })
      this.getList()
    },

    // 获取数据fun
    getList(){
      // 调试模式
      let openid = app.openid  
      let keyword = this.data.keyword
      let data = {
        openid,
        keyword
      }
      let _this = this
      wx.request({
        url: `${app.baseUrl}/gzynew/applysearch`, //仅为示例，并非真实的接口地址
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data,
        success (res) {
          wx.hideLoading()

          if(res.data.status == '0'){
            let list = res.data.result
            list.forEach(element => {
              element.checked = false
            });
            _this.setData({
              list
            })
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:"none"
            })
          }
        }
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
      this.getList()
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