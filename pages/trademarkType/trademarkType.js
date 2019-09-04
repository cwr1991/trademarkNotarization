let brandType = require("../../utils/brandTypeList.js");
Page({
    data:{
        typeArr:[]
    },
    onLoad(e){
        let typeIdArr = e.typeIds.split(',');
        let typeArr = brandType
        typeArr.forEach((element)=>{
            let id = '' + element.id
            if(typeIdArr.includes(id)){
                element.checked = true
            }else{
                element.checked = false
            }
        })
        this.setData({
            typeArr
        })
    },
    chooseType(e){
        let index = e.currentTarget.dataset.idx
        let check = e.currentTarget.dataset.check
        let typeArr = this.data.typeArr
        let typeArray = typeArr.filter((element)=>{
            if(element.checked){
                return element
            }
        })
        let allExit = typeArray.some((item)=>{
            return item.id == 0
        })
        if(allExit&&index!=0){
            wx.showToast({
                title:"选中全部类别,不能选择其他类别",
                icon:'none'
            })

            return
        }
        typeArr[index].checked = !check
        this.setData({
            typeArr
        })
    },
    onUnload(){
        let typeArr = this.data.typeArr
        let typeArray = typeArr.filter((element)=>{
            if(element.checked){
                return element
            }
        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
            typeArr:typeArray
        })
    },
})