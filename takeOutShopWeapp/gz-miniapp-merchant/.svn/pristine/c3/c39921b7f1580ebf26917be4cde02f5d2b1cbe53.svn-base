Page({
  data: {
    list:[
      { title: '取消订单', id: 0, url: 'http://sh-oss.sanjia.site/aa8f09268e0bb49831df5d1e8ba7e1b3.jpg'},
      { title: '累计取消规则', id: 1, url: 'http://sh-oss.sanjia.site/9b1e813e56e23f974582e5787ca582db.jpg'},
      { title: '超市规则', id: 2, url: ''},
      { title: '预订单考核', id: 3, url: ''},
      { title: '配送违规处罚', id: 4, url: '' },
      { title: '帮买帮送', id: 5, url: '' },
      { title: '信用分奖励', id: 6, url: '' },
    ],
    title: '取消订单',
    url: '',
    initId: 0
  },

  onLoad () {

  },

  onclickBtn (e) {
  console.log(e.currentTarget.dataset.id);
  let data = this.data.list
  let id = e.currentTarget.dataset.id
  let title = data[id].title
  let url = data[id].url
  this.setData({
    title,
    url,
    initId: id
  })
  }
})