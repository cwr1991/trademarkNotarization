// pages/invoice/editInvoice/editInvoice.js
const app = getApp()

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
  onLoad: function(option) {
    if (option.data != "null") {
      option.isDefault = parseInt(option.isDefault)
      this.setData({
        editInfo: option
      })
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
  deleteData: function(e) {
    var that = this;
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
    wx.request({
      url: `${app.baseUrl}/gzynew/delete-invoice-info`,
      data: {
        openid: app.openid,
        id: id
      },
      success(res) {
        wx.navigateBack({
          delta:1
        })
      },
    })
  },

  // 编辑保存开票信息
  editsaveData: function(e) {
    // 判断是值否为空
    var title =  this.data.editInfo.company;
    var taxpayerId = this.data.editInfo.num;
    var company_address = this.data.editInfo.address;
    var company_bank = this.data.editInfo.bank;
    var company_count = this.data.editInfo.count;
    if (!title) {
      wx.showToast({
        title: '请输入发票抬头',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!taxpayerId) {
      wx.showToast({
        title: '请输入识别号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!company_address) {
      wx.showToast({
        title: '请输入公司地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!company_bank) {
      wx.showToast({
        title: '请输入公司开户行',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!company_count) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    var sort = this.data.editInfo.sort
    wx.request({
      url: `${app.baseUrl}/gzynew/edit-invoice-info`,
      data: {
        openid: app.openid,
        title: this.data.editInfo.company,
        taxpayerId: this.data.editInfo.num,
        types: this.data.editInfo.types,
        company_address: this.data.editInfo.address,
        company_bank: this.data.editInfo.bank,
        company_count: this.data.editInfo.count,
        is_default: this.data.editInfo.isDefault,
        id: this.data.editInfo.id
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
      },
    })
  },
  // 新增开票信息
  addsaveData: function(e) {
    // 判断是值否为空
    var title = this.data.editInfo.company;
    var taxpayerId = this.data.editInfo.num;
    var company_address = this.data.editInfo.address;
    var company_bank = this.data.editInfo.bank;
    var company_count = this.data.editInfo.count;
    if (!title) {
      wx.showToast({
        title: '请输入发票抬头',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!taxpayerId) {
      wx.showToast({
        title: '请输入识别号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!company_address) {
      wx.showToast({
        title: '请输入公司地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!company_bank) {
      wx.showToast({
        title: '请输入公司开户行',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!company_count) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    var sort = this.data.editInfo.sort
    wx.request({
      url: `${app.baseUrl}/gzynew/add-invoice-info`,
      data: {
        openid: app.openid,
        title: title,
        taxpayerId: taxpayerId,
        types: 1,
        company_address: company_address,
        company_bank: company_bank,
        company_count: company_count,
        is_default: this.data.editInfo.isDefault ? this.data.editInfo.isDefault:'2',
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
      },
    })
  },
  // 双向绑定
  bindTaitou(e) {
    var editInfo = this.data.editInfo
    editInfo.company = e.detail.value
    this.setData({
      editInfo: editInfo
    })
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
      editInfo.isDefault = 2
    }
    this.setData({
      editInfo: editInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})