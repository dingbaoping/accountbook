//index.js
const app = getApp()
import { add, findWhere } from "../../utils/request.js";

Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    userInfo: {},

    openid: '',
    income:0.00,
    expenditure:0.00,
    total:0.00,
    month:1,
  },

  onLoad: function () {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }else{
      this.onGetOpenid();
    }

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }


    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    var times = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("打印", res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })


        }
      }
    })
  },
  onShow(){

    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var months = y + '-' + m;

    var _this=this;
    const data={
      _openid: this.data.openid
    }
    findWhere("bills",data,function(res){
      console.log("打数据",res)
      var monthData=res.filter((value,index,arr)=>{
        console.log('你好1', value.create_time)    // 1，2，3
        return value.create_time.substring(0, 7) == months;
      })

      var incomeData = res.filter((value, index, arr) => {
        return value.type == "收入";
      })
      var expenditureData = res.filter((value, index, arr) => {
        return value.type == "支出";
      })
      
      var income=0;
      for (let num of incomeData) {
        income += parseFloat(num.money)
      }
      
      var expenditure = 0;
      for (let num of expenditureData) {
        expenditure += parseFloat(num.money)
      }

      _this.setData({
        month: date.getMonth() + 1,
        income: income.toFixed(2),
        expenditure: expenditure.toFixed(2),
        total: (income - expenditure).toFixed(2)
      })

    },function(){
    })
  },

  moreClick(){
    wx.navigateTo({
      url: '/pages/account/month/index',
    })
  },

  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })

      const data = {
        avatar_url: res.userInfo.avatarUrl,
        city: res.userInfo.city,
        nick_name: res.userInfo.nickName,
        create_time: times,
        update_time: times,
      }
      add("users", data);

    }
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
