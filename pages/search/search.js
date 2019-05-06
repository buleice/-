// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    loadingFail: false,
    searchs: [],
    searchs:0,
    auths: [
      '李白',
      '杜甫',
      '苏轼'
    ],
    dynasty: [
      '唐代',
      '宋代',
      '元代'
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    const _this = this;
    var values = options.value;
    wx.request({
      url: 'http://106.13.4.50:8899/detailContent',
      data: {
        detailContent: values

      },
      success(res) {
        console.log(res)
        _this.setData({ searchs: res.data, loadingHidden: true })
      }
    })

    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = false;
    this.innerAudioContext.src = 'http://dl.stream.qqmusic.qq.com/C400000H2jfM21Wl7c.m4a?guid=4935912155&vkey=DB457B64C1C4E34F3305D83EDFABB7C8CB98F1012B0090FB2977A52D0E6616FB9003C316F11542A6A60267013C415A3486C2329FC7F08740&uin=0&fromtag=38'
    this.innerAudioContext.onPlay(() => {
      this.setData({
        playStatus: true
      })
    })
    this.innerAudioContext.onPause(() => {
      this.setData({
        playStatus: false
      })
    })
    this.innerAudioContext.onEnded(() => {
      this.setData({
        playStatus: false
      })
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    console.log(values)

    // if (this.data.auths.includes(values)) {
    //   wx.request({
    //     url: 'http://106.13.4.50:8899/poemAuthor',
    //     data: {
    //       poemAuthor: values

    //     },
    //     success(res) {
    //       console.log(res)
    //       _this.setData({ searchs: res.data, loadingHidden: true })
    //     }
    //   })
    // } else if (this.data.dynasty.includes(values)) {
    //   wx.request({
    //     url: 'http://106.13.4.50:8899/poemDynasty',
    //     data: {
    //       poemDynasty: values
    //     },
    //     success(res) {
    //       console.log(res)
    //       _this.setData({ searchs: res.data, loadingHidden: true })
    //     }
    //   }
    //   )
    // } else {

    // }

  },
  itemClick: function (event) {
    console.info(event.currentTarget.id);
    var data = this.data.searchs[parseInt(event.currentTarget.id)];
    console.info(data);
    var ntUrl = "";
    if (data.type == "01") {
      ntUrl = '/pages/poem/poem?poem=' + data.id;
    } else {
      ntUrl = '/pages/author/author?author=' + data.id;
    }
    console.info(ntUrl);
    wx.navigateTo({
      url: ntUrl,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchAudio(e) {
    const index = e.currentTarget.dataset.index;
    if (index == this.data.playIndex) {
      if (this.data.playStatus) {
        this.innerAudioContext.pause()
      } else {
        this.innerAudioContext.play()
      }
    } else {
      this.setData({
        playIndex: index
      })
      this.audioStop()
      this.setSrc(this.data.searchs[this.data.playIndex].url)
      this.innerAudioContext.onCanplay(() => {
        this.innerAudioContext.play();
      })
    }
  },
  audioPlay() {
    this.innerAudioContext.play()
    this.setData({
      playStatus: true
    })
  },
  audioPause() {
    this.innerAudioContext.pause()
    this.setData({
      playStatus: false
    })
  },
  audio14() {
    this.innerAudioContext.seek(14)
  },
  audioStart() {
    this.innerAudioContext.seek(0)
    this.setData({
      playStatus: true
    })
  },
  audioStop() {
    this.innerAudioContext.stop()
    this.setData({
      playStatus: false
    })
  },
  setSrc(src) {
    this.innerAudioContext.src = src;
    this.innerAudioContext.seek(0);
  }
})