Page({
    data:{
        typeArr:[]
    },
    onLoad(e){
        console.log(e,"opt")
        let typeIdArr = e.typeIds.split(',');
        let typeArr = [
            {
                type:"1",
                id:1,
                name:"1-类涂料油漆1"
            },
            {
                type:"11",
                id:11,
                name:"11-类涂料油漆11"
            },
            {
                type:"12",
                id:12,
                name:"12-类涂料油漆12"
            },
            {
                type:"13",
                id:13,
                name:"13-类涂料油漆13"
            },
        ]
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