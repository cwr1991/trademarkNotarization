// pages/address/editAddress/editaddress.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editInfo: {},
    isaffirm: false,
    islength: false,
    region: ["请选择省市区"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    console.log(option)
    if (option.lengths == 0) {
      this.setData({
        islength: true
      })
    }
    if (option.affirm == 1) {
      this.setData({
        isaffirm: true
      })
    } else {
      if (option.data != "null") {
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
    }

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
      url: `${app.baseUrl}/gzynew/delete-address`,
      data: {
        openid: app.openid,
        sort: sort
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
      },
    })
  },
  // 编辑保存地址数据
  editsaveData: function(e) {
    // 判断是值否为空
    var sname= this.data.editInfo.username
    var stel = this.data.editInfo.tel
    var scity = this.data.region.toString().replace(",", " ").replace(",", " ")
    var address = this.data.editInfo.address
    if(!address){
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return; 
    }
    if (!sname) {
      wx.showToast({
        title: '请输入收件人',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!stel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!scity) {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    console.log("editbaocun", e)

    var sort = this.data.editInfo.sort
    wx.request({
      url: `${app.baseUrl}/gzynew/edit-address`,
      data: {
        openid: app.openid,
        sort: sort,
        sname: sname,
        stel: stel,
        check: this.data.editInfo.isDefault,
        scity: scity,
        address: address,
      },
      success(res) {
        wx.navigateBack({
          delta:1
        })
      },
    })
  },
  // 新增保存地址数据
  addsaveData: function(e) {
    // 判断值是否为空
    var sname = this.data.editInfo.username
    var stel = this.data.editInfo.tel
    var scity = this.data.region.toString().replace(",", " ").replace(",", " ")
    var address = this.data.editInfo.address
    if (!address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!sname) {
      wx.showToast({
        title: '请输入收件人',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!stel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!scity) {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    var ischeck = this.data.editInfo.isDefault;
    if (this.data.islength) {
      ischeck = 1;
      console.log(ischeck);
    }
    console.log("addbaocun", e);
    var that = this;
    var sort = this.data.editInfo.sort
    wx.request({
      url: `${app.baseUrl}/gzynew/add-address`,
      data: {
        openid: app.openid,
        sort: sort,
        sname: sname,
        stel: stel,
        check: ischeck,
        scity: scity,
        address: address,
      },
      success(res) {
        if (that.data.isaffirm) {
          wx.navigateBack({
            delta: 1
          })
          return false;
        }
        wx.navigateBack({
          delta:1
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