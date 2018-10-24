import {navigateToChat} from '../../utils/util'

Page({
  data: {
    navList: [
      // {title: '我的活动', imgUrl: '../../assets/images/setting/reback.png'},
      {title: '在线客服', imgUrl: '../../assets/images/setting/cs.png'},
      {title: '呼叫客户', imgUrl: '../../assets/images/setting/mac.png'},
      {title: '市场经理', imgUrl: '../../assets/images/setting/manager.png'},
    ]
  },

  onLoad () {
    console.log(encodeURI('abc'));
  },

  callphone (phone){
    wx.makePhoneCall({
      phoneNumber: phone,
      success: (r => {
        console.log(r);
      }),
      fail: (r => {
        console.log();
      })
    })
  },

  onmyWallet () {
    wx.navigateTo({
      url: '../mineChildren/myWallet/myWallet'
    })
  },

  ondailyOrder () {
    wx.navigateTo({
      url: '../dailyOrder/dailyOrder'
    })
  },

  onskipNav (e) {
    let index = e.currentTarget.dataset.index
    if (index === -1) {
     
    }else if(index === 0){
      navigateToChat('1076')
    }else if(index === 1){
      this.callphone('13137265010')
    }else{
      this.callphone('110')
    }
  },

  onoperationLog () {
    wx.navigateTo({
      url: '../mineChildren/operationLog/operationLog'
    })
  },

  onmyData () {
    wx.navigateTo({
      url: '../mineChildren/myData/myData'
    })
  }
  
})