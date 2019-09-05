// pages/collection/collection.js
const app = getApp()
Page({
  data:{
    page:1
  },
  onLoad: function() {
    let page=this.data.page;
    this.setData({
      slideButtons: [{
        extClass: 'delete_btn',
        type: 'warn',
        text: '删除',
        extClass: 'test',
        src: '', // icon的路径
      }],
    });

    wx.request({
      url: `${app.baseUrl}/gzytrading/collectionlist`,
      data: {
        openid: app.openid,
        page: page,
        limit:10
      },
      success: res => {
        console.log(res.data.result)
        this.setData({
          content: res.data.result.datas
        })
      }
    })
    console.log(this.data)
  },
  onReachBottom(){
    // 上拉触底显示loading
    wx.showLoading({
      title: '加载中',
    })

    let page = this.data.page;
    page++;
    wx.request({
      url: `${app.baseUrl}/gzytrading/collectionlist`,
      data: {
        openid: app.openid,
        page: page,
        limit: 10
      },
      success: res => {
        

        let content = this.data.content;//原数组
        let newcontent = res.data.result.datas;//每上拉加载一次得到的新数组
        
        //如果有数据
        if(newcontent.length!=0){
          // 成功拿到数据后
          wx.hideLoading()
          content = content.concat(newcontent)//合并新老数组
        }
        else{
          wx.hideLoading()
          wx.showToast({
            title: '已经到底啦',
            icon: 'none',
            duration: 2000
          })
        }
        this.setData({
          page,
          content:content
        })
      }
    })
  },
  // 取消收藏
  slideButtonTap(e) {
    let content =this.data.content
    let pid = e.currentTarget.dataset.pid;
    if(e.detail.index==0){
      wx.request({
        url: `${app.baseUrl}/gzytrading/collection`,
        data:{
          openid:app.openid,
          action:1,
          pid:pid
        },
        success:res => {
          if(res.data.msg=="取消收藏成功"){
            content.forEach((element,index) => {
              if (element.pid == pid){
                delete content[index]
              }
            })
          }
          this.setData({
            content:content
          })
        }
      })
    }
    console.log(this.data)
  }

});