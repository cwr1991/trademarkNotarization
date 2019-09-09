const app = getApp()

Page({
    data:{
       searchVal:'',
       priceList:["全部","一万以下","1-3万","3-5万"],
       priceIndex:'',
       typeList:["全部","中文","英文","图形"],
       typeIndex:'',
       fontList:["全部","1-2字","2个字","3个字","4个字","4字以上"],
       fontIndex:'',
       yearList:["全部","一年以上","二年以上","三年以上"],
       yearIndex:'',
       phoneVal:'' , //留电
       helpPhoneVal:"", //客服帮助 留电
       page:1 ,
       loadEnd:false, //false 不显示加载中
       empty:false,  
       list:[],
       typeArr:[],     //45类商标选中的类别 
       hotTypes:[],    //热门类别
       hotProduct:[],  //热门项目
       group:'',//选中热门项目的id
       floorstatus:false   //是否显示返回顶部按钮
    },
    // 类别fun
    navigateTo(){
        let typeArr = this.data.typeArr
        let typeIds
        if(typeArr.length == 0 ){
            typeIds = 0
        }else{
            let typeIdArr = typeArr.map((element)=>{
                return element.id
            })
             typeIds = typeIdArr.join(',')
        }
        wx.navigateTo({
            url: `/pages/trademarkType/trademarkType?typeIds=${typeIds}`,
        })
    },
    // 搜索fun
    handleInput(e){
        let searchVal = e.detail.value
        this.setData({
            searchVal
        })
    },
    searchFun(){
        this.setData({
            list:[],
            page:1,
            loadEnd:false,
            empty:false
        })
        this.getData()
    },
    // 列表筛选fun 
    bindPriceChange(e){
        let priceIndex = e.detail.value
        this.setData({
            priceIndex,
            page:1,
            list:[],
            loadEnd:false,
            empty:false
        })
        this.getData()
    },
    bindTypeChange(e){
        let typeIndex = e.detail.value
        this.setData({
            typeIndex,
            page:1,
            list:[],
            loadEnd:false,
            empty:false
        })
        this.getData()
    },
    bindFontChange(e){
        let fontIndex = e.detail.value
        this.setData({
            fontIndex,
            page:1,
            list:[],
            loadEnd:false,
            empty:false
        })
        this.getData()
    },
    bindYearChange(e){
        let yearIndex = e.detail.value
        this.setData({
            yearIndex,
            page:1,
            list:[],
            loadEnd:false,
            empty:false
        })
        this.getData()
    },
    //留电
    validatePhone(){
        let phone = this.data.phoneVal
        if(!phone){
            return {code:'error',msg:"请输入手机号"}
        }
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        return {code:'error',msg:"手机号格式错误"}
        } 
        return {code:'success'}
    },
    phoneFun(e){
        let phoneVal = e.detail.value 
        this.setData({
            phoneVal
        })
    },
    subPhone(){ 
        let validateRes = this.validatePhone()
        if(validateRes.code == 'error'){
           wx.showToast({
               title:validateRes.msg,
               icon:"none"
           })
           return
       }
       let url = app.baseUrl
       let phoneVal = this.data.phoneVal
       wx.showLoading({
           title:"提交中",
           icon:'none'
       })
       wx.request({
           url:url + '/gzytrading/calltel',
           data: {
                nums:phoneVal
           },
           method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
           // header: {}, // 设置请求的 header
           success: function(res){
               // success
               let result = res.data
               console.log(result)
               wx.showToast({
                   title:result.msg,
                   icon:"none"
               })
           },
           fail: function() {
               // fail
           }
       })
    },
    // 热门项目fun
    handleHotP(e){
        let index = e.currentTarget.dataset.idx
        let hotProduct = this.data.hotProduct 
        hotProduct.forEach((element)=>{
            element.checked = false
        })
        hotProduct[index].checked = true
        let group =  hotProduct[index].id
        this.setData({
            hotProduct,
            group
        })
    },
    // 热门类别FUN
    handleHotT(e){
        let index = e.currentTarget.dataset.idx
        let hotTypes =  this.data.hotTypes
        let typeArr =  [hotTypes[index]]
        this.setData({
            typeArr
        })
    },
    // 对data进行组装
    dataFun(){
        let page = this.data.page 
        let typeArr = this.data.typeArr
        let intCls   //商标类别
        if(typeArr.length == 0 ){
            intCls = 0
        }else{
            let typeIdArr = typeArr.map((element)=>{
                return element.id
            })
            intCls = typeIdArr.join(',')
        }
        let group = this.data.group //商标群组
        let keyword = this.data.searchVal   //商标名称
        let price = this.data.priceIndex
        let nature = this.data.typeIndex //中英文
        let fontIndex = this.data.fontIndex
        var word  = 0
        if(fontIndex == 0){
            word = 0
        }else if(fontIndex == 1){
            word=1
        }else if(fontIndex == 2){
            word=7
        }else if(fontIndex == 3){
            word=2
        }else if(fontIndex == 4){
            word=3
        }else if(fontIndex == 5){
            word=4
        }        
         //字数
        let year   = this.data.yearIndex //年限
        let data = {
            intCls,
            page,
            keyword,
            group,
            price,
            nature,
            word,
            year
        }
        return data
    },
    // 拉取数据
    getData(){
        let list = this.data.list
        let url  = app.newbaseUrl 
        let openid = app.openid || 'oKjx85fKXjZHMP2l3qyLfhryqFSM'
        let page = this.data.page
        let data  = this.dataFun()
            // let hotProduct = this.data.hotProduct
            // hotProduct = [
            //     {
            //         name:"0201防腐剂1",
            //         id:1
            //     },
            //     {
            //         name:"0201防腐剂12",
            //         id:12
            //     },
            //     {
            //         name:"0201防腐剂13",
            //         id:13
            //     },
            //     {
            //         name:"0201防腐剂14",
            //         id:14
            //     },
            //     {
            //         name:"0201防腐剂15",
            //         id:15
            //     },
            //     {
            //         name:"0201防腐剂16",
            //         id:16
            //     },
            //     {
            //         name:"0201防腐剂17",
            //         id:17
            //     },
            //     {
            //         name:"0201防腐剂18",
            //         id:18
            //     },
            // ]
            // hotProduct.forEach(element => {
            //     element.checked = false
            // });
            // let hotTypes = this.data.hotTypes
            //     hotTypes = [ 
            //         {
            //             name:'服装项目',
            //             id:'1',
            //             type:"第1类"
            //         },
            //         {
            //             name:'服装项目2',
            //             id:'12',
            //             type:"第12类"
            //         },
            //         {
            //             name:'服装项目3',
            //             id:'13',
            //             type:"第13类"
            //         },
            //         {
            //             name:'服装项目4',
            //             id:'14',
            //             type:"第14类"
            //         },
            //         {
            //             name:'服装项目5',
            //             id:'15',
            //             type:"第15类"
            //         },
            //         {
            //             name:'服装项目6',
            //             id:'16',
            //             type:"第16类"
            //         },
            //         {
            //             name:'服装项目7',
            //             id:'17',
            //             type:"第17类"
            //         },
            //         {
            //             name:'服装项目8',
            //             id:'18',
            //             type:"第18类"
            //         }
            //     ]
            // this.setData({
            //     list,
            //     hotProduct,
            //     hotTypes
            // })
             wx.showLoading({
                title:'加载中',
                mask:true
            })
            wx.request({
                url:url + '/product/list' ,
                method:"POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data,
                success:result=>{
                  let res = result.data
                 
                  wx.hideLoading()
                  if(res.data.length == 0 && page == 1){
                    list = res.data
                    this.setData({
                        loadEnd:false,
                        empty:true,
                        list
                    })
                    return
                  }
                  if(res.data.length == 0 ){
                    this.setData({
                        loadEnd:false,
                        empty:true
                    })
                    return
                  }
                  if(res.data.length < 20 && page ==1){
                    list = [...list,...res.data]
                    this.setData({
                        loadEnd:false,
                        empty:true,
                        list
                    })
                  }else{
                    list = [...list,...res.data]
                    this.setData({
                      list,
                      loadEnd:false
                    })
                  }
                }
            })
    },
    // 加载更多
    onReachBottom: function() {
        // Do something when page reach bottom.
        if(!this.data.loadEnd&&!this.data.empty){
            let page = this.data.page
            page++
            this.setData({
                page,
                loadEnd:true,
            })
            this.getData()
        } 
    },
    onLoad(option){
        this.getData()
    },
    onShow(){
        this.setData({
            page:1,
            list:[],
            loadEnd:false,
            empty:false
        })
        this.getData()
    },
    onPageScroll: function (e) {
       let windowHeight = wx.getSystemInfoSync().windowHeight   
        if (e.scrollTop > windowHeight) {
          this.setData({
            floorstatus: true
          });
        } else {
          this.setData({
            floorstatus: false
          });
        }
    },
    backTop(){
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    }
})