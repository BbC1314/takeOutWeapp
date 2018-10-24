import {request, getRid, navigateToChat} from '../../utils/util'

Page({
  data: {
    rid: '',
    addressType:'success',
    windowHeight:0,
    orderId: '',
    orderDetail: {},
    btnContent: '',
    orderStatus: 0,
    show: false,
    // 拥有判断弹出框显示的内容及按钮功能
    dialogTitle: '',
    // 由今日订单进入此页面时
    btnShow: true
  },

  onLoad(query){
    // var stateTitleId=getApp().orderDetail1
    // console.log(stateTitleId);
    // this.setData({
    //   type:query.type
    // })
    console.log(query);
    if (query.type == 'formerly') {
      this.setData({
        btnShow: false
      })
    }
    this.setData({
      orderId: query.orderId,
      rid: getRid()
    })
    console.log(this.data.orderId);
    wx.getSystemInfo({
      success: r => {
        this.setData({
          windowHeight: r.windowHeight- 60 +'px'
        })
      },
      fail: () => {
        console.log(未获取到设备信息)
      }
    })
    this.getDispathOrderDetail()
  },

  getDispathOrderDetail () {
    request('getDispathOrderDetail', {
      orderId: this.data.orderId,
      orderType: 'XSDC',
      service: 'gz.fyd.dispath',
      rid: this.data.rid
    }).then( r => {
      console.log(r.data);
      let status = r.data.order.logisticsStatus
      let btnContent = ''
      let dialogTitle = ''
      if (status == 1) {
        btnContent = '抢单'
      }else if (status == 2) {
        btnContent = '上报到店',
        dialogTitle = '提示'
      }else{
        btnContent = '确认送达',
        dialogTitle = '请输入小票订单后四位'
      }
      this.setData({
        dialogTitle,
        btnContent,
        orderStatus: status,
        orderDetail: r.data
      })
    })
  },

  setOrderDispathStatus (orderId, num) {
    request('setOrderDispathStatus', {
      orderId,
      service: 'gz.fyd.dispath',
      status: num,
      orderType: 'XSDC',
      rid: this.data.rid
    }).then(() => {
      wx.showToast({
        title: '操作成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      },1500)
    })
  },

  onconfirm (e) {
    console.log(this.data.orderStatus+1);
    let orderId = this.data.orderId
    let orderStatus = this.data.orderStatus
    if (orderStatus < 3) {
      this.setOrderDispathStatus(orderId, orderStatus+1)
    }else{
      this.setData({
        show: true
      })
    }
  },

  onClose() {
    this.setData({
      shows: false 
    })
  },

  oncancelOrder (e) {
    this.setData({
      show: true
    })
  },

  onpopConfrim () {
    let orderId = this.data.orderId
    let orderStatus = this.data.orderStatus
    if (orderStatus === 3) {
      this.setOrderDispathStatus(orderId, orderStatus+1)
    }else{
      this.setOrderDispathStatus(orderId, 5)
    }
  },

  oncallPhone () {
    wx.makePhoneCall({
      phoneNumber: '123456789',
      success: (r)=>{
        console.log(r);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  onskipWebview () {
    navigateToChat('1076')
  }
})
