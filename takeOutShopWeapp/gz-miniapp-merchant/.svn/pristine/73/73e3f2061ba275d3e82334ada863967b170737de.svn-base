import {request, getRid} from '../../../utils/util'

Page({
  data:{
    rid: '',
    evaluateList: [],
    RecommendCommentList: {},
    evaluateCount: 0,
    riderScore: {},
    loading: false,
    noMoreData: false,
    pageIndex: 1,
    pageCount: 0,
  },

  onLoad () {
    this.setData({
      rid: getRid()
    })
    this.getRiderCommentList()
    this.getRecommendCommentList()
    console.log(1, ...[2, 3, 4], 5);
  },

  getRecommendCommentList () {
    request('getRecommendCommentList', {
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then(r => {
      this.setData({
        RecommendCommentList: r.data
      })
      console.log(r.data);
    })
  },

  getRiderCommentList (pageIndex = 1) {
    request('getRiderCommentList', {
      pageIndex,
      pageSize: 10,
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      console.log(r.data);
      wx.hideNavigationBarLoading()
      this.setDataMethod(r, pageIndex)
    })
  },

  setDataMethod (r, pageIndex) {
    if(pageIndex === 1){
      this.setData({
        evaluateList: r.data.rs,
        evaluateCount: r.data.count,
        riderScore: r.data.riderScore[0]
      })
    }else{
      this.setData({
        evaluateList: this.data.evaluateList.concat(r.data.rs)
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
    console.log(pageIndex);
    this.getRiderCommentList(pageIndex)
  },

  billDetail () {
    wx.navigateTo({
      url: '/pages/mineChildren/billDetail/billDetail'
    })
  }
})