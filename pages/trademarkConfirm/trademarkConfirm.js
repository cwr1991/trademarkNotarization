const app = getApp()
Page({
    data:{
        selected:false,
        id:'',
        list:{},
        username:'',
        phone:''
    },
    selectAgree(){
        let selected = this.data.selected
        this.setData({
            selected:!selected
        })
    },
    userFun(e){
        this.setData({
            username:e.detail.value
        })
    },
    phoneFun(e){
        this.setData({
            phone:e.detail.value
        })
    },
    validate(){
        let phone = this.data.phone
        let lx_name = this.data.username
        let selected = this.data.selected
        if(!selected){
            return {code:'error',msg:"请输入勾选尚标服务协议"}
        }
        if(!lx_name){
            return {code:'error',msg:"请输入联系人名称"}
        }
        if(!phone){
            return {code:'error',msg:"请输入手机号"}
        }
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            return {code:'error',msg:"手机号格式错误"}
        } 
          return {code:'ok',msg:"success"}

    },
    payFun(){
        let validateRseult = this.validate()
        if(validateRseult.code == "error"){
         wx.showToast({
           title:validateRseult.msg,
           icon:'none'
         })
         return
       }
        let lx_name = this.data.username
        let lx_phone = this.data.phone
        let id = this.data.id
        let url = app.baseUrl
        let data = {
            lx_name,
            lx_phone,
            id,
            openid:app.openid ||'oKjx85fKXjZHMP2l3qyLfhryqFSM'
        }
        wx.showLoading({
            title:'加载中',
            mask:true
        })
        wx.request({
            url:url + '/gzytrading/create-order' ,
            method:"POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data,
            success:result=>{
              let res = result.data
              let order_id = res.result.order_id
              let price = this.data.list.reserve_price*0.3
              wx.hideLoading()
              if(res.status == '0'){
                wx.navigateTo({
                    url: `/pages/payment/payment?order_id=${order_id}&type=1&price=${price}`,
                    success: function(res){
                        // success
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
              }else{
                  wx.showToast({
                      title:res.msg,
                      icon:"none"
                  })
              }
              console.log(order_id,"order_id")           
            }
        })
    },
    getData(){
        let url  = app.newbaseUrl 
        // let openid = app.openid || 'oKjx85fKXjZHMP2l3qyLfhryqFSM'
        let id = this.data.id
        let that = this
        wx.request({
            url: url + `/product/detail?id=${id}`,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function(result){
                let res = result.data
                if(res.errorCode == 200){
                    that.setData({
                        list:res.data
                    })
                }else{
                    wx.showToast({
                        title:res.message,
                        icon:'none'
                    })
                }
            },
            fail: function() {
                wx.showToast({
                    title:'网络错误',
                    icon:'none'
                })
            },
            complete: function() {
                // complete
            }
        })
    },
    onLoad(option){
        let id = option.id
        console.log(option,"id")
        this.setData({
            id
        })
        this.getData()
    }
})