// pages/about/advise/add/index.js
import { add } from "../../../../utils/request.js";
import formatDateTime from "../../../../utils/time.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[]
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

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '确定要删除吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  onSubmit(e){

    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    if (e.detail.value.content) {

        new Promise((resolve,reject)=>{
          let data1 = {
            advice_nick_name: wx.getStorageSync('nick_name'),
            advice_avatar_url: wx.getStorageSync('avatar_url'),
            content: e.detail.value.content,
            phone: e.detail.value.phone,
            create_time: formatDateTime(),
            update_time: formatDateTime(),
          }

          add("advices", data1, function (e) {
            resolve(e._id);
          });
        }).then((id)=>{
          
          this.data.imgList.forEach((currentValue, index, arr)=>{
            let data2 = {
              advice_id: id,
              avatar: currentValue,
              create_time: formatDateTime(),
              update_time: formatDateTime(),
            }
            add("images", data2, function () {});
          })
          // resolve(1);
        }).then(()=>{
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        })
    } else {
      wx.showToast({
        title: '请意见与反馈',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
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