// pages/buyercompany/buyercompany.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trademarkimgList:[],
    items: [
      { name: '0', value: '未下证' },
      { name: '1', value: '已下证'},
    ],
    array: ['大陆企业', '境外企业'],
    isradioActive:2,
    index: 0,
    businessImg:'',
    orderid:'',
    order_id:'',
    user_phone_id:'',
    registrationVal:'',
    nameVal:'',
    classVal:'',
    code_names:''
  },
  bindRegistrationVal: function (e){
    this.setData({
      registrationVal: e.detail.value
    })
  },
  chooseImage:function(){
    var that = this;
    if (that.data.isradioActive==2){
      wx.showToast({
        icon: 'none',
        title: '请选择商标状态'
      })
      return false;
    }
    if (that.data.isradioActive==1){
      var evidType = 1;
      var evidName = '商标注册证'
    }
    if (that.data.isradioActive == 0) {
      var evidType = 3;
      var evidName = '受理通知书'
    }
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++){
          wx.uploadFile({
            url: app.baseUrl +'/gzynew/upload-img-gz', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            dataType:'json',
            formData: {
              'user': 'test',
              orderId: that.data.orderid,
              evidName: evidName,
              evidType: evidType
            },
            success(res) {
              if (JSON.parse(res.data).status!=0){
                  return false;
              }
              var imglist = [];
              imglist.push(JSON.parse(res.data).result.resOss.file);
              that.setData({
                trademarkimgList: that.data.trademarkimgList.concat(imglist)
              });
            }
          })
        }
      }
    })
  },
  rmtrademarkimgList:function(e){
    var that = this;
    delete that.data.trademarkimgList[e.currentTarget.id];
    that.setData({
      trademarkimgList: that.data.trademarkimgList
    });
  },
  radioChange: function (e) {
    this.setData({
      isradioActive:e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  chooseImages:function(){
    var that = this;
    if(that.data.index==0){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: app.baseUrl + '/gzynew/upload-img-gz', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            dataType: 'json',
            formData: {
              'user': 'test',
              orderId: that.data.orderid,
              evidName: '营业执照',
              evidType: 6
            },
            success(res) {
              if (JSON.parse(res.data).status != 0) {
                return false;
              }
              that.setData({
                businessImg: JSON.parse(res.data).result.resOss.file
              });
              wx.request({
                url: app.baseUrl + '/gzynew/get-business-info',
                data: {
                  pic: JSON.parse(res.data).result.resOss.file,
                },
                success(res) {
                  if (res.data.status == 0) {
                      that.setData({
                        code_names:res.data.result.name
                      })
                  }
                }
              })
            }
          })

        }
      })
    }else if(that.data.index==1){

    }

  },
  getTrademarkMsg:function(){
    if (this.data.registrationVal==''){
      wx.showToast({
        icon: 'none',
        title: '请输入商标注册号'
      })
      return false;
    }
    var that = this;
    wx.request({
      url: app.baseUrl+'/gzynew/sb-info',
      data: {
        sbid: that.data.registrationVal
      },
      success(res) {
        if(res.data.status==1){
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
          return false;
        }
        that.setData({
          nameVal: res.data.result.sbname,
          classVal: res.data.result.sbbigclassid
        })
      }
    })

  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.sbRegistration==''){
      wx.showToast({
        icon: 'none',
        title: '请输入商标注册号'
      })
      return false;
    }
    if (e.detail.value.sbName == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入商标名称'
      })
      return false;
    }
    if (e.detail.value.sbClass == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入商标类别'
      })
      return false;
    }
    if (e.detail.value.sbClass == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入商标类别'
      })
      return false;
    }
    if (that.data.isradioActive==2){
      wx.showToast({
        icon: 'none',
        title: '请选择商标状态'
      })
      return false;
    }
 
    if (that.data.isradioActive==0){
      var tm_type =2;
      if (that.data.trademarkimgList.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请上传受理通知书'
        })
        return false;
      }
    }
    if (that.data.isradioActive == 1) {
      var tm_type = 1;
      if (that.data.trademarkimgList.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请上传商标证书'
        })
        return false;
      }
    }
    if (e.detail.value.code_name == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入买方公司名称'
      })
      return false;
    }

    if (that.data.businessImg == '') {
      wx.showToast({
        icon: 'none',
        title: '请上传营业执照'
      })
      return false;
    }
    if(that.data.index==0){
      var code_type = 7;
    }
    if(that.data.index==1){
      var code_type = 8;
    }
    wx.request({
      url: app.baseUrl + '/gzynew/orderupdate',
      data: {
        orderid: that.data.orderid,
        sbid: e.detail.value.sbRegistration,
        sbname: e.detail.value.sbName,
        sbbigclassid: e.detail.value.sbClass,
        type:2,
        code_name: e.detail.value.code_name,
        tm_data: that.data.trademarkimgList.join(","),
        code_front: that.data.businessImg,
        tm_type: tm_type,
        code_type:code_type,
        openid: app.openid
      },
      success(res) {
        if (res.data.status==0){
          wx.navigateTo({
            url: '/pages/affirm/affirm?orderid=' + that.data.orderid + '&order_id=' + that.data.order_id,
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.request({
      url: app.baseUrl+'/gzynew/ordercreate',
      data: {
        openid: app.openid,
        user_phone_id: options.id
      },
      success(res) {
        that.setData({
          orderid: res.data.result.orderid,
          user_phone_id:options.id,
          order_id: res.data.result.order_id
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})