import {request, getRid} from '../../../utils/util'

Page({
  data: {
    rid: '',
    withdrawOrderList: [],
    loading: false,
    noMoreData: false,
    pageIndex: 1,
    pageCount: 0,
  },

  onLoad () {
    this.setData({
      rid: getRid()
    })
    this.getWithdrawOrderList()
  },

  getWithdrawOrderList (pageIndex = 1) {
    request('getWithdrawOrderList',{
      pageIndex,
      pageSize: 10,
      rid: this.data.rid,
      service: 'gz.fyd.dispath',
      // orderDate: ''
    }).then( r => {
      console.log(r.data);
      // this.setData({
      //   withdrawOrderList: r.data.rs
      // })
      this.setDataMethod(r, pageIndex)
      wx.hideNavigationBarLoading()
    })
  },

  setDataMethod (r, pageIndex) {
    if(pageIndex === 1){
      this.setData({
        withdrawOrderList: r.data.rs
      })
    }else{
      this.setData({
        withdrawOrderList: this.data.withdrawOrderList.concat(r.data.rs)
      })
    }
    this.setData({
      pageIndex: r.data.pageIndex,
      pageCount: r.data.pageCount,
      loading: false
    })
  } ,
  
  onReachBottom () {
    let pageIndex = this.data.pageIndex
    if(pageIndex >= this.data.pageCount){
      this.setData({
        noMoreData: true
      })
      return
    }
    pageIndex++
    this.setData({
      loading: true
    })
    wx.showNavigationBarLoading()
    this.getWithdrawOrderList(pageIndex)
  },

  onselectDetail (e) {
    let orderId = e.currentTarget.dataset.orderid
    console.log(orderId);
  },

  ondateSelect (e) {
    console.log(e.detail.date);
  }
})