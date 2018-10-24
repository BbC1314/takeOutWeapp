Component({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {
    date: '',
    dateId: 1,
    selectDate: '',
    newDate: '',
    show: false
  },
  properties: {
    newDate:{
      type: String,
      value:" "
    },
  },
  methods: {
    onselectDate (e) {
      let date = "false"
      let id = e.currentTarget.dataset.id
      this.setData({
        dateId: id
      })
      if (id == 1) {
        // this.setData({
        //   date: this.data.newDate
        // })
        date = this.data.newDate
      }else if (id == 2) {
        // this.setData({
        //   date: '全部'
        // })
        date = '全部'
      }else{
        this.setData({
          show: true,
          // selectDate: this.data.newDate
        })
      }
      this.triggerEvent('click', {
        date
      })
    },

    bindDateChange (e) {
      let date = e.detail.value
      this.setData({
        selectDate: date,
        show: false
      })
      this.triggerEvent('click', {
        date: this.data.selectDate
      })
    },

    onClose () {
      this.setData({
        show: false
      })
    }
  }
})
