import { hexMD5 } from './md5.js'
import { base64DecodeToUtf16 } from './base64'

// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return (
//     [year, month, day].map(formatNumber).join('/') +
//     ' ' +
//     [hour, minute, second].map(formatNumber).join(':')
//   )
// }

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function md5Method(v) {
  return hexMD5(v)
}

/**
 * @description 对象键值进行排序
 * */
function keysSort(param) {
  const obj = {}
  const paramKeys = Object.keys(param).sort()
  for (const i in paramKeys) {
    obj[paramKeys[i]] = param[paramKeys[i]]
  }
  return obj
}

/**
 * @description 请求方法
 * */
function request(method, param) {
  const secretKey = 'a93ca04f-fe88-4204-ab65-1b5a5583802f'
  if (typeof param.service === 'undefined') {
    param.service = 'gws.xx.app'
  }
  param.method = method
  param.token = new Date().getTime()
  param = keysSort(param)
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.sanjia-soft.com/apipool.php',
      method: 'GET',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.result === 0 || res.data.result === 26) {
          resolve(res.data)
        } else {
          reject( foo(res.data))
          toast(res.data.detail)
          console.log('【接口' + method + '提示：】' + res.data.detail)
        }
      },
      fail: function(error) {
        console.log(method + '【AJAX:ERR】-|error.message:' + error.message)
        reject(error)
      }
    })
  })
}

function foo (obj) {
	// 遍历
	for (let key in obj) {
		if (Object.prototype.toString.call(obj[key]) === '[object Null]') {
			obj[key] = ''
			continue
		} 
		if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
			foo(obj[key])
		}
	}
}

/**
 * @description 上传图片
 * */
function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    const uploadTask = wx.uploadFile({
      url: 'https://api.sanjia-soft.com/upload/uploadImage.php',
      name: 'uploadImage',
      filePath: filePath,
      formData: {
        upload: 1,
        imageType: 'image',
        appType: 'gws',
        context: String(Date.parse(new Date()))
      },
      success (res) {
        if (res.data) {
          const data = JSON.parse(res.data)
          if (data.data) {
            resolve(data.data.url)
          } else {
            reject(res.data)
            toast('上传失败：' + data.detail)
          }
        }
      },
      fail (error) {
        reject(error)
      }
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
  })
}

/**
 * @description 获取uid
 * */
function getRid() {
  const app = getApp()
  return app.globalData.rid
}

/**
 * @description 获取分享id
 * */
function getArticleId () {
  const app = getApp()
  return app.globalData.articleId
}

/**
 * @description 设置分享id
 * */
function setArticleId (articleId) {
  const app = getApp()
  app.globalData.articleId = articleId
}

/**
 * @description base64解码
 * */
function base64Decode (str) {
  if (!str) {
    return ''
  }
  return base64DecodeToUtf16(str)
}

/**
 * @description 提示信息
 * 参数 loading success fail html
 * */
function toast (v) {
  wx.showToast({
    title: v,
    icon: 'none'
  })
}

/**
 * @description 转化时间为刚刚、几分钟前、几小时前……
 * @param time 接口传过来的时间
 * */
function getDateDiff (dateTimeStamp) {
  dateTimeStamp = dateTimeStamp + ''
  dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/g, '/'))
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  // const halfamonth = day * 15
  const month = day * 30
  const now = new Date().getTime()
  const diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    // 若日期不符则弹出窗口告之
    // alert("结束日期不能小于开始日期！");
  }
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  if (monthC >= 1) {
    return parseInt(monthC) + '个月前'
  } else if (weekC >= 1) {
    return parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    return parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    return parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC) + '分钟前'
  } else {
    return '刚刚'
  }
}

/**
 * @description 跳转聊天页面
 * @param pid 对方id
 * */
function navigateToChat (pid) {
  getUserProfile(pid)
}

function getUserProfile (pid) {
  const uid = '1149'
  Promise.all([
    request('getUserProfile', { uid }),
    request('getUserProfile', { uid: pid }),
  ]).then(r => {
    console.log(r);
    let obj = {}
    obj.uid = uid
    obj.name = r[0].data.nickName
    obj.avatar = r[0].data.avatar
    obj.pid = pid
    obj.pname = r[1].data.nickName
    obj.pavatar = r[1].data.avatar
    setMsgParams(obj)
  })
}

function setMsgParams (obj) {
  const keys = Object.keys(obj)
  let arr = []
  let query = ''
  for (const key of keys) {
    arr.push(`${key}=${encodeURIComponent(obj[key])}`)
  }
  query = arr.join('&')
  wx.navigateTo({
    url: `/pages/message/message?${query}`
  })
}

module.exports = {
  formatTime,
  request,
  md5Method,
  getRid,
  base64Decode,
  toast,
  getDateDiff,
  navigateToChat,
  uploadFile,
  getArticleId,
  setArticleId
}
