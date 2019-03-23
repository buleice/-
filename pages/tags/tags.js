// miniprogram/pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    tags:[
      {name:'唐代',objectId:'01',queryType:"01"},
      { name: '宋代', objectId: '02', queryType: "01"},
      { name: '元代', objectId: '03', queryType: "01"},
      { name: '杜甫', objectId: '04', queryType: "02"},
      { name: '李白', objectId: '05', queryType: "03"},
      { name: '苏轼', objectId: '06', queryType: "04"},
    ],
    search:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onCancelBtnClcik: function(){
    this.setData({
      search:""
    });
  },
  Onserach(e){
    const value = e.currentTarget.dataset.name;
    if (value !== null && value !== '') {
      if (this.processQueryParams(value)) {
        wx.navigateTo({
          url: '/pages/search/search?value=' + value,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '没有查询到该结果，试试下面得推荐吧',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }

  },
  onSearchConfirm:function(value){
    // console.info(typeof(value))
    this.setData({
      search:value.detail.value
    });
    if (value.detail.value !== null && value.detail.value !== ''){
      if (this.processQueryParams(value.detail.value)){
        wx.navigateTo({
          url: '/pages/search/search?value=' + this.data.search,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        });
      }else{
        wx.showModal({
          title: '提示',
          content: '没有查询到该结果，试试下面得推荐吧',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
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

  processQueryParams(params){
    let flag=false;
    this.data.tags.forEach((item,index)=>{
      if (item.name.indexOf(params)>-1){
        flag=true
      }
    })
    return flag;
  }
})