import {request, getRid} from '../../../utils/util'

Page({
  data:{
    rid: '',
    cash: {},
    withdrawOrderList: []
  },

  onLoad () {
    this.setData({
      rid: getRid()
    })
  },

  onShow () {
    this.getRiderWallet()
    this.getWithdrawOrderList()
  },

  getRiderWallet () {
    request('getRiderWallet', {
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      this.setData({
        cash: r.data
      })
      console.log(r.data);
    })
  },

  getWithdrawOrderList () {
    request('getWithdrawOrderList',{
      rid: this.data.rid,
      service: 'gz.fyd.dispath',
      pageSize: 3
    }).then( r => {
      console.log(r.data.rs);
      this.setData({
        withdrawOrderList: r.data.rs
      })
    })
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
  },

  ondrawMoney () {
    wx.navigateTo({
      url: '/pages/mineChildren/drawMoney/drawMoney'
    })
  }
})