// pages/indexs/indexs.js
const app = getApp();
let jsMD5 = require("../../utils/hexMD5.js");
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
        classnum: '3',
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
        classnum: '5',
        classname: '医药品'
      },
      {
        classicons: 'https://b.86sb.com.cn/wximg/class09.png',
        classnum: '9',
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
    multiIndex:[0,0],
    appkey:'7EoYU04WiaaY^qkHOP*%dc@*LNVnN1NK',
    datalist:[]
  },
  signGenerate:function(data) {

    let ret = [];
    for (let it in data) {
      let val = data[it];
      ret.push(it + '=' + val);
    }
    ret.sort();
    let res = encodeURI(ret.join('&')) + '&appkey=' + this.data.appkey;
    return jsMD5.hexMD5(res);
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

    var signdata = that.signGenerate({
      aid: 77,
      terminal: 2
    });
    wx.request({
      url: app.newbaseUrl+'/trademark_adv/list',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        sign: signdata,
        aid: 77,
        terminal: 2
      },
      success(res) {
        that.setData({
          datalist:res.data.data
        })
      }
    })


  },
  bindtoall:function(){
    app.sbclasses = '';
    wx.switchTab({
      url: '/pages/trademarkList/trademarkList'
    })
  },
  bindTosblist:function(e){
    app.sbclasses = e.currentTarget.dataset.id
    wx.switchTab({
      url: '/pages/trademarkList/trademarkList'
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
        app.sbclasses = res.data.data.join();
        wx.switchTab({
          url: '/pages/trademarkList/trademarkList'
        })
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
    app.searchWord = this.data.keyword;
    wx.switchTab({
      url: '/pages/trademarkList/trademarkList'
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