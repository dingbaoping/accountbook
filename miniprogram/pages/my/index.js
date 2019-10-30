//index.js
const app = getApp()
import { add, findWhere } from "../../utils/request.js";
import formatDateTime from "../../utils/time.js";

Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    userInfo: {},

    openid: '',
    income:0.00,
    expenditure:0.00,
    total:0.00,
    month:1,

    openidauto: false
  },

  onLoad: function () {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      if (this.data.openid == 'oCp340DJ0KvKrHALYuN5y4_R2PJ0') {
        this.setData({
          openidauto: true
        })
      } else {
        this.setData({
          openidauto: false
        })
      }
    }else{
      this.onGetOpenid();
    }

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

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
              wx.setStorageSync("nick_name", res.userInfo.nickName);
              wx.setStorageSync("avatar_url", res.userInfo.avatarUrl);
            }
          })


        }
      }
    })
    
    console.log('获取', this.data.openid)
    
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

  arrowClick(e){
    console.log('打印跳转', e.currentTarget.dataset);
    let arrowname = e.currentTarget.dataset.name;

    switch (arrowname) {
      case 'addadvise':
        wx.navigateTo({
          url: '/pages/about/advise/add/index',
        })
        break;
      case 'advise':
        wx.navigateTo({
          url: '/pages/about/advise/list/index',
        })
        break;
      case 'addlog':
        wx.navigateTo({
          url: '/pages/about/log/add/index',
        })
        break;
      case 'log':
        wx.navigateTo({
          url: '/pages/about/log/list/index',
        })
        break;
      default:
        // 默认代码块
        break;
    } 

  },

  moreClick(){
    wx.navigateTo({
      url: '/pages/account/month/index',
    })
  },

  onGetUserInfo: function (res) {

    if (res.detail.userInfo) {
      this.setData({
        avatarUrl: res.detail.userInfo.avatarUrl,
        userInfo: res.detail.userInfo
      })

      const data = {
        avatar_url: res.detail.userInfo.avatarUrl,
        city: res.detail.userInfo.city,
        nick_name: res.detail.userInfo.nickName,
        create_time: formatDateTime(),
        update_time: formatDateTime(),
      }
      add("users", data);
      wx.setStorageSync("nick_name", res.detail.userInfo.nickName);
      wx.setStorageSync("avatar_url", res.detail.userInfo.avatarUrl);

    }
  },

  onGetOpenid: function () {
    // 调用云函数
    var _this=this;
    wx.cloud.callFunction({
      name: 'sql',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res)
        app.globalData.openid = res.result.userInfo.openId;
        _this.setData({
          openid: res.result.userInfo.openId
        })
        if (_this.data.openid == 'oCp340DJ0KvKrHALYuN5y4_R2PJ0') {
          _this.setData({
            openidauto: true
          })
        } else {
          _this.setData({
            openidauto: false
          })
        }

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

})
