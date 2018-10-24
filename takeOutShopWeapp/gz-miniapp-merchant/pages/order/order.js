import Tab from '../../components/tab/index'

Page({
  data: {
    activeIndex:0,
    tabData: {
      scrollHeight:0,
      selectedId: 1,
      list: [
        { id: 1, title: '新订单' },
        { id: 2, title: '配送异常' },
        { id: 3, title: '催单' },
        { id: 4, title: '取消单' },
        { id: 5, title: '退款' }
      ]
    },
  },

  onLoad () {
    wx.getSystemInfo({
      success: res => {
        const query = wx.createSelectorQuery()
        query.select('#tab').boundingClientRect()
        query.selectViewport().scrollOffset()
        console.log(query);
        query.exec(r => {
          this.setData({
            scrollHeight: res.windowHeight-r[0].height-45+'px'
          })
          console.log(r)
        })
      }
    })
    this.loadTabs()
  },

  loadTabs () {
    Tab._init('#tab', this.data.tabData)
  },

  selectTab (e) {
    console.log(e.detail);
    this.setData({
      activeIndex: e.detail.id-1
    })
  },

  bindchange(e) {
    this.setData({
      'tabData.selectedId': e.detail.current + 1
    })
    Tab._init('#tab', this.data.tabData)
  },

  onorderDetail (e) {
    console.log(e.detail);
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${e.detail.orderId}`
    })
  } 
})