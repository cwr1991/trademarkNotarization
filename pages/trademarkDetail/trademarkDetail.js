Page({
    data:{
        index:1,
        consult_show:false,
        phone:''  
    },
    changeItem(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            index
        })
    },
    // 立即购买fun
    purchase(){

    },
    // 收藏
    collectFun(){
       
    },
    // 咨询
    consultFun(){
        this.setData({
            consult_show:true
        })
    },
    // phone bindinput
    consultPhoneFun(e){
        let phone = e.detail.value
        this.setData({
            phone
        })
    },
    validate(){
        let phone = this.data.phone
        if(!phone){
            return {code:'error',msg:"请输入手机号"}
          }
          if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            return {code:'error',msg:"手机号格式错误"}
          } 
          return {code:'ok',msg:"success"}

    },
    closeMask(){
        this.setData({
            consult_show:false
        })
    },
    // 提交
    submitFun(){
       let validateRseult = this.validate()
       if(validateRseult.code == "error"){
        wx.showToast({
          title:validateRseult.msg,
          icon:'none'
        })
        return
      }
    },
    onLoad(option){
        let id = option.id
    }
})