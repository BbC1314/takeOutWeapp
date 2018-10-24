import {request, getRid} from '../../../utils/util'

Page({
  data: {
    rid: '',
    cardCount: 0,
    id: 0,
    cardDetail: {},
    editToNew: false,
    cashBalance: 0,
    drawMoeny: '',
  },

  onLoad () {
    this.setData({
      rid: getRid()
    })
    this.getRiderBankCardList()
    this.getRiderWallet()
  },

  onShow () {
    let id = this.data.id
    if (id > 0){
      this.getRiderBankCardDetail(this.data.id)
    }
    if (this.data.editToNew) {
      this.getRiderBankCardList()
    }
  },

  getRiderWallet () {
    request('getRiderWallet', {
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      this.setData({
        cashBalance: r.data.cashBalance
      })
      console.log(r.data);
    })
  },

  getRiderBankCardList () {
    request('getRiderBankCardList', {
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      let count = r.data.count
      console.log(r.data.count);
      this.setData({
        cardCount: count,
      })
      if (count > 0) {
        this.setData({
          id: r.data.rs[0].id
        })
        console.log(this.data.cardCount);
        if ( count > 0) {
          this.getRiderBankCardDetail(this.data.id)
        }
      }
    })
  },

  getRiderBankCardDetail (id) {
    console.log(this.data.id);
    request('getRiderBankCardDetail', {
      id:this.data.id,
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      this.setData({
        cardDetail: r.data
      })
      console.log(r.data);
    })
  },

  submitWithdrawOrder () {
    console.log(this.data.cardDetail);
    request('submitWithdrawOrder',{
      uid: this.data.rid,
      service: 'gz.fyd.dispath',
      amount: this.data.drawMoeny,
      cardholder: this.data.cardDetail.cardholder,
      bankcardNumber: this.data.cardDetail.bankCardNo,
      bankName: this.data.cardDetail.bankName
    }).then( r => {
      console.log(r);
      wx.showToast({
        title: '提现已申请',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          dalte: 1
        })
      },1500)
    }).catch( r =>{
      console.log(r);
    })
  },

  ondrawAccount () {
    this.setData({
      editToNew: false
    })
    wx.navigateTo({
      url: '/pages/mineChildren/drawAccount/drawAccount'
    })
  },

  oneditAccount () {
    wx.navigateTo({
      url: '/pages/mineChildren/editAccount/editAccount'
    })
  },
  
  onallDrawBalance () {
    this.setData({
      drawMoeny: this.data.cashBalance
    })
  },

  onDrawBalanceChange (e) {
    let num = e.detail
    this.setData({
      drawMoeny: num
    })
  },

  onconfrimDraw () {
    if (this.data.num > this.data.cashBalance) {
      wx.showToast({
        title: '余额不足'
      })
    }else{
      if (this.data.drawMoeny === '') {
        wx.showToast({
          title: '提现金额不能为空',
          icon: 'none'
        })
      }else{
        this.submitWithdrawOrder(this.data.drawMoeny)
      }
    }
    // console.log(this.data.drawMoeny === '');
  }
})