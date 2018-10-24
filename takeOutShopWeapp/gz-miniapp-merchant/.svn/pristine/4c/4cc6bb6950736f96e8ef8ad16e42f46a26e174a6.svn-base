import {request, getRid} from '../../../utils/util'

Page({
  data: {
    rid: '',
    card: {},
    id: 0,
    title: '增加银行卡提现账户'
  },

  onLoad (query) {
    if (query.id) {
      console.log(query.id);
      this.setData({
        id: query.id,
        title: '编辑银行卡提现账户'
      })
      wx.setNavigationBarTitle({
        title: '编辑账户' 
      })
      this.getRiderBankCardDetail(query.id)
    }
    this.setData({
      rid: getRid()
    })
  },

  onShow () {
  },

  createRiderBankCard () {
    request('createRiderBankCard', {
      rid: this.data.rid,
      service: 'gz.fyd.dispath',
      bankCardNo: this.data.card.bankCardNo,
      cardholder: this.data.card.cardholder,
      bankName: this.data.card.bankName,
      bankDeposit: this.data.card.bankDeposit
    }).then( r => {
      console.log(r);
      let pages = getCurrentPages();             //  获取页面栈
    // let currPage = pages[pages.length - 1];    当前页面
      let prevPage = pages[pages.length - 2];    // 上一个页面
      prevPage.setData({
        editToNew: true                      
      })
      wx.showToast({
        title: '操作成功',
        icon:'success'
      })
      setTimeout( () => {
        wx.navigateBack({
          delta: 1
        })
      },1500)
    })
  },

  updateRiderBankCard () {
    request('updateRiderBankCard', {
      id: this.data.id,
      rid: this.data.rid,
      service: 'gz.fyd.dispath',
      bankCardNo: this.data.card.bankCardNo,
      cardholder: this.data.card.cardholder,
      bankName: this.data.card.bankName,
      bankDeposit: this.data.card.bankDeposit
    }).then( r => {
      console.log(r);
      wx.showToast({
        title: '操作成功',
        icon:'success'
      })
      setTimeout( () => {
        wx.navigateBack({
          delta: 1
        })
      },1500)
   })
  },

  getRiderBankCardDetail (id) {
    request('getRiderBankCardDetail', {
      id,
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      console.log(r);
      this.setData({
        card: r.data
      })
      console.log(this.data.card);
    })
  },

  oncomfrim () {
    if (this.data.id > 0) {
      this.updateRiderBankCard()
    }else{
      this.createRiderBankCard()
    }
  },

  oncancel () {
    wx.navigateBack({
      delta: 1
    })
  },

  onChangeNum (e) {
    console.log(e.detail);
    this.setData({
      'card.bankCardNo': e.detail
    })
  },

  onChangeName (e) {
    console.log(e.detail);
    this.setData({
      'card.cardholder': e.detail
    })
  },

  onChangeType (e) {
    console.log(e.detail);
    this.setData({
      'card.bankName': e.detail
    })
  },

  onChangeArea (e) {
    console.log(e.detail);
    this.setData({
      'card.bankDeposit': e.detail
    })
    console.log(this.data.card);
  },
 
})