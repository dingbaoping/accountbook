//index.js
const app = getApp()
import {find} from "../../utils/request.js";

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

      console.log("打印2", dest)
    })
  },
  addClick(){
    wx.navigateTo({
      url: '/pages/account/add/index',
    })
  }
})
