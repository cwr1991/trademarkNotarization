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
      console.log(e.detail)
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
    // 管理切换 function
    managerFun(){
      let manager = !this.data.manager
      this.setData({
        manager
      })
    },
    // 全选function
    selectChange(e){
      let list = this.data.list
      let bol = e.detail.value[0]
      if(bol){
        list.forEach(element => {
          element.checked = true
        });
      }else{
        list.forEach(element => {
          element.checked = false
        });
      }
      this.setData({
        list
      })
    },
    // 复选function
    checkboxChange(e){
      let checkArr = e.detail.value
      console.log(checkArr)
      let list = this.data.list
      for(let i = 0 ; i < list.length;i++){
        let id = ""+list[i].id
        if(checkArr.includes(id)){
          list[i].checked = true
        }else{
          list[i].checked = false
        }
      }
      let result = list.every((element)=>{
        return element.checked 
      })
      this.setData({
        checkAll:result,
        list
      })
    },
    // 删除function
    deleteFun(){
        let list = this.data.list
        let selected = list.some((element)=>{
          return element.checked
        })
        if(!selected){
          wx.showToast({
            title:"请至少选择一个申请人",
            icon:'none'
          })
          return
        }
        let sendArr = []
        list.map((element)=>{
          if(element.checked){
            sendArr.push(element)
          }
        })
        console.log(sendArr)
        let _this = this
        wx.showModal({
          title:'删除申请人',
          content: '确定要删除选中的申请人？',
          cancelColor:'#666666',
          confirmColor:'#f44444',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              _this.deleteReq()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    },
    deleteReq(){
      console.log(12313123)
    },
    // 获取数据fun
    getList(){
      // 调试模式
      let openid = app.openid  || "oKjx85fKXjZHMP2l3qyLfhryqFSM"
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
        },
        complete(){
          wx.hideLoading()
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