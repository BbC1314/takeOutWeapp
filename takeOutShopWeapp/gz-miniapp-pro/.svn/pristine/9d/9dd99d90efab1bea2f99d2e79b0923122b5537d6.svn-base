//index.js
import {request, getRid} from '../../utils/util'
import Tab from '../../components/tab/index'

var app = getApp()

Page({
  data: {
    rid: '',
    activeIndex:0,
    tabData: {
      scrollHeight:0,
      selectedId: 1,
      list: [
        { id: 1, title: '待抢单(0) ' },
        { id: 2, title: '待取货(0)' },
        { id: 3, title: '待送达(0)' }
      ]
    },
    show: false,
    shows:false,
    popupData:[
      {
        title: '运单选择' , content:[{content:'外卖单' , id: 0 ,},{content:'帮买单' , id: 0},{content:'帮送单' , id: 0},{content:'淘宝单' , id: 0}] 
      },
      {
        title: '运单排序' , content:[{content:'取货距离近到远' , id: 0},{content:'配送距离近到远' , id: 0},{content:'运单金额高到低' , id: 0},{content:'运单星级高到低' , id: 0}] 
      },
      {
        title: '其他' , content:[{content:'新单置顶显示' , id: 0}] 
      }
    ],
    popupIndex:0,
    WaitForOrder: [],
    getOrder: [],
    sendOrder: [],
    loading: false,
    noMoreData: false,
    pageIndex: 1,
    pageCount: 0,
    confrimId: 0
  },

  onLoad: function() {
    this.setData({
      rid: getRid()
    })
    wx.getSystemInfo({
      success: res => {
        const query = wx.createSelectorQuery()
        query.select('#tab').boundingClientRect()
        query.exec(r => {
          this.setData({
            scrollHeight: res.windowHeight-r[0].height+'px'
          })
          console.log(r[0].height)
        })
      }
    })
    console.log(app.globalData.userInfo);
  },

  onShow () {
    this.getWaitForDispathOrderList()
    this.getDispathOrderList()
  },

  getDispathOrderList () {
    Promise.all([
        request('getWaitForDispathOrderList', {
        service: 'gz.fyd.dispath',
        orderType: 'XSDC',
        status: 2,
        rid: this.data.rid
      }),
      request('getWaitForDispathOrderList', {
        service: 'gz.fyd.dispath',
        orderType: 'XSDC',
        status: 3,
        rid: this.data.rid
      })
    ]).then( r => {
      let data = r[1].data.rs
      for (let i in data){
        data[i].YN=true
      }
      this.setData({
        'tabData.list[1].title': `待取货(${r[0].data.count})`,
        'tabData.list[2].title': `待送达(${r[1].data.count})`,
        getOrder: r[0].data.rs,
        sendOrder: r[1].data.rs
      })
      console.log(this.data.sendOrder);
      console.log(this.data.getOrder);
    }).then( () => {
      this.loadTabs()
    })
  },

  getWaitForDispathOrderList (pageIndex = 1) {
    request('getWaitForDispathOrderList', {
      pageIndex,
      pageSize: 10,
      service: 'gz.fyd.dispath',
      orderType: 'XSDC',
      status: 1,
      rid: this.data.rid
    }).then( r => {
      console.log(r.data.count);
      this.setData({
        'tabData.list[0].title': `带抢单(${r.data.count})`
      })
      this.setDataMethod(r, pageIndex)
      wx.hideNavigationBarLoading()
    }).then( () => {
      this.loadTabs()
    })
  },

  setDataMethod (r, pageIndex) {
    if(pageIndex === 1){
      this.setData({
        WaitForOrder: r.data.rs
      })
    }else{
      this.setData({
        WaitForOrder: this.data.WaitForOrder.concat(r.data.rs)
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
    this.getWaitForDispathOrderList(pageIndex)
  },

  setOrderDispathStatus (orderId, num) {
    request('setOrderDispathStatus', {
      orderId,
      service: 'gz.fyd.dispath',
      status: num,
      orderType: 'XSDC',
      rid: this.data.rid
    }).then( () => {
      wx.showToast({
        title: '操作成功',
        icon: 'success'
      })
      setTimeout( () => {
        this.getWaitForDispathOrderList()
        this.getDispathOrderList()
      },1500)
    })
  },

  onPullDownRefresh () {
    setTimeout(() => {
      wx.showToast({
        title: '下拉刷新',
        icon: 'none'
      })
      wx.stopPullDownRefresh()
    }, 1000)
  },

  ondelivery(e){
    console.log(e);
    this.setData({
      show:true,
      confrimId: e.currentTarget.dataset.orderid
    })
    console.log(e.currentTarget.dataset.orderid);
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

  oncontend(e){
    let orderId = e.currentTarget.dataset.orderid
    this.setOrderDispathStatus(orderId, 2)
  },

  ongetOrder (e){
    let orderId = e.currentTarget.dataset.orderid
    this.setOrderDispathStatus(orderId, 3)
  },

  onorderDetail(){
    wx.navigateTo({
      url:'/pages/orderDetail/orderDetail'
    })
  },

  onpopupFiltrate(){
    this.setData({
      shows: true
    })
  },

  onClose() {
    this.setData({
       shows: false 
      });
  },

  onpopupConfirm(){
    this.setData({
      shows: false
    })
  },

  onpopupReset(){
    let arr = this.data.popupData
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].content.length; j++) {
        arr[i].content[j].id=0
      }
    }
    this.setData({
      popupData: arr
    })
  },

  onselectDetail(e){
    let a = e.currentTarget.dataset.id
    // console.log(a.charAt(0));
    let arr = this.data.popupData
    if(a.charAt(0) === '1'){
      if(arr[1].content[a.charAt(1)].id === 0){
        for (let i = 0; i < arr[1].content.length; i++) {
          arr[1].content[i].id=0
        }
        arr[a.charAt(0)].content[a.charAt(1)].id=1
        this.setData({
          popupData: arr
        })
      }else{
        arr[a.charAt(0)].content[a.charAt(1)].id=0
        this.setData({
          popupData: arr
        })
      }
    }else{
      if(arr[a.charAt(0)].content[a.charAt(1)].id === 0){
        arr[a.charAt(0)].content[a.charAt(1)].id=1
        this.setData({
          popupData: arr
        })
      }else{
        arr[a.charAt(0)].content[a.charAt(1)].id=0
        this.setData({
          popupData: arr
        })
      }
    }
  },

  waitOrderDetail (e) {
    let orderId = e.detail.id
    console.log(orderId);
    // this.setOrderDispathStatus(orderId)
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${orderId}`
    })
  },

  onconfirm () {
    this.setOrderDispathStatus(this.data.confrimId, 4)
  },

  oncallPhone () {
    wx.makePhoneCall({
      phoneNumber: '123123',
      success: (r)=>{
        console.log(r);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }

  // 测试方法代码0.0
  // text () {
  //   let arr = [1, 2, 3, 4]
  //   arr.map( (a, j , b) => {
  //     return a = a + j + b
  //   })
  // }
})
