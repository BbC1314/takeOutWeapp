Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: Object,
    border: {
      type: Boolean,
      value: false
    }
  },
  data: {
    sign: true,
    show: false
  },
  methods: {
    shopDetail () {
      wx.navigateTo({
        url: '/pages/shopDetail/shopDetail'
      })
    },

    onmerchantSign () {
      this.setData({
        show: !this.data.show
      })
    },

    onClose() {
      this.setData({ show: false });
    },

    noselectSign (e) {
      let id = e.currentTarget.dataset.id
      if (id === '0') {
        this.setData({
          sign: true,
          show: false
        })
      }else{
        this.setData({
          sign: false,
          show: false
        })
      }
      this.triggerEvent('sign', id)
    }
  
  },
})