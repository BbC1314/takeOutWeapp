Page({
  data:{

  },

  billDetail () {
    wx.navigateTo({
      url: '/pages/mineChildren/billDetail/billDetail'
    })
  },

  onpledge () {
    wx.navigateTo({
      url: '/pages/mineChildren/pledge/pledge'
    })
  }
})