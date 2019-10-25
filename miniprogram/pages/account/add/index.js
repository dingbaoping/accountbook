// pages/account/add/index.js
import { add } from "../../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e) {

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

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.title){
      if (e.detail.value.money){
        const data={
          title: e.detail.value.title,
          money: e.detail.value.money,
          type: e.detail.value.type,
          remark: e.detail.value.remark,
          create_time: times,
          update_time: times,

        }
        add("bills", data,function(){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta:1
          })
        });
      }else{
        wx.showToast({
          title: '请填写金额',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }else{
      wx.showToast({
        title: '请填写物品名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

