Component({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {

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
    }
  }
})