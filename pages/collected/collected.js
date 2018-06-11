// pages/collected/collected.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    wx.request({
      url: 'http://localhost:8080/WeChat/GetCollected',
      data: {
        _id: app.globalData._id
      },
      success: res => {

        that.setData({
          cards: res.data,
          loading: false

        })
        console.log(this.data.cards.length == 0)
        if(this.data.cards.length == 0){
          wx.showModal({
            title: '卡片集',
            content: '您还没有收集到任何卡片！',
            success: res=>{
              wx.navigateBack({
                delta: 2
              })
              
            }
          })
          

        }
        console.log(app.globalData._id)

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