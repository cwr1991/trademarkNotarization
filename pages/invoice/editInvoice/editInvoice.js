// pages/invoice/editInvoice/editInvoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    if (option.data!="null") {
      option.isDefault = parseInt(option.isDefault)
      this.setData({
        editInfo: option
      })
      console.log(this.data.editInfo)
    }

    
    // if传入的isEdit是true
    if (this.data.editInfo.isEdit) {
      wx.setNavigationBarTitle({
        title: '编辑开票信息'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '添加开票信息'
      })
    }
  },

  //删除
  deleteData: function (e) {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此开票信息吗',
      cancelColor: '#666666',
      confirmColor: '#f44447',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.deletefun()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deletefun: function() {
    var id = this.data.editInfo.id
    console.log(this.data.editInfo)
    wx.request({
      url: 'https://wwxs.86sb.com/gzynew/delete-invoice-info',
      data: {
        openid: 'oKjx85YYAvzlPvGFU9ao4gC9uX3c',
        id: id
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/invoice/invoice'
        })
      },
    })
  },

  // 编辑保存开票信息
  editsaveData: function(e) {
    console.log("editbaocun", e)
    var sort = this.data.editInfo.sort
    wx.request({
      url: 'https://wwxs.86sb.com/gzynew/edit-invoice-info',
      data: {
        openid: 'oKjx85YYAvzlPvGFU9ao4gC9uX3c',
        title: this.data.editInfo.company,
        taxpayerId: this.data.editInfo.num,
        types: this.data.editInfo.types,
        company_address: this.data.editInfo.address,
        company_bank: this.data.editInfo.bank,
        company_count:this.data.editInfo.count,
        is_default: this.data.editInfo.isDefault,
        id:this.data.editInfo.id
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/invoice/invoice'
        })
      },
    })
  },

  // 编辑信息改变发送到开票信息
  bindTaitou(e) {
    console.log(e)
    var editInfo = this.data.editInfo
    editInfo.company = e.detail.value
    this.setData({
      editInfo: editInfo
    })
    console.log(this.data.editInfo)
  },
  bindNum(e) {
    var editInfo = this.data.editInfo
    editInfo.num = e.detail.value
    this.setData({
      editInfo: editInfo
    })
  },
  bindAddress(e) {
    var editInfo = this.data.editInfo
    editInfo.address = e.detail.value
    this.setData({
      editInfo: editInfo
    })
  },
  bindBank(e) {
    var editInfo = this.data.editInfo
    editInfo.bank = e.detail.value
    this.setData({
      editInfo: editInfo
    })
  },
  bindAccount(e) {
    var editInfo = this.data.editInfo
    editInfo.count = e.detail.value
    this.setData({
      editInfo: editInfo
    })
  },
  switchChange(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var editInfo = this.data.editInfo
    if (e.detail.value) {
      editInfo.isDefault = 1
    } else {
      editInfo.isDefault = 0
    }
    this.setData({
      editInfo: editInfo
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