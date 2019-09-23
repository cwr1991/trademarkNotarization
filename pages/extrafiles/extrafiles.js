// pages/extrafiles/extrafiles.js
const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    idcard1:'',//身份证正面
    idcard2:'',//身份证反面
    issubmit:false
  },
  chooseImage1: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: app.baseUrl + '/gzynew/upload-img-gz',
          filePath: tempFilePaths[0],
          name: 'file',
          dataType: 'json',
          formData: {
            'user': 'test',
            orderId: that.data.order_id,
            evidName: '身份证正面',
            evidType: 4
          },
          success(res) {
            if (JSON.parse(res.data).status != 0) {
              return false;
            }
            console.log(res.data)
            that.setData({
              idcard1: JSON.parse(res.data).result.resOss.file
            });
            
          }
        })
      }
    })
  },
  chooseImage2: function () {
    var that = this;
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
            evidName: '身份证反面',
            evidType: 5 
          },
          success(res) {
            if (JSON.parse(res.data).status != 0) {
              return false;
            }
            that.setData({
              idcard2: JSON.parse(res.data).result.resOss.file
            });
          }
        })
      }
    })
  },
  chooseImage3: function () {
    var that = this;
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
            evidName: '商标受理通知书',
            evidType: 3
          },
          success(res) {
            if (JSON.parse(res.data).status != 0) {
              return false;
            }
            that.setData({
              resnotice: JSON.parse(res.data).result.resOss.file
            });
          }
        })
      }
    })
  },
  chooseImage4: function () {
    var that = this;
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
            evidName: '受让人身份证明材料',
            evidType: 7
          },
          success(res) {
            if (JSON.parse(res.data).status != 0) {
              return false;
            }
            that.setData({
              rescertificate: JSON.parse(res.data).result.resOss.file
            });
          }
        })
      }
    })
  },

  goback(){
    
    wx.showLoading({
      title: '请稍后',
    })
    setTimeout(function(){
      wx.hideLoading();
    },2000)
    wx.showToast({
      title: '已成功提交',
      icon: 'success',
      duration: 2000,
     
    })
    if(this.data.issubmit){
      wx.showToast({
        title: '请不要重复提交',
        icon:'none'
      })
      return;
    }
    this.setData({
      issubmit: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderid = options.orderid;
    this.setData({
      orderid
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