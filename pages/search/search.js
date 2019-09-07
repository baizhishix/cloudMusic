// pages/search/search.js
const api = require('../../API/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    keywords: null,
    keyInput: false,
    searchSuggest: []
  },

  // 获取热搜词
  gethotsongs() {
    var _this = this;
    api.gethotsongs({
      type: 'new'
    })
    .then(res => {
      // console.log(res);
      if(res.code == 200) {
        _this.setData({
          hots: res.result.hots
        });
      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  // 获取搜索建议
  searchSuggest(data) {
    wx.request({
      url: 'http://neteasecloudmusicapi.zhaoboy.com/search/suggest',
      data: {
        keywords: this.data.keywords,
        type: 'mobile'
      },
      success: (res) => {
        if(res.data.code == 200) {
          this.setData({
            searchSuggest: res.data.result.allMatch
          })
          // console.log(this.data.searchSuggest);
        }
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  // 搜索结果
  searchResult(e) {
    console.log(e.target.dataset.data);
    api.searchResult({
      keywords: e.target.dataset.data
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  },

  inputSearch(e) {
    if(e.detail.value !== '') {
      this.setData({
        keyInput: true,
        keywords: e.detail.value
      })
      // console.log(this.data.keywords);
      this.searchSuggest(this.data.keywords);
    }
  },
  focusInput(e) {
    // console.log(e);
    if(e.detail.value !== '') {
      this.setData({
        keyInput: true,
        keywords: e.detail.value
      })
      console.log(this.keyInput);
    }
  },

  // 热搜词点击事件
  searchHot(e) {
    let data = e.target.dataset.data;
    this.searchSuggest(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotsongs();
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

  }
})