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
        manager:true,//右上角管理功能 
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      let list = this.data.list
        list.forEach(element => {
          element.checked = false
        });
        console.log(list)
        this.setData({
          list
        })
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