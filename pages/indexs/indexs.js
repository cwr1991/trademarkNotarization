// pages/indexs/indexs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classdata:[
      {
        classicons:'https://b.86sb.com.cn/wximg/class25.png',
        classnum:'25',
        classname:'服装鞋帽'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class03.png',
        classnum: '03',
        classname: '日化用品'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class43.png',
        classnum: '43',
        classname: '餐饮住宿'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class30.png',
        classnum: '30',
        classname: '方便食品'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class05.png',
        classnum: '05',
        classname: '医药品'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class09.png',
        classnum: '09',
        classname: '科学仪器'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class20.png',
        classnum: '20',
        classname: '家具'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class29.png',
        classnum: '29',
        classname: '食品'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class33.png',
        classnum: '33',
        classname: '酒'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class35.png',
        classnum: '35',
        classname: '广告销售'
      }
    ],
    keyword:'',
    phone:'',
    multiArray:[],
    city:[],
    multiIndex:[0,0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.newbaseUrl + '/product/domain',
      success(res) {
        that.setData({
          multiArray: [[...res.data.data], [...res.data.data[0].children]],
          city: res.data.data
        })
      }
    })

  },
  bindMultiPickerColumnChange: function (e){
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiArray[1] = this.data.city[e.detail.value].children;
        break;
    }
    this.setData({
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    })
  },
  bindMultiPickerChange:function(e){
    wx.request({
      url: app.newbaseUrl + '/product/domainIntCls',
      data:{
        id: this.data.multiArray[1][e.detail.value[1]].id
      },
      success(res) {
        console.log(res.data.data.join());
      }
    })

  },
  bindKeyInput:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  bindKeyintelligent:function(e){
    this.setData({
      keyword: e.detail.value
    })
  },
  tapintelligent:function(){
    if (this.data.keyword == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入搜索的内容',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: app.newbaseUrl + '/product/search',
      data:{
        keyword: this.data.keyword
      },
      success(res) {
        console.log(res.data.data.join());
      }
    })
  },
  tapsavephone:function(){
    if (this.data.phone == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
        duration: 2000
      })
      return false;
    }
    if (this.data.phone.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
        duration: 2000
      })
      return false;
    }
    var that = this;
    wx.request({
      url: app.baseUrl + '/gzytrading/calltel',
      data: {
        nums: that.data.phone,
        title:'商标交易小程序首页'
      },
      success(res) {
        if (res.data.status==0){
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})