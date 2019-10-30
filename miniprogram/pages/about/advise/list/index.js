// pages/about/advise/list/index.js
import { find, findWhere, del } from "../../../../utils/request.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    lists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onFind(){
    return new Promise((resolve, reject) => {
      find('advices', function (res) {
        resolve(res.reverse());
      })
    })
  },
  onGetData(){
   
    this.onFind().then((item) => {
      item.forEach(function (currentValue, index, arr) {
        findWhere('images', { advice_id: currentValue['_id'] }, function (e) {
          arr[index].imagesList = e.reverse();
        })
      })
      this.setData({
        lists: item,
      }); 
      return console.log('数据', item,this.data.lists)
    })

    
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
    
    this.onGetData();

    setTimeout(()=>{
      this.setData({
        list: this.data.lists
      })
    },1000)
    
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