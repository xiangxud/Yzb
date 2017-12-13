/**
 * Created by TomChow on 2017/10/25.
 */
import { Dimensions, Platform, PixelRatio } from 'react-native'
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
global.PlanState={
    NotFinished:{
        Label:'未执行',
        Value:0
    },
    Finished:{
        Label:'已执行',
        Value:1
    },
    Ignore:{
        Label:'忽略',
        Value:2
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
//字符串转日期
String.prototype.ToDate = function(){
    var fullDate = this.toString().split("-");

    if( fullDate.length != 3 ){
        return null;
    }
    if( fullDate[2].length > 2 ){
        fullDate[2] = fullDate[2].substring(0,2);
    }
    return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);
}
Array.prototype.fristOne=function (findIndexHandler) {
    for( var i=0;i<this.length;i++){
        if(findIndexHandler && findIndexHandler(this[i])){
            return this[i];
        }
    }
    return null;
}
Array.prototype.removeItem=function (findIndexHandler) {
    for( var i=0;i<this.length;i++){
        if(findIndexHandler && findIndexHandler(this[i])){
            this.splice(i,1);
            return this;
        }
    }
    return this;
}