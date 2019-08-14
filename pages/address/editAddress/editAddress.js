// pages/address/editAddress/editaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editInfo: {},
    region: ["请选择省市区"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    if (option.data!="null") {
      console.log(option)

      option.isDefault = parseInt(option.isDefault);
      option.sort = parseInt(option.sort) + 1

      var scity = option.scity;
      var newscity = scity.split(" ");
      this.setData({
        editInfo: option,
        region: newscity
      })
    }
    console.log(this.data)

    // if传入的isEdit是true
    if (this.data.editInfo.isEdit) {
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '添加收货地址'
      })
    }
  },
  // 地区选择器
  changeRegion: function(e) {
    this.setData({
      region: e.detail.value
    })
    console.log(this.data.region)
  },



  //删除地址数据
  deleteData: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此收货地址吗',
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
    var sort = this.data.editInfo.sort
    console.log(this.data.editInfo)
    wx.request({
      url: 'https://wwxs.86sb.com/gzynew/delete-address',
      data: {
        openid: 'oKjx85YYAvzlPvGFU9ao4gC9uX3c',
        sort: sort
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/address/address'
        })
      },
    })
  },
  // 编辑保存地址数据
  editsaveData: function(e) {
    console.log("editbaocun", e)
    var sort = this.data.editInfo.sort
    wx.request({
      url: 'https://wwxs.86sb.com/gzynew/edit-address',
      data: {
        openid: 'oKjx85YYAvzlPvGFU9ao4gC9uX3c',
        sort: sort,
        sname: this.data.editInfo.username,
        stel: this.data.editInfo.tel,
        check: this.data.editInfo.isDefault,
        scity: this.data.region.toString().replace(",", " ").replace(",", " "),
        address: this.data.editInfo.address,
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/address/address'
        })
      },
    })
  },
  // 新增保存地址数据
  addsaveData: function(e) {
    console.log("addbaocun", e)
    var sort = this.data.editInfo.sort
    wx.request({
      url: 'https://wwxs.86sb.com/gzynew/add-address',
      data: {
        openid: 'oKjx85YYAvzlPvGFU9ao4gC9uX3c',
        sort: sort,
        sname: this.data.editInfo.username,
        stel: this.data.editInfo.tel,
        check: this.data.editInfo.isDefault,
        scity: this.data.region.toString().replace(",", " ").replace(",", " "),
        address: this.data.editInfo.address,
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/address/address'
        })
      },
    })
  },

  // 编辑信息改变发送到地址列表页
  bindUsername(e) {
    console.log(e)
    var editInfo = this.data.editInfo
    editInfo.username = e.detail.value
    this.setData({
      editInfo: editInfo
    })
    console.log(this.data)
  },
  bindTel(e) {
    var editInfo = this.data.editInfo
    editInfo.tel = e.detail.value
    this.setData({
      editInfo: editInfo
    })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindAddress(e) {
    var editInfo = this.data.editInfo
    editInfo.address = e.detail.value
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


  test: function(e) {
    wx.chooseImage({
      success(res) {
        let tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {

          console.log(res.tempFilePaths)
          wx.uploadFile({
            url: 'https://wwxs.86sb.com/gzynew/upload-img-gz', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'pic1',
            formData: {
              orderId: 'SB146466316313',
              evidName: '身份证',
              evidType: 5
            },
            success(res) {
              console.log(res)

            },
            fail: function(res) {
              console.log(res.data)
            }
          })
        }

      }
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