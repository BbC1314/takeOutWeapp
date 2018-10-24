import { request, getRid, base64Decode,getDateDiff, navigateToChat} from '../../utils/util'

Page({
  data: {
    rid: '',
    mesId: 0,
    chatList: [],
    searchYN: true,
    searchMsg: [],
    editMsg: [
      {
        name: '删除',
        color: '#fff',
        fontsize: '20',
        width: 80,
        background: '#ed3f14',
        
      }
    ]
  },

  onLoad() {
    this.setData({
      rid: getRid()
    })
    // this.getChatUserId()
  },

  getChatUserId() {
    request('getChatUserId', {
      rid: this.data.rid,
      appId: 0,
      service: 'sj.cloud.message'
    }).then(r => {
      this.setData({
        mesId: r.data.rid
      })
      this.getRecentChatUserList()
    })
  },

  getRecentChatUserList() {
    request('getRecentChatUserList', {
      rid: this.data.mesId,
      service: 'sj.cloud.message'
    })
      .then(r => {
        this.setData({
          chatList: r.data.rs
        })
        console.log(r.data.rs)
      })
      .then(() => {
        this.lastMessage()
      })
  },

  deleteChat(ppid) {
    request('deleteChat', {
      rid: this.data.mesId,
      pid: ppid,
      service: 'sj.cloud.message'
    }).then(() => {
      this.getRecentChatUserList()
    })
  },

  searchChatUserList(searchName) {
    request('searchChatUserList', {
      rid: this.data.mesId,
      name: searchName,
      service: 'sj.cloud.message'
    })
      .then(r => {
        this.setData({
          searchMsg: r.data.rs
        })
      })
      .then(() => {
        let msg = this.data.searchMsg
        for (let i = 0; i < this.data.searchMsg.length; i++) {
          msg[i].lastMessage = base64Decode(this.data.searchMsg[i].lastMessage)
        }
        this.setData({
          searchMsg: msg
        })
      })
  },

  ondeleteChat(e) {
    this.deleteChat(e.currentTarget.dataset.rid)
  },

  onSearch(e) {
    // console.log(e.detail);
    // console.log( typeof(e.detail) );
    if (e.detail == '') {
      this.setData({
        searchYN: true
      })
    }else{
      // console.log(1);
      this.setData({
        searchYN: false
      })
    }
    this.searchChatUserList(e.detail)
  },

  lastMessage() {
    let msg = this.data.chatList
    for (let i = 0; i < this.data.chatList.length; i++) {
      msg[i].lastMessage = base64Decode(this.data.chatList[i].lastMessage),
      msg[i].messageTime = getDateDiff(this.data.chatList[i].messageTime)
    }
    this.setData({
      chatList: msg
    })
  },

  msgDetail (e) {
    const data = e.currentTarget.dataset
    navigateToChat(data.pid)
  }
})
