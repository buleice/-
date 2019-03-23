//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    poemList:[],
    src:'http://106.13.4.50/cqmy.wav',
    src_2:'http://dl.stream.qqmusic.qq.com/C400000H2jfM21Wl7c.m4a?guid=4935912155&vkey=DB457B64C1C4E34F3305D83EDFABB7C8CB98F1012B0090FB2977A52D0E6616FB9003C316F11542A6A60267013C415A3486C2329FC7F08740&uin=0&fromtag=38',
    playStatus:false,
    playIndex:0
  },

  onLoad: function () {
    var _this=this;
   this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = false;
    this.innerAudioContext.src = 'http://dl.stream.qqmusic.qq.com/C400000H2jfM21Wl7c.m4a?guid=4935912155&vkey=DB457B64C1C4E34F3305D83EDFABB7C8CB98F1012B0090FB2977A52D0E6616FB9003C316F11542A6A60267013C415A3486C2329FC7F08740&uin=0&fromtag=38'
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
    wx.request({
      url: 'http://106.13.4.50:8899/poemList',
      success(res){
        console.log(res)
        _this.setData({
          poemList:res.data
        })
      }
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
      this.setSrc('http://106.13.4.50/cqmy.wav')
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
