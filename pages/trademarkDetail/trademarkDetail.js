Page({
    data:{
        index:1
    },
    changeItem(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            index
        })
    },
})