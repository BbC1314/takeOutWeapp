// pages/dailyOrder/dailyOrder.js
import {request, getRid, formatTime} from '../../utils/util'
import Tab from '../../components/tab/index'

Page({
  data: {
    activeIndex: 1,
    tabData: {
      selectedId: 1,
      list: [
        { id: 1, title: '完成(0)' },
        { id: 2, title: '取消(0)' }
      ]
    },
    scrollHeight: '150px',
    rid: '',
    achieveOrder: '',
    cancelOrder: '',
    dateId: 1,
    selectDate: '',
    newDate: '',
    pageIndex: 1,
    pageCount: 0
  },
  onLoad (options) {
    let date = formatTime(new Date()) 
    this.setData({
      rid: getRid(),
      selectDate: date,
      newDate: date
    })
    // this.getDispathOrderList()
    this.setTitle(date)
    this.getRiderDispathOrderList(date)
    this.getCanceledDispathOrderList(date)
  },

  getCanceledDispathOrderList (orderDate = '') {
    request('getCanceledDispathOrderList',{
      orderDate,
      rid: this.data.rid,
      service: 'gz.fyd.dispath',
      orderType: 'XSDC',
      pageSize: 100
    }).then(r => {
      console.log(r);
      this.setData({
        'tabData.list[1].title': `取消单(${r.data.count})`,
        cancelOrder: r.data.rs
      })
      this.loadTabs()
    })
  },

  getRiderDispathOrderList (orderDate = '') {
    request('getRiderDispathOrderList', {
      orderDate,
      pageSize: 100,
      rid: this.data.rid,
      service: 'gz.fyd.dispath',
      orderType: 'XSDC'
    }).then(r => {
      console.log(r);
      this.setData({
        'tabData.list[0].title': `完成单(${r.data.count})`,
        achieveOrder: r.data.rs
      })
      this.loadTabs()
    })
  },

  setTitle (date) {
    wx.setNavigationBarTitle({
      title: `${date}订单`
    })
  },

  setDataMethod (r, pageIndex) {
    if(pageIndex === 1){
      this.setData({
        achieveOrder: r.data.rs
      })
    }else{
      this.setData({
        achieveOrder: this.data.achieveOrder.concat(r.data.rs)
      })
    }
    this.setData({
      pageIndex: r.data.pageIndex,
      pageCount: r.data.pageCount,
      loading: false
    })
  },
  
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
    this.getRiderDispathOrderList(pageIndex)
  },

  loadTabs () {
    Tab._init('#tab', this.data.tabData)
    wx.getSystemInfo({
      success: res => {
        const query = wx.createSelectorQuery()
        query.select('#tab').boundingClientRect()
        query.exec(r => {
          this.setData({
            scrollHeight: res.windowHeight - r[0].height + 'px'
          })
        })
      }
    })
  },
  selectTab (e) {
    const data = e.detail
    this.setData({
      activeIndex: data.id
    })
  },
  activeChange (e) {
    const data = e.detail
    this.setData({
      'tabData.selectedId': Number(data.currentItemId)
    })
    Tab._init('#tab', this.data.tabData)

    // 刚开始取消单和完成单分开的时候,对标题的改变
    // if (data.current === 1) {
    //   this.setTitle('取消')
    // }else{
    //   this.setTitle('今日')
    // }
  },

  orderDetail (e) {
    let orderId = e.detail.orderid
    console.log(orderId);
    // this.setOrderDispathStatus(orderId)
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${orderId}&type=formerly`
    })
  },

  onClose() {
    this.setData({ show: false });
  },

  onselectDate (e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      dateId: id
    })
    if (id == 1) {
      this.setTitle(this.data.newDate)
      this.getRiderDispathOrderList(this.data.newDate)
      this.getCanceledDispathOrderList(this.data.newDate)
    }else if (id == 2) {
      this.setTitle('全部')
      this.getRiderDispathOrderList()
      this.getCanceledDispathOrderList()
    }else{
      this.setData({
        show: true
      })
    }
  },

  bindDateChange (e) {
    console.log(e.detail.value);
    let date = e.detail.value
    this.setTitle(date)
    this.getRiderDispathOrderList(date)
    this.getCanceledDispathOrderList(date)
    this.setData({
      selectDate: date,
      show: false
    })
  }
})


  // getDispathOrderList () {
  //   Promise.all([
  //       request('getWaitForDispathOrderList', {
  //       pageSize: 10,
  //       service: 'gz.fyd.dispath',
  //       orderType: 'XSDC',
  //       status: 1,
  //       rid: this.data.rid
  //     }),
  //     request('getRiderDispathOrderList', {
  //       service: 'gz.fyd.dispath',
  //       orderType: 'XSDC',
  //       rid: this.data.rid
  //     })
  //   ]).then( r => {
  //     this.setData({
  //       'tabData.list[0].title': `完成(${r[1].data.count})`,
  //       'tabData.list[1].title': `取消(${r[0].data.count})`,
  //       cancelOrder: r[0].data.rs,
  //       achieveOrder: r[1].data.rs
  //     })
  //     console.log(this.data.achieveOrder);
  //     console.log(this.data.cancelOrder);
  //   }).then( () => {
  //     this.loadTabs()
  //   })
  // },