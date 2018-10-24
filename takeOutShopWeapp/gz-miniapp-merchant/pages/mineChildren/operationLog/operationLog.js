import Tab from '../../../components/tab/index'

Page({
  data: {
    tabData: {
      scrollHeight:0,
      selectedId: 1,
      list: [
        { id: 1, title: '提醒的日志' },
        { id: 2, title: '全部日志' },
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
})