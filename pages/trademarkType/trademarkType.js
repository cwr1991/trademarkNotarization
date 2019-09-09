let brandType = require("../../utils/brandTypeList.js");
let app = getApp()
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
        let sbclasses = typeArray.map((element)=>{return element.id}).join(',')
        app.sbclasses = sbclasses
    },
})