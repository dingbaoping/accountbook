//index.js
const app = getApp()
import { find, del} from "../../utils/request.js";

Page({
  data: {
    list:[]
  },

  onLoad: function() {
   
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

  },
  onShow(){
    var that = this;
    find('bills', function (res) {
      console.log('列表', res)

      // 将相同的date时间数据分为一组
      var res =res.reverse();
      var map = {},
        dest = [];
      for (var i = 0; i < res.length; i++) {
        console.log("打", res[i])
        
        res[i].time = res[i].create_time.substring(11, 19);
        
        var ai = res[i];
        if (!map[ai.create_time.substring(0, 10)]) {
          dest.push({
            create_time: ai.create_time.substring(0, 10),
            data: [ai]
          });

          map[ai.create_time.substring(0, 10)] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.create_time.substring(0, 10) == ai.create_time.substring(0, 10)) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }

      that.setData({
        list: dest
      })

    })
  },
  addClick(){
    wx.navigateTo({
      url: '/pages/account/add/index',
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  // 删除
  delectClick(e){
    console.log('删除', e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    var _this=this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success(res) {
        if (res.confirm) {

          del('bills',id, function (res) {
            console.log('列表', res);
            _this.onShow();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
          })

        } else {
          console.log('用户点击取消')
        }
      }
    })
    
    
  }
})
