Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [],
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    wx.request({
      url: 'http://localhost:8080/WeChat/ShowCards',
      data:{
        _id:app.globalData._id
      },
      
      success: res =>{
        
        that.setData({
          cards: res.data,
          loading: false

        })
        console.log(res.data)
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
    
  },

  cardsInfo: function (event) {
    var id = event.currentTarget.dataset.id
    // console.log(event.currentTarget)
    wx.navigateTo({
      url: '/pages/item/item?id=' + id,
    })
  }
})