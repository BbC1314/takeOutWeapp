import {formatTime} from '../../utils/util'
import Tab from '../../components/tab/index'

Page({
  data: {
    activeIndex:0,
    tabData: {
      scrollHeight:0,
      selectedId: 1,
      list: [
        { id: 1, title: '全部' },
        { id: 2, title: '进行中' },
        { id: 3, title: '已完成' },
        { id: 4, title: '消单/退单' },
        { id: 5, title: '索赔' }
      ]
    },
    newDate: ''
  },

  onLoad () {
    wx.getSystemInfo({
      success: res => {
        const query = wx.createSelectorQuery()
        query.select('#tab').boundingClientRect()
        query.exec(r => {
          this.setData({
            scrollHeight: res.windowHeight-r[0].height-45+'px'
          })
          console.log(r[0].height)
        })
      }
    })
    this.loadTabs()
    this.getNewDate()
  },

  loadTabs () {
    Tab._init('#tab', this.data.tabData)
  },

  getNewDate () {
    let date = new Date()
    console.log(date);
    this.setData({
      newDate: formatTime(date)
    })
  },

  selectTab (e) {
    console.log(e.detail);
    this.setData({
      activeIndex: e.detail.id-1
    })
  },

  setBarTitle (content) {
    wx.setNavigationBarTitle({
      title: `${content}订单`
    })
  },

  bindchange(e) {
    this.setData({
      'tabData.selectedId': e.detail.current + 1
    })
    Tab._init('#tab', this.data.tabData)
  },

  onselectDate (e) {
    let data = e.detail.date
    if (data === 'false') {
      console.log(1);
    }else {
      this.setBarTitle(data)
    }
    console.log(e.detail);
  }
})