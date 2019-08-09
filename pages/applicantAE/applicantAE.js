// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      applicantType:[
          {
            name: '企业',
            value: '1', //前端自定义,与后台无关
            checked: 'true'
          },
          {
            name: '香港',
            value: '2'
          },
          {
            name: '个人',
            value: '3'
          }
      ],
      type:'1',
      personal:{
        name:"",
        idcard:"",
        phone:""
      },
      company:{
        name:"",
        idcard:"",
        phone:"",
        companyName:'',
        companyCode:''
      },
      faceFile:[],
      emblemFile:[],
      licenseFile:[],//营业执照
    },
    radioChange(e){
      console.log(e)
      let type = e.detail.value
      this.setData({
        type
      })
    },
    // 个人相关funciton
    inputName(e){
      let type = this.data.type
      if(type == '3'){
        let personal = this.data.personal
        personal.name = e.detail.value
        this.setData({
          personal
        })
      }else if(type == '1'){
        let company = this.data.company
        company.name = e.detail.value
        this.setData({
          company
        })
      }

    },
    inputIdcard(e){
      let type = this.data.type 
      if(type == '3'){
        let personal = this.data.personal
        personal.idcard = e.detail.value
        this.setData({
          personal
        })
      }else if(type == '1'){
        let company = this.data.company
        company.idcard = e.detail.value
        this.setData({
          company
        })
      }
    },
    inputPhone(e){
      let type = this.data.type 
      if(type == '3'){
        let personal = this.data.personal
        personal.phone = e.detail.value
        this.setData({
          personal
        })
      }else if(type == '1'){
        let company = this.data.company
        company.phone = e.detail.value
        this.setData({
          company
        })
      }
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
    // 企业function
    chooseLicenseImage(){
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          let licenseFile = tempFilePaths
          _this.setData({
            licenseFile
          })
        }
      })
    },
    // 公司名称
    companyNameFun(e){
      let company = this.data.company
      company.companyName = e.detail.value
      this.setData({
        company
      })
    },
    // 信用代码
    companyCodeFun(e){
      let company = this.data.company
      company.companyCode = e.detail.value
      this.setData({
        company
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
    validateC(){
      let company = this.data.company
      if(!company.name){
        return {code:'error',msg:"请输入法人姓名"}
      }
      if(!company.idcard){
        return {code:'error',msg:"请输入法人身份证号"}
      }
      if(!company.phone){
        return {code:'error',msg:"请输入法人手机号码"}
      }
      if(!(/^1[3456789]\d{9}$/.test(company.phone))){ 
        return {code:'error',msg:"手机号格式错误"}
      } 
      if(!company.companyName){
        return {code:'error',msg:"请输入公司名称"}
      }
      if(!company.companyCode){
        return {code:'error',msg:"请输入社会统一信用代码"}
      }
      return {code:'ok',msg:"success"}
    },
    // 保存个人信息fun
    personalReq(){
      let personal = this.data.personal
      let openid = app.openid || "oKjx85fKXjZHMP2l3qyLfhryqFSM"
      let data = {
        username:personal.name,
        mobile:personal.phone,
        yun_idCode:personal.idcard,
        openid
      }
      wx.showLoading({
        title:'保存中'
      })
      wx.request({
        url: `${app.baseUrl}/gzynew/register`, //仅为示例，并非真实的接口地址
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data,
        success (res) {
          console.log(res.data)
          if(res.data.status == '0' ){
            wx.redirectTo({
              url:'/pages/applicantList/applicantList'
            })
          }
        },
        fail(err){
          wx.showToast({
            title:err.message,
            icon:"none"
          })
        },
        complete(){
          wx.hideLoading()
        }
      })
    },
    saveFun(){
      let type = this.data.type
      if(type == '3'){
        let validateRseult = this.validateP()
        if(validateRseult.code == "error"){
          wx.showToast({
            title:validateRseult.msg,
            icon:'none'
          })
          return
        }
        this.personalReq()
      }else if(type =='1'){
        let validateRseult = this.validateC()
        if(validateRseult.code == "error"){
          wx.showToast({
            title:validateRseult.msg,
            icon:'none'
          })
          return
        }
      }
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