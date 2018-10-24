Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: Object
  },
  methods: {
    acticityDetail (e) {
      this.triggerEvent('click', e.currentTarget.dataset)
    }
  }
})