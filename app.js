//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this

    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.getStorage({
      
      key: '_id',
      success: function(res) {
        console.log(res)
        if(res.data != ''){
          that.globalData._id = res.data
        }
      },
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log('bbb')
              console.log(this.globalData.userInfo)
            }
          })
        }
        
        else{
          wx.navigateTo({
            url: '/pages/login/login',
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(userInfo)
            }
          })
        }
      }
    })
    wx.checkSession({
      success: res => {
        if (that.globalData._id == '') {
          login(that.globalData._id, that)
        }
      },
      fail: function () {
        login(that.globalData._id, that)
      }

    })
  },
  
  globalData: {
    userInfo: null,
    _id : '',
  }
 


})

function login(_id,that){
  console.log('aaa')
  wx.login({
    success: res=> {
      wx.request({
        url: 'http://localhost:8080/WeChat/Login',
        
        data:{
          _id : _id,
          js_code: res.code
        },
        success: ret=>{
          if(ret.data._id != null){
            that.globalData._id = ret.data._id
            wx.setStorage({
              key: '_id',
              data: ret.data._id,
            })
            console.log(res)
          }
        }
      })
    }
  })
}