Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [],
    markers: [],
    scale: 18,
    latitude: 0,
    longitude: 0,
    controls: "",
    cardid: '',
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    var that = this

    wx.getLocation({
      type: "gcj02", //坐标格式
      success: (res) => {
        this.setData({
          latitude: res.latitude, //获取当前经度
          longitude: res.longitude //获取当前纬度
        })
        console.log(res.latitude);
        console.log(res.longitude);
      },
    })
    
    
    wx.getSystemInfo({ //获取用户设备信息并添加相应组件
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: '../../images/loc(2).png',
            position: {
              left: res.windowWidth - 55,
              top: 50,
              width: 30,
              height: 30,
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: '../../images/search.png',
            position: {
              left: res.windowWidth / 2 - 40,
              top: res.windowHeight - 100,
              width: 80,
              height: 80
            },
            clickable: true

          }]
        })
      },
    })
    wx.request({
      url: 'http://localhost:8080/WeChat/GetMarkers',
      data: {
      },
      success: res => {
        this.setData({
          markers: res.data,
        })
        console.log(res.data)

      }
      

    });
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

    this.mapCtx = wx.createMapContext("locmap"),
      this.movetoPosition()


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

  },

  movetoPosition: function () {
    //将将画布移至用户中心
    this.mapCtx.moveToLocation();
  },

  bindcontroltap: function (e) {
    var app = getApp()
    var longitude = this.data.longitude
    var latitude = this.data.latitude
    var cardid = this.cardid
    console.log(longitude)
    console.log(latitude)
    switch (e.controlId) {
      case 1: this.movetoPosition();
        break;
      case 2:
        wx.showLoading({
          title: '正在获取',
          mask: true //模糊
        })
        wx.request({
          url: 'http://localhost:8080/WeChat/GetCards',
          // url: 'http://localhost:8080/WeChat/GetCards',
          data: {
            _id: app.globalData._id,
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          success: res => {
            wx.hideLoading()
            if (res.data.length != 0) {
              this.setData({
                cardid: res.data.id
              })
              console.log(res.data.id)
              wx.navigateTo({
                url: '../item/item?id=' + res.data.id
              })

            }
            else {
              wx.showModal({
                title: '请更换位置',
                content: '当前位置没有任何东西！！',
                success: res => {
                  wx.navigateBack({
                    delta: 1
                  })

                }
              })
            }
          }

        })
    }
  },


  hideModal: function () {

    this.setData({

      showModal: false

    });

  },
 





})

