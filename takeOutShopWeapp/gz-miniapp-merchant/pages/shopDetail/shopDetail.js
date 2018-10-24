Page({
  data: {
    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539941667775&di=ddda12b17fb59be9f0572b35b8c80de1&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150514%2F0007019910343460_b.jpg'
  },
  onLoad () {

  },
  onpreviewImage () {
    let urls = [this.data.imgUrl]
    wx.previewImage({
      urls,
      current: this.data.imgUrl
    })
  }
})