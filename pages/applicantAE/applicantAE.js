// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      applicantType:[
          {
            name: '企业',
            value: '1',
            checked: 'true'
          },
          {
            name: '香港',
            value: '2',
            checked: 'true'
          },
          {
            name: '个人',
            value: '3',
            checked: 'false'
          }
      ],
      type:'3',
      personal:{
        name:"",
        idcard:"",
        phone:""
      },
      faceFile:[],
      emblemFile:[]
    },
    radioChange(e){
      let type = e.detail.value
      this.setData({
        type
      })
    },
    // 个人相关funciton
    inputName(e){
      let personal = this.data.personal
      personal.name = e.detail.value
      this.setData({
        personal
      })
    },
    inputIdcard(e){
      let personal = this.data.personal
      personal.idcard = e.detail.value
      this.setData({
        personal
      })
    },
    inputPhone(e){
      let personal = this.data.personal
      personal.phone = e.detail.value
      this.setData({
        personal
      })
    },
    chooseFaceImage(e){
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          let faceFile = tempFilePaths
          _this.setData({
            faceFile
          })
        }
      })
    },
    chooseEmblemImage(e){
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          let emblemFile = tempFilePaths
          _this.setData({
            emblemFile
          })
        }
      })
    },
    // 保存function
    validateP(){
      let personal = this.data.personal
      if(!personal.name){
        return {code:'error',msg:"请输入姓名"}
      }
      if(!personal.idcard){
        return {code:'error',msg:"请输入代表人身份证号"}
      }
      if(!personal.phone){
        return {code:'error',msg:"请输入手机号"}
      }
      if(!(/^1[3456789]\d{9}$/.test(personal.phone))){ 
        return {code:'error',msg:"手机号格式错误"}
      } 
      return {code:'ok',msg:"success"}
    },
    saveFun(){
      let validateP = this.validateP()
      let personal = this.data.personal
     if(validateP.code == "error"){
       wx.showToast({
         title:validateP.msg,
         icon:'none',
         mask:true
       })
       return
     }
      console.log(personal)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
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