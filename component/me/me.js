// pages/me/me.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // pay() {
    //   wx.requestPayment({
    //     timeStamp: '',
    //     nonceStr: '',
    //     package: '',
    //     signType: 'MD5',
    //     paySign: '',
    //     success: (res) => {
    //       console.log(res);
    //     },
    //     fail: (err) => {
    //       console.log(err);
    //     }
    //   })
    // },
    login: () => {
      wx.login({
        success: (res) => {
          if(res.code) {
            wx.request({
              url: 'http://api.weixin.qq.com',
              data: {
                code: res.code
              },
              success: (res) => {
                console.log('第四十六行：'+res);
              }
            })
          } else {
            console.log('登录失败！'+res.errMsg);
          }
        }
      })
    }
  }
})
