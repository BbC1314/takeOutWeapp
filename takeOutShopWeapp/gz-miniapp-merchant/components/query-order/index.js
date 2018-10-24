Component({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {
    shows:[false, false, false]
  },
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onorderDetail (e) {
      this.triggerEvent('click', {
        orderId: e.currentTarget.dataset.orderid
      })
    },

    onshow (e) {
      let index = e.currentTarget.dataset.index
      let shows = this.data.shows
      shows[index] = !shows[index]
      this.setData({
        shows
      })
    },

    callPhone (e) {
      let phone = e.currentTarget.dataset.phone
      console.log(phone);
      wx.makePhoneCall({
        phoneNumber: phone,
        complete: (r => {
          console.log(r);
        })
      })
    }
  }
})