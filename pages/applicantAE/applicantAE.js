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
            value: '2',
            checked: 'true'
          },
          {
            name: '香港',
            value: '3'
          },
          {
            name: '个人',
            value: '1'
          }
      ],
      type:'2',
      personal:{
        username:"",
        mobile:"",
        yun_idCode:""
      },
      company:{
        legalPersonName:"", //法人姓名
        legalPersonCardNo:"", //法人身份证号
        legalPersonMobile:"",   //法人手机号
        enterpriseName:'',     //企业名称
        businessLicenseId:''   //信用代码
      },
      hk:{
        legalPersonName:"", //代表人姓名
        legalPersonCardNo:"",//代表人身份证号
        legalPersonMobile:"",//代表人手机号
        offshoreCompanyName:'', //香港企业名称
        offshoreCompanyNo:'', //香港企业注册编号	
        offshoreCompanyDate:''
      },
      faceFile:[],
      emblemFile:[],
      licenseFile:[],//营业执照
      hkFile:[]//香港图片附件
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
      if(type == '1'){
        let personal = this.data.personal
        personal.username = e.detail.value
        this.setData({
          personal
        })
      }else if(type == '2'){
        let company = this.data.company
        company.legalPersonName = e.detail.value
        this.setData({
          company
        })
      }else{
        let hk = this.data.hk
        hk.legalPersonName = e.detail.value
        this.setData({
          hk
        })
      }
    },
    inputIdcard(e){
      let type = this.data.type 
      if(type == '1'){
        let personal = this.data.personal
        personal.yun_idCode = e.detail.value
        this.setData({
          personal
        })
      }else if(type == '2'){
        let company = this.data.company
        company.legalPersonCardNo = e.detail.value
        this.setData({
          company
        })
      }else{
        let hk = this.data.hk
        hk.legalPersonCardNo = e.detail.value
        this.setData({
          hk
        })
      }
    },
    inputPhone(e){
      let type = this.data.type 
      if(type == '1'){
        let personal = this.data.personal
        personal.mobile = e.detail.value
        this.setData({
          personal
        })
      }else if(type == '2'){
        let company = this.data.company
        company.legalPersonMobile = e.detail.value
        this.setData({
          company
        })
      }else{
        let hk = this.data.hk
        hk.legalPersonMobile = e.detail.value
        this.setData({
          hk
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
          // wx.uploadFile({
          //   url: `${app.baseUrl}/gzynew/get-code-info`, //仅为示例，并非真实的接口地址
          //   filePath: tempFilePaths[0],
          //   name: 'pic',
          //   header: {
          //     "Content-Type": "multipart/form-data"//记得设置
          //   },
          //   formData: {
          //     'type': 'face'
          //   },
          //   success (res){
          //     // const data = res.data
          //     //do something
          //     console.log(res.data)
          //   }
          // })
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
      console.log(company,"company")
      company.enterpriseName = e.detail.value
      this.setData({
        company
      })
    },
    // 信用代码
    companyCodeFun(e){
      let company = this.data.company
      company.businessLicenseId = e.detail.value
      this.setData({
        company
      })
    },
    // 香港fun
    hkNameFun(e){
      let hk = this.data.hk
      hk.offshoreCompanyName = e.detail.value
      this.setData({
        hk
      })
    },
    hkCodeFun(e){
      let hk = this.data.hk
      hk.offshoreCompanyNo = e.detail.value
      this.setData({
        hk
      })
    },
    bindDateChange(e){
      let hk=  this.data.hk
      hk.offshoreCompanyDate = e.detail.value
      this.setData({
        hk
      })
    },
    chooseHkImage(){
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          let hkFile = tempFilePaths
          let hk = _this.data.hk
          hk.pic = tempFilePaths[0]
          _this.setData({
            hkFile,
            hk
          })
        }
      })
    },
    // 保存function
    validateP(){
      let personal = this.data.personal
      if(!personal.username){
        return {code:'error',msg:"请输入姓名"}
      }
      if(!personal.yun_idCode){
        return {code:'error',msg:"请输入代表人身份证号"}
      }
      if(!personal.mobile){
        return {code:'error',msg:"请输入手机号"}
      }
      if(!(/^1[3456789]\d{9}$/.test(personal.mobile))){ 
        return {code:'error',msg:"手机号格式错误"}
      } 
      return {code:'ok',msg:"success"}
    },
    validateC(){
      let company = this.data.company
      if(!company.legalPersonName){
        return {code:'error',msg:"请输入法人姓名"}
      }
      if(!company.legalPersonCardNo){
        return {code:'error',msg:"请输入法人身份证号"}
      }
      if(!company.legalPersonMobile){
        return {code:'error',msg:"请输入法人手机号码"}
      }
      if(!(/^1[3456789]\d{9}$/.test(company.legalPersonMobile))){ 
        return {code:'error',msg:"手机号格式错误"}
      } 
      if(!company.enterpriseName){
        return {code:'error',msg:"请输入公司名称"}
      }
      if(!company.businessLicenseId){
        return {code:'error',msg:"请输入社会统一信用代码"}
      }
      return {code:'ok',msg:"success"}
    },
    validateH(){
      let hk = this.data.hk
      if(!hk.legalPersonName){
        return {code:'error',msg:"请输入代表人姓名"}
      }
      if(!hk.legalPersonCardNo){
        return {code:'error',msg:"请输入代表人身份证号"}
      }
      if(!hk.legalPersonMobile){
        return {code:'error',msg:"请输入董事手机号码"}
      }
      if(!(/^1[3456789]\d{9}$/.test(hk.legalPersonMobile))){ 
        return {code:'error',msg:"手机号格式错误"}
      } 
      if(!hk.offshoreCompanyName){
        return {code:'error',msg:"请输入公司名称"}
      }
      if(!hk.offshoreCompanyNo){
        return {code:'error',msg:"请输入公司注册编码"}
      }
      if(!hk.pic){
        return {code:'error',msg:"请上传图片附件"}
      }
      return {code:'ok',msg:"success"}
    },
    // 保存个人信息fun
    personalReq(){
      let personal = this.data.personal
      let openid = app.openid || "oKjx85fKXjZHMP2l3qyLfhryqFSM"
      let data = {
        username:personal.username,
        mobile:personal.mobile,
        yun_idCode:personal.yun_idCode,
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
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:"none"
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
     // 保存公司信息fun
    companyReq(){
      let company = this.data.company
      company.openid = app.openid || "oKjx85fKXjZHMP2l3qyLfhryqFSM"
      wx.showLoading({
        title:'保存中'
      })
      wx.request({
        url: `${app.baseUrl}/gzynew/companyregister`, //
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:company,
        success (res) {
          console.log(res.data)
          if(res.data.status == '0' ){
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:"none"
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
    hkReq(){
      let hk = this.data.hk
      hk.openid = app.openid || "oKjx85fKXjZHMP2l3qyLfhryqFSM"
      wx.showLoading({
        title:'保存中'
      })
      wx.request({
        url: `${app.baseUrl}/gzynew/applyoffshorecompany`,
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:hk,
        success (res) {
          console.log(res.data)
          if(res.data.status == '0' ){
            // wx.navigateBack({
            //   delta: 1
            // })
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:"none"
            })
          }
        },
        fail(err){
          wx.showToast({
            title:"系统错误",
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
      if(type == '1'){
        let validateRseult = this.validateP()
        if(validateRseult.code == "error"){
          wx.showToast({
            title:validateRseult.msg,
            icon:'none'
          })
          return
        }
        this.personalReq()
      }else if(type =='2'){
        let validateRseult = this.validateC()
        if(validateRseult.code == "error"){
          wx.showToast({
            title:validateRseult.msg,
            icon:'none'
          })
          return
        }
        this.companyReq()
      }else{
        let validateRseult = this.validateH()
        if(validateRseult.code == "error"){
          wx.showToast({
            title:validateRseult.msg,
            icon:'none'
          })
          return
        }
        this.hkReq()
      }
    },
    getEditList(id){
      let _this = this
      let data = {
        openid: app.openid ||  "oKjx85fKXjZHMP2l3qyLfhryqFSM",
        user_phone_id:id
      }
      wx.request({
        url: `${app.baseUrl}/gzynew/show-register`, //
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data,
        success (res) {
          let type = _this.data.type
          if(res.data.status == '0' ){
            let result = res.data.result
              if(type == 1){
                let personal = {
                  mobile : result.phone,
                  username : result.username,
                  yun_idCode : result.yun_idCode
                }
                _this.setData({
                  personal
                })
              }else if(type == '2'){
                let company={
                  legalPersonName:result.username, 
                  legalPersonCardNo:result.yun_idCode,
                  legalPersonMobile:result.phone,  
                  enterpriseName:result.enterprise_name,     
                  businessLicenseId:result.business_license_id
                }
                _this.setData({
                  company
                })
              }else if(type == '3'){
                let hk = {
                  legalPersonName:result.username, 
                  legalPersonCardNo:result.yun_idCode,
                  legalPersonMobile:result.phone,  
                  offshoreCompanyName:result.enterprise_name, 
                  offshoreCompanyNo:result.business_license_id, 	
                  offshoreCompanyDate:result.offshore_company_date
                }
                _this.setData({
                  hk
                })
              }
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:"none"
            })
          }
        },
        fail(err){
          wx.showToast({
            title:"系统错误",
            icon:"none"
          })
        },
        complete(){
          // wx.hideLoading()
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
      if(options.id){
        this.getEditList(options.id)
        wx.setNavigationBarTitle({
          title: '编辑申请人'
        })
      }
      if(options.types == '1'){
        let applicantType = this.data.applicantType
        applicantType = [
          {
            name: '企业',
            value: '2' 
           
          },
          {
            name: '香港',
            value: '3',
          },
          {
            name: '个人',
            value: '1',
            checked: 'true'
          }
      ]
        let type = options.types
        console.log(type)
        this.setData({
          type,
          applicantType
        })
      }else if(options.types == '2'){
        let applicantType = this.data.applicantType
        applicantType = [
          {
            name: '企业',
            value: '2' ,
            checked: 'true'
           
          },
          {
            name: '香港',
            value: '3',
          },
          {
            name: '个人',
            value: '1',
          }
      ]
        let type = options.types
        this.setData({
          type,
          applicantType
        })
      }else if (options.types == '3'){
        let applicantType = this.data.applicantType
        applicantType = [
          {
            name: '企业',
            value: '2'         
          },
          {
            name: '香港',
            value: '3',
            checked: 'true'
          },
          {
            name: '个人',
            value: '1'
          }
      ]
        let type = options.types
        this.setData({
          type,
          applicantType
        })
      }
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