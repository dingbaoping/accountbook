//index.js
const app = getApp()
import { add, findWhere } from "../../../utils/request.js";

Page({
  data: {
    openid: '',
    list:[]
  },

  onLoad: function () {
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


  },
  onShow() {

    var _this = this;
    const data = {
      _openid: this.data.openid
    }
    findWhere("bills", data, function (res) {

      // 将相同的date时间数据分为一组
      var map = {},
        dest = [];
      for (var i = 0; i < res.length; i++) {

        var ai = res[i];
        if (!map[ai.create_time.substring(0, 7)]) {
          dest.push({
            create_time: ai.create_time.substring(0,7),
            data: [ai]
          });

          map[ai.create_time.substring(0, 7)] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.create_time.substring(0, 7) == ai.create_time.substring(0, 7)) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }

      var list = [];
      for (let item of dest) {
        var incomeData = item.data.filter((value, index, arr) => {
          return value.type == "收入";
        })
        var income = 0;
        for (let num of incomeData) {
          income += parseFloat(num.money)
        }

        var expenditureData = item.data.filter((value, index, arr) => {
          return value.type == "支出";
        })
        var expenditure = 0;
        for (let num of expenditureData) {
          expenditure += parseFloat(num.money)
        }
        

        list.push({
          month: item.create_time.substring(0, 4) + "年"+item.create_time.substring(5, 7)+"月",
          create_time: item.create_time,
          income: income.toFixed(2),
          expenditure: expenditure.toFixed(2),
          total: (income - expenditure).toFixed(2)
        });
        
      }

      _this.setData({
        list: list.reverse()
      })

    }, function () {
    })
  },

  moreClick(e) {
    console.log("打印", e.currentTarget.dataset.month)
    var months = e.currentTarget.dataset.month;
    wx.navigateTo({
      url: '/pages/account/month-details/index?month=' + months,
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
  },



})
