import config from '../../utils/config'

Page({
  data: {
    src: ''
  },
  onLoad (option) {
    const keys = Object.keys(option)
    let arr = []
    let query = ''
    for (const key of keys) {
      arr.push(`${key}=${option[key]}`)
    }
    query = arr.join('&')
    this.setData({
      src: config.chatUrl + '/wap/user/?appId=0&' + query
    })
  }
})