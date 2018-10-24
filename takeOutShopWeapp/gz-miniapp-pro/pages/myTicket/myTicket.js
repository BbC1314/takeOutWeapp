// pages/dailyOrder/dailyOrder.js
import Tab from '../../components/tab/index'

Page({
  data: {
    activeIndex: 1,
    tabData: {
      selectedId: 1,
      list: [
        { id: 1, title: '全部' },
        { id: 2, title: '可申诉' }
      ]
    },
    scrollHeight: '150px',
    show: false,
    popData: {
      dailyList: [
        {id: 0 , title: '今天'},
        {id: 1 , title: '最近3天'},
        {id: 2 , title: '最近7天'},
        {id: 3 , title: '最近30天'},
      ],
      dailyId: 0,
      allList: [
        {id: 0 , title: '全部类型'},
        {id: 1 , title: '欺骗处罚'},
        {id: 2 , title: '投诉处罚'},
        {id: 3 , title: '取消处罚'},
        {id: 3 , title: '超时处罚'},
        {id: 3 , title: '商户索赔'},
        {id: 3 , title: 'QC监管'},
        {id: 3 , title: '拒绝高价任务单'},
      ],
      allId: 0
    },
    selectId: 0,
    selectArr: []
  },
  onLoad (options) {
    this.loadTabs()
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
  },

  onClose() {
    this.setData({ show: false });
  },

  onconfirm (e) {
    let id = e.currentTarget.dataset.id
    let arr = []
    let data = this.data.popData
    console.log(id);
    if (id == 1) {
      arr = data.dailyList
    }else{
      arr = data.allList
    }
    this.setData({
      show: true,
      selectArr: arr,
      selectId: id
    })
  },

  onselectItem (e) {
    let id = e.currentTarget.dataset.index
    console.log(e);
    if (this.data.selectId === '1') {
      this.setData({
        'popData.dailyId': id
      })
    }else{
      this.setData({
        'popData.allId': id
      })
    }
    this.setData({
      show: false
    })
  }

})