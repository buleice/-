//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    poemList:[],
    src:'',
    playStatus:false,
    playIndex:0
  },

  onLoad: function () {
    var _this=this;
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = false;
    wx.request({
      url: 'http://106.13.4.50:8899/poemList',
      success(res) {
        console.log(res)
        _this.setData({
          poemList: res.data
        })
        console.log(_this.data.poemList[_this.data.playIndex])
        _this.innerAudioContext.src = _this.data.poemList[_this.data.playIndex].url
      }
    })
    this.innerAudioContext.onPlay(() => {
      this.setData({
        playStatus: true
      })
    })
    this.innerAudioContext.onPause(()=>{
      this.setData({
        playStatus: false
      })
    })
    this.innerAudioContext.onEnded(()=>{
      this.setData({
        playStatus: false
      })
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })

  },
  loadMorePoem: function () {
    if (!this.data.poemHasMore || this.data.searchLoading) {
      return;
    }
    // console.info('loadMorepoem');
    this.setData({
      searchLoading: true
    });
    this.loadData(this.data.poemPageIndex + 1);
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
      this.setSrc(this.data.poemList[this.data.playIndex].url)
      this.innerAudioContext.onCanplay(()=>{
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
  audioStop(){
    this.innerAudioContext.stop()
    this.setData({
      playStatus: false
    })
  },
  setSrc(src){
    this.innerAudioContext.src=src;
    this.innerAudioContext.seek(0);
  }

})
