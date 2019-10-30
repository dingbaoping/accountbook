//index.js
const app = getApp()
import { findWhere } from "../../../utils/request.js";

Page({
  data: {
    openid: '',
    list: [],
    month:1,
  },

  onLoad: function (e) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    } else {
      this.onGetOpenid();
    }

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    this.setData({
      month: e.month
    })
    console.log('打印',e)
  },
  onShow() {
    this.getData();
  },
  getData(){
    var _this = this;
    const data = {
      _openid: this.data.openid
    }

    findWhere("bills", data, function (res) {
      console.log("打数据", res)
      var monthData = res.filter((value, index, arr) => {
        return value.create_time.substring(0, 7) == _this.data.month;
      })

      _this.setData({
        list: monthData.reverse()
      })

    }, function () {
    })
  },
  addClick() {
    wx.navigateTo({
      url: '/pages/account/add/index',
    })
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'sql',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res)
        app.globalData.openid = res.result.userInfo.openId
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }
})
