//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

Page({
  data: {
    now_url: '../../images/weather/qing.png',
    now_weather_pic: 'http://app1.showapi.com/weather/icon/day/01.png',
    now_weather: "多云",
    now_wind_power: "0-3级",
    now_wind_direction: "东风",
    now_air_temperature: "1",
    week: '星期一',
    list: [
      {
        "night_weather_code": "01",
        "day_weather": "多云",
        "night_weather": "多云",
        "night_wind_power": "0-3级",
        "areaid": "101220101",
        "day_wind_power": "3-4级",
        "day_weather_code": "01",
        "daytime": "20191129",
        "area": "合肥",
        "day_weather_pic": "http://app1.showapi.com/weather/icon/day/01.png",
        "night_air_temperature": "1",
        "day_air_temperature": "11",
        "day_wind_direction": "东风",
        "night_wind_direction": "东风",
        "night_weather_pic": "http://app1.showapi.com/weather/icon/night/01.png"
      },
      {
        "night_weather_code": "07",
        "day_weather": "小雨",
        "night_weather": "小雨",
        "night_wind_power": "3-4级",
        "areaid": "101220101",
        "day_wind_power": "0-3级",
        "day_weather_code": "07",
        "daytime": "20191130",
        "area": "合肥",
        "day_weather_pic": "http://app1.showapi.com/weather/icon/day/07.png",
        "night_air_temperature": "6",
        "day_air_temperature": "10",
        "day_wind_direction": "西北风",
        "night_wind_direction": "西北风",
        "night_weather_pic": "http://app1.showapi.com/weather/icon/night/07.png"
      },
      {
        "night_weather_code": "00",
        "day_weather": "小雨",
        "night_weather": "晴",
        "night_wind_power": "3-4级",
        "areaid": "101220101",
        "day_wind_power": "3-4级",
        "day_weather_code": "07",
        "daytime": "20191201",
        "area": "合肥",
        "day_weather_pic": "http://app1.showapi.com/weather/icon/day/07.png",
        "night_air_temperature": "4",
        "day_air_temperature": "7",
        "day_wind_direction": "西北风",
        "night_wind_direction": "北风",
        "night_weather_pic": "http://app1.showapi.com/weather/icon/night/00.png"
      },
      {
        "night_weather_code": "00",
        "day_weather": "晴",
        "night_weather": "晴",
        "night_wind_power": "0-3级",
        "areaid": "101220101",
        "day_wind_power": "3-4级",
        "day_weather_code": "00",
        "daytime": "20191202",
        "area": "合肥",
        "day_weather_pic": "http://app1.showapi.com/weather/icon/day/00.png",
        "night_air_temperature": "-2",
        "day_air_temperature": "10",
        "day_wind_direction": "西北风",
        "night_wind_direction": "北风",
        "night_weather_pic": "http://app1.showapi.com/weather/icon/night/00.png"
      }

    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    setTimeout(()=>{
      this.getUserLocation();
    },400);

  },
  nowWeather: function () {
    let nowList = this.data.list[0];
    //天气预报中，“白天”一般是指8时至20时，“夜间”一般是指20时至08时
    let now = (new Date()).getHours();
    var nowweather = nowList.night_weather_code;
    if (now >= 8 && now <= 20) {
      nowweather = nowList.day_weather_code;
      this.setData({
        now_weather_pic: nowList.day_weather_pic,
        now_weather: nowList.day_weather,
        now_wind_power: nowList.day_wind_power,
        now_wind_direction: nowList.day_wind_direction
      })
    } else {
      this.setData({
        now_weather_pic: nowList.night_weather_pic,
        now_weather: nowList.night_weather,
        now_wind_power: nowList.night_wind_power,
        now_wind_direction: nowList.night_wind_direction
      })
    }

    var day = (new Date()).getDay();//得到周几
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

    this.setData({
      now_air_temperature: nowList.night_air_temperature + '℃~' + nowList.day_air_temperature + '℃',
      week: arr_week[day]
    })

    var backgroundColor = '#4fb1ca';
    if (nowweather == '00' || nowweather == '01') {
      this.setData({
        now_url: '../../images/weather/qing.png'
      })
      backgroundColor = '#4fb1ca';
    } else if (nowweather == '02') {
      this.setData({
        now_url: '../../images/weather/yin.png'
      })
      backgroundColor = ' #87c4ca';
    } else if (nowweather == '18' || nowweather == '20' || nowweather == '29' || nowweather == '30' || nowweather == '31' || nowweather == '53') {
      this.setData({
        now_url: '../../images/weather/wu.png'
      })
      backgroundColor = '#eac797';
    } else if (nowweather == '03' || nowweather == '04' || nowweather == '05' || nowweather == '07' || nowweather == '08' || nowweather == '09' || nowweather == '10' || nowweather == '11' || nowweather == '12' || nowweather == '21' || nowweather == '22' || nowweather == '23' || nowweather == '24' || nowweather == '25' || nowweather == '301') {
      this.setData({
        now_url: '../../images/weather/yu.png'
      })
      backgroundColor = '#898ab6';
    } else if (nowweather == '06' || nowweather == '13' || nowweather == '14' || nowweather == '15' || nowweather == '16' || nowweather == '17' || nowweather == '26' || nowweather == '27' || nowweather == '28' || nowweather == '302') {
      this.setData({
        now_url: '../../images/weather/xue.png'
      })
      backgroundColor = '#b7d5df';
    } else {
      this.setData({
        now_url: '../../images/weather/ye.png'
      })
      backgroundColor = '#16516f';
    }

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: backgroundColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  },
  getUserLocation: function () {
    var qqmapsdk = new QQMapWX({
      key: 'QKYBZ-DTB3R-5MOWS-WMUXK-FAPW3-3EFP6' // 必填
    });

    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        console.log("打印", res);

        // 调用接口

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            let city = res['result']['address_component']['city'];
            let city_code = res['result']['ad_info']['city_code'];
            wx.request({
              url: "https://api.dingbaoping.cn/weather.php",
              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              dataType: 'json',
              data: {
                city: city
              },
              success: function (result) {
                console.log(result)
                if (result.data.showapi_res_code == 0) {
                  that.setData({
                    list: result.data.showapi_res_body.dayList
                  })
                  that.nowWeather();
                }
              }

            })

          },
          fail: function (res) {
            console.log('失败', res);
          }

        })


      }
    })
  },
  onShow() {

  }
})
