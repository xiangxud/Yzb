/**
 * Created by TomChow on 2017/10/25.
 */
import {Dimensions, Platform, PixelRatio} from 'react-native'
import config from "./config";
import urls from "./urls";
import request from "./request";
import theme from "./theme";
import _ from "lodash";
import tools from "./tools";

global.__IOS__ = Platform.OS === 'android';
global.__ANDROID__ = Platform.OS === 'ios';
global.config = config;
global.urls = urls;
global.request = request;
global.theme = theme;
global._ = _;
global.tools = tools;
global.PlanState = {
    NotFinished: {
        Label: '未执行',
        Value: 0
    },
    Finished: {
        Label: '已执行',
        Value: 1
    },
    Ignore: {
        Label: '忽略',
        Value: 2
    }
}


//日期扩展
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//日期扩展
Date.prototype.InterVal = function (date) {
    var date3 = date.getTime() - this.getTime()  //时间差的毫秒数
    // 计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    return (days * 24 * 60) + (hours * 60) + minutes + (seconds / 60.00);//" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
}

Date.prototype.GetLabel = function () {
    let _now = new Date();
    let c = this.InterVal(_now);

    let intD0 = parseInt(this.Format("yyyyMMdd"), 10);
    let intD1 = parseInt(_now.Format("yyyyMMdd"), 10);

    if (c >= 0) {
        //1、刚刚
        if (c < 50) {
            return "刚刚";
        }
        //2、今天
        if (intD0 == intD1) {
            return "今天";
        }
        //3、昨天
        if (intD0 - intD1 == 1) {
            return "昨天";
        }
    } else {
        //马上
        if (c > -20) {
            return "马上";
        }
        //今天
        if (intD0 == intD1) {
            return "今天";
        }
        //明天
        if (intD1 - intD0 == 1) {
            return "明天";
        }
    }
    //5、当年
    if (_now.Format("yyyy") == this.Format("yyyy")) {
        return this.Format("MM-dd");
    }
    //6、其它
    return this.Format("yyyy-MM-dd");
}

//字符串转日期
String.prototype.ToDate = function () {
    var fullDate = this.toString().split("-");
    if (fullDate.length != 3) {
        return null;
    }
    if (fullDate[2].length > 2) {
        fullDate[2] = fullDate[2].substring(0, 2);
    }
    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
}
String.prototype.GetDayFromDateTimeString = function () {
    //2017-01-02 23:35:46
    var fullDate = this.toString().split("-");
    if (fullDate.length != 3) {
        return null;
    }
    //fullDate[2] : 02 23:35:46
    var others = fullDate[2].split(" ");
    return others[0];//02
}
String.prototype.GetTimeFromDateTimeString = function () {
    //2017-01-02 23:35:46
    var fullDate = this.toString().split("-");
    if (fullDate.length != 3) {
        return null;
    }
    //fullDate[2] : 02 23:35:46
    var others = fullDate[2].split(" ");
    if (others.length != 2) {
        return "";
    }
    return others[1];
}

String.prototype.GetHourseFromTimeString = function () {
    //23:01:01
    var fullTime = this.split(":");
    if (fullTime.length != 3) {
        return "";
    }
    return fullTime[0];
}
String.prototype.GetMinuteFromTimeString = function () {
    //23:01:01
    var fullTime = this.split(":");
    if (fullTime.length != 3) {
        return "";
    }
    return fullTime[1];
}
String.prototype.GetSecondFromTimeString = function () {
    //23:01:01S
    var fullTime = this.split(":");
    if (fullTime.length != 3) {
        return "";
    }
    return fullTime[2];
}
String.prototype.ToDateTime = function () {
    var fullDate = this.toString().split("-");
    if (fullDate.length != 3) {
        return null;
    }
    if (fullDate[2].length > 2) {
        fullDate[2] = fullDate[2].substring(0, 2);
    }
    var year = fullDate[0];
    var month = fullDate[1] - 1;
    var day = this.GetDayFromDateTimeString();
    var time = this.GetTimeFromDateTimeString();
    var h = time.GetHourseFromTimeString();
    var m = time.GetMinuteFromTimeString();
    var s = time.GetSecondFromTimeString();
    return new Date(year, month, day, h, m, s);
}
Array.prototype.fristOne = function (findIndexHandler) {
    for (var i = 0; i < this.length; i++) {
        if (findIndexHandler && findIndexHandler(this[i])) {
            return this[i];
        }
    }
    return null;
}
Array.prototype.removeItem = function (findIndexHandler) {
    for (var i = 0; i < this.length; i++) {
        if (findIndexHandler && findIndexHandler(this[i])) {
            this.splice(i, 1);
            return this;
        }
    }
    return this;
}
Array.prototype.extendMap=function(handler){
    let result = [];
    for( var i=0;i<this.length;i++){
        let o = handler?handler(this[i]):this[i];
        if(o!=null && o!=undefined){
            result.push( o );
        }
    }
    return result;
}