// pages/play/play.js
const url = 'http://musicapi.leanapp.cn';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songId: [],
    isPlay: false,
    history_songId: [],
    song: []
  },

  // 自定义函数及方法
  play(audioid) {
    app.globalData.songId = audioid;
    const innerAudioContest = wx.createInnerAudioContext();
    this.setData({
      innerAudioContest,
      isPlay: true
    });

    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: 'http://neteasecloudmusicapi.zhaoboy.com/song/url',
      data: {
        id: audioid
      },
      success: res => {
        // console.log(res);
        if(res.data.data[0].url === null) {
          wx.wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete: () => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        } else {
          this.createBgAudio(res.data.data[0]);
        }
      },
      fail: err => {
        console.log(err);
      }
    });

    //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
    wx.request({
      url: url+'/song/detail',
      data: {
        ids: audioid
      },
      success: res => {
        // console.log(res.data.songs[0]);
        if(res.data.songs.length === 0) {
          wx.wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete: () => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        } else {
          this.setData({
            song: res.data.songs[0]
          })
        }
      },
      fail: err => {
        console.log(err);
      }
    });
    // 获取歌词
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/',
      data: {
        type: 'lyric',
        id: audioid
      },
      success: res => {
        // console.log(res.data.lrc.lyric);
        this.setData({
          lyric: res.data.lrc.lyric
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  // 
  createBgAudio(res) {
    // 获取全局唯一背景音频处理器
    const bgAudioManage = wx.getBackgroundAudioManager();
    // 把实例bgAudioManage给全局
    app.globalData.bgAudioManage = bgAudioManage;
    bgAudioManage.title = 'title';
    bgAudioManage.src = res.url;

    const history_songId = this.data.history_songId;
    const historySong = {
      id: app.globalData.songId,
      songName: app.globalData.songName
    }
    history_songId.push(historySong);

    bgAudioManage.onPlay(res => {
      this.setData({
        isPlay: true,
        history_songId
      })
    });

    bgAudioManage.onEnded(res => {
      this.go_lastSong();
    })
    // 把historyId存入缓存
    wx.setStorageSync('historyId', history_songId);
  },

  go_lastSong() {
    let _this = this;
    // 获取下一首歌曲Id
    const lastSongId = app.globalData.waitForPlaying;
    // 随机选取数组中的一个元素
    const songId = lastSongId[Math.floor(Math.random() * lastSongId.length)];
    _this.data.songId = songId;
    _this.play(songId);
    app.globalData.songId = songId;
  },
  // 点击切换歌词和封面
  showLyric(){
    const {showLyric} = this.data;
    this.setData({
      showLyric: !showLyric
    })
  },
  handleToggleBGAudio() {
    const bgAudioManage = app.globalData.bgAudioManage;
    const {isPlay} = this.data;
    if(isPlay) {
      bgAudioManage.pause();
    } else {
      bgAudioManage.play();
    }
    this.setData({
      isPlay: !isPlay
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const audioid = options.id;
    this.play(audioid);
    // console.log(app.globalData);
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