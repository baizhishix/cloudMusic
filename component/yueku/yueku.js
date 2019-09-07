// pages/yueku/yueku.js
const api = require("../../API/api");

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  // 自定义方法

  /**
   * 组件的初始数据
   */
  data: {
    banners: [],
    cardCur: 0,
    mvList: [],
    songNewList: [],
    playLists: [],
    radioList: [],
    albums: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取轮播图
    getBanner: function() {
      api.getBanner({
        type: 2
      })
      .then(res => {
        // console.log(res);
        this.setData({
          banners: res.banners
        })
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 最新音乐获取
    getNewSong() {
      api.getNewSong()
      .then(res => {
        // console.log(res);
        if(res.code == 200) {
          res.result = res.result.splice(0, 6);
          this.setData({
            songNewList: res.result
          })
          // console.log(this.data.songNewList);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 最新歌单获取
    getsongsheet() {
      api.getsongsheet()
      .then(res => {
        // console.log(res);
        if(res.code == 200) {
          res.playlists = res.playlists.splice(0, 6);
          this.setData({
            playLists: res.playlists
          })
          // console.log(this.data.playLists);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    // 最新MV获取
    getRecommendMV() {
      api.getRecommendMV()
      .then(res => {
        // console.log(res);
        if(res.code == 200) {
          this.setData({
            mvList: res.result
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 精选电台获取
    getDjRadios() {
      api.getDjRadios()
      .then(res => {
        // console.log(res);
        if(res.code == 200) {
          res.djRadios = res.djRadios.splice(0, 6);
          this.setData({
            radioList: res.djRadios
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 最新专辑获取
    getNewEst() {
      wx.request({
        url: "http://neteasecloudmusicapi.zhaoboy.com/album/newest",
        method: "get",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          // console.log(res);
          if(res.data.code == 200) {
            res.data.albums = res.data.albums.splice(0, 6);
            this.setData({
              albums: res.data.albums
            })
            // console.log(this.data.albums);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      })
    },



    cardSwiper(e) {
      // console.log(e);
      this.setData({
        cardCur: e.detail.current
      })
    },
    gotoSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
        success: (res) => {
          // console.log(res);
        },
        fail: () => {},
        complete: () => {}
      });
        
    },
    musicPlay(e) {
      console.log(e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/play/play?id='+id,
        success: (res) => {
          // console.log(res);
        },
        fail: err => {
          console.log(err);
        }
      })
    },
  },
  created () {
    // 获取推荐轮播
    this.getBanner();
    // 获取最新歌曲
    this.getNewSong();
    // 获取精选歌单
    this.getsongsheet();
    // 获取推荐MV
    this.getRecommendMV();
    // 获取精选电台
    this.getDjRadios();
    // 获取最新专辑
    this.getNewEst();
  }
})
