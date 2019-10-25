//index.js
const app = getApp()
import { findWhere } from "../../../utils/request.js";

Page({
  data: {
    openid: '',
    list: []
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

    var _this = this;
    console.log("你好", e.month);
    var months = e.month;
    const data = {
      _openid: this.data.openid
    }

    findWhere("bills", data, function (res) {
      console.log("打数据", res)
      var monthData = res.filter((value, index, arr) => {
        return value.create_time.substring(0, 7) == months;
      })

      _this.setData({
        list: monthData
      })

    }, function () {
    })



  },
  onShow() {
    
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
