import {request, getRid} from '../../../utils/util'

Page({
  data: {
    userInfo: {},
    rid: ''
  },

  onLoad () {
    this.setData({
      rid: getRid()
    })
    this.getRiderDetail()
  },

  getRiderDetail () {
    request('getRiderDetail', {
      rid: this.data.rid,
      service: 'gz.fyd.dispath'
    }).then( r => {
      console.log(r.data);
      this.setData({
        userInfo: r.data
      })
    })
  },
})