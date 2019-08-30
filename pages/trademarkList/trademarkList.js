Page({
    data:{
       searchVal:'',
       priceList:["不限","一万以下","1-3万","3-5万"],
       priceIndex:'',
       typeList:["不限","纯中文","纯英文","中文+英文","数字","图形"],
       typeIndex:'',
       fontList:["不限","1个字","2个字","3个字","4个字","4字以上"],
       fontIndex:'',
       yearList:["不限","一年以上","二年以上","三年以上"],
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
        console.log(typeIds)
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
        let searchVal = this.data.searchVal
        console.log(searchVal)
    },
    // 列表筛选fun 
    bindPriceChange(e){
        let priceIndex = e.detail.value
        this.setData({
            priceIndex,
            page:1
        })
    },
    bindTypeChange(e){
        let typeIndex = e.detail.value
        this.setData({
            typeIndex,
            page:1
        })
    },
    bindFontChange(e){
        let fontIndex = e.detail.value
        this.setData({
            fontIndex,
            page:1
        })
    },
    bindYearChange(e){
        let yearIndex = e.detail.value
        this.setData({
            yearIndex,
            page:1
        })
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
    },
    // 热门项目fun
    handleHotP(e){
        let index = e.currentTarget.dataset.idx
        let hotProduct = this.data.hotProduct 
        hotProduct.forEach((element)=>{
            element.checked = false
        })
        hotProduct[index].checked = true
        this.setData({
            hotProduct
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
    // 拉取数据
    getData(){
        let list = this.data.list
            list = [
            {
                name:"化学香料1",
                id:"1",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料2",
                id:"2",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料3",
                id:"3",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料4",
                id:"4",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料5",
                id:"5",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料6",
                id:"6",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料7",
                id:"7",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
            {
                name:"化学香料8",
                id:"8",
                description:"植物；动物食品，海参植物；动物食品，海参",
                price:"1888"
            },
        ]
        let hotProduct = this.data.hotProduct
        hotProduct = [
            {
                name:"0201防腐剂1",
                id:1
            },
            {
                name:"0201防腐剂12",
                id:12
            },
            {
                name:"0201防腐剂13",
                id:13
            },
            {
                name:"0201防腐剂14",
                id:14
            },
            {
                name:"0201防腐剂15",
                id:15
            },
            {
                name:"0201防腐剂16",
                id:16
            },
            {
                name:"0201防腐剂17",
                id:17
            },
            {
                name:"0201防腐剂18",
                id:18
            },
        ]
        hotProduct.forEach(element => {
            element.checked = false
        });
        let hotTypes = this.data.hotTypes
            hotTypes = [ 
                {
                    name:'服装项目',
                    id:'1',
                    type:"第1类"
                },
                {
                    name:'服装项目2',
                    id:'12',
                    type:"第12类"
                },
                {
                    name:'服装项目3',
                    id:'13',
                    type:"第13类"
                },
                {
                    name:'服装项目4',
                    id:'14',
                    type:"第14类"
                },
                {
                    name:'服装项目5',
                    id:'15',
                    type:"第15类"
                },
                {
                    name:'服装项目6',
                    id:'16',
                    type:"第16类"
                },
                {
                    name:'服装项目7',
                    id:'17',
                    type:"第17类"
                },
                {
                    name:'服装项目8',
                    id:'18',
                    type:"第18类"
                }
            ]
        this.setData({
            list,
            hotProduct,
            hotTypes
        })
    },
    // 加载更多
    onReachBottom: function() {
        // Do something when page reach bottom.
        if(!this.data.loadEnd&&!this.data.empty){
            let page = this.data.page
            page++
            // this.setData({
            //     page,
            //     loadEnd:true,
            // })
            // this.getData()
        } 
    },
    onLoad(option){
        this.getData()
    },
    onShow(){
        console.log(this.data.typeArr)
    },
})