Page({
  data: {
    markers: [{
      iconPath: "../../assets/images/order/tele.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 30,
      height: 30
    }
  ],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../assets/images/order/tele.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  onLoad () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res => {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude);
        console.log(longitude);
        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   scale: 28
        // })
        this.setData({
          'markers[0].latitude': latitude,
          'markers[0].longitude': longitude
        })
      })
    })
    this.mapCtx = wx.createMapContext('map')
    // this.getCenterLocation()
  },

  getCenterLocation () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
})