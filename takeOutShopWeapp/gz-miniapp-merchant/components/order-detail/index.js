Component({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {
    tagList: [
      { classIcon: 'tag-tableware', icon: '包', icontext: '餐盒', price: '2' },
      { classIcon: 'tag-full', icon: '减', icontext: '红包', price: '-5.3' },
      { classIcon: 'tag-te', icon: '首', icontext: '减满优惠', price: '-1' },
      {
        classIcon: 'tag-first',
        icon: '特',
        icontext: '在线支付立减优惠',
        price: '+10'
      }
    ]
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