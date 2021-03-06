const app = getApp()

Page({
    data:{
        index:1,
        consult_show:false,
        phone:''  ,
        id:"",
        list:{},
        group:'',
        grouds:'',
        action:0,  //1进行收藏取消收藏 0 :查询状态
        collected:false, //是否已收藏
    },
    changeItem(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            index
        })
    },
    // // 立即购买fun
    purchaseFun(){
        if (!app.usermob) {
            wx.navigateTo({
                url: '/pages/login/login',
              })
            return false;
        }
        let id = this.data.list.id
        wx.navigateTo({
            url: `/pages/trademarkConfirm/trademarkConfirm?id=${id}`,
        })
    },
    // 收藏
    collectFun(){
        if (!app.usermob) {
            wx.navigateTo({
                url: '/pages/login/login',
              })
            return false;
        }
        this.setData({
            action:1
        })
        this.getCollectStatus()
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
      let url = app.baseUrl
      let phone = this.data.phone
      let that = this
      wx.showLoading({
          title:"提交中",
          icon:'none'
      })
      wx.request({
          url:url + '/gzytrading/calltel',
          data: {
               nums:phone
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
              // success
              let result = res.data
              wx.showToast({
                  title:result.msg,
                  icon:"none"
              })
              that.setData({
                consult_show:false
            })
          },
          fail: function() {
              wx.showToast({
                  title:'网络错误',
                  icon:'none'
              })
          }
      })
    
    },
    getData(){
        let list = this.data.list
        let url  = app.newbaseUrl 
        let id = this.data.id
        let that = this
        wx.request({
            url: url + `/product/detail?id=${id}`,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function(result){
                let res = result.data
                if(res.errorCode == 200){
                    let group = res.data.group.join(',')
                    let goods = res.data.goods.join(',')
                    that.setData({
                        list:res.data,
                        group,
                        goods
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
    getCollectStatus(){
        let url  = app.baseUrl 
        let pid = this.data.id
        let that = this
        let action = this.data.action
        let data = {
            openid : app.openid,
            pid,
            action
        }
        wx.request({
            url: url + '/gzytrading/collection',
            data:data,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function(result){
                // success
                let res = result.data
                if(res.status == 0 ){
                    if(res.result.status == 0 ){
                        that.setData({
                            collected:false
                        })
                    }else{
                        that.setData({
                            collected:true
                        })
                    }
                    if(action == 1){
                        wx.showToast({
                            title:res.msg,
                            icon:'none'
                        })
                    }
                }else{
                    wx.showToast({
                        title:res.msg,
                        icon:'none'
                    })
                }
            },
            fail: function() {
                // fail
            }
        })
    },
    onLoad(option){
        let id = option.id
        this.setData({
            id
        })
        this.getData()
        this.getCollectStatus()
    },
    onUnload(){
        app.detailBack = true
    }
})