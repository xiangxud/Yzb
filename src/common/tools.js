import {ToastAndroid, Alert,Platform} from "react-native";
import uuid from "uuid";
import pinyin from "./pinyin";
const tools = {
	/**
	 * 生成UUID
	 * @returns {*}
	 */
	uuid(){
		return uuid.v1();
	},

	/**
	 * ToastAndroid.show
	 * @param text
	 */
	showToast(text,flag){
		// Toast.showShortBottom(text)
		if(Platform.OS=='android'){
			ToastAndroid.show(text, ToastAndroid.SHORT);
		}else{
			if(flag){
				alert(text)
			}
		}
	},

	/**
	 * 日期格式化
	 *  dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
	 */
	dateFormat(date, formatStr){
		var str = formatStr || this.yyyyMMddHHmm;
		var Week = ['日', '一', '二', '三', '四', '五', '六'];

		str = str.replace(/yyyy|YYYY/, date.getFullYear());
		str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

		str = str.replace(/MM/, date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
		str = str.replace(/M/g, date.getMonth() + 1);

		str = str.replace(/w|W/g, Week[date.getDay()]);

		str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
		str = str.replace(/d|D/g, date.getDate());

		str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
		str = str.replace(/h|H/g, date.getHours());
		str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
		str = str.replace(/m/g, date.getMinutes());

		str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
		str = str.replace(/s|S/g, date.getSeconds());

		return str;
	},
	notOpen(){
		Alert.alert('提示', '该功能暂未开放！')
	},
	getFirstChar(str){
		return pinyin.getFullChars(str).substring(0, 1);
	},
	pinyin(str){
		return pinyin.getFullChars(str);
	},

};
export default tools;