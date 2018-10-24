Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: Object
  },
  methods: {
    orderDetail (e) {
      this.triggerEvent('click', e.currentTarget.dataset)
    }
  }
})