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
    imageUrl: 'http://a.hiphotos.baidu.com/image/pic/item/5243fbf2b2119313187f7ac268380cd791238d80.jpg'
  },
  methods: {
    shopDetail (e) {
      this.triggerEvent('click', e.currentTarget.dataset)
    }
  }
})