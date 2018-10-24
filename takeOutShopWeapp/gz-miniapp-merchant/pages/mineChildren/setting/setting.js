import { request, getRid } from '../../../utils/util'

const app = getApp()

Page({
  data: {
    rid: '',
    actionShow: false,
    actions: [
      {
        name: '退出登录'
      }
    ]
  },
  onLoad () {
    this.setData({
      rid: getRid()
    })
  },
  
  bindAboutUs () {
    wx.navigateTo({
      url :'../aboutUs/aboutUs'
    })
  },

  onUpgradeVersion () {
    wx.navigateTo({
      url: '../upgradeVersion/upgradeVersion'
    })
  },

  logout () {
    this.setData({
      actionShow: true
    })
  },
  onSelect (e) {
    wx.clearStorageSync()
    app.globalData.rid = ''
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  onClose () {
    this.setData({
      actionShow: false
    })
  },
  onchangeuser(){
    wx.navigateTo({
      url:"/pages/login/login"
    })
  }
})