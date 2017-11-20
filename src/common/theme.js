import {Platform, Dimensions, PixelRatio} from "react-native";
//import material from "../../native-base-theme/variables/material";

const platform = Platform.OS;
const platformStyle = 'yzb';

export default Object.assign({}, {
    platformStyle,
    // 按钮颜色
    brandPrimary: '#726585',
    // fudao
    contentBgColor: '#E3E7F3',
    //header
    toolbarDefaultBg: "#E3E7F3",
    toolbarHeight: platform === "ios" ? 65 : 45,
    toolbarIconSize: platform === "ios" ? 25 : 28,
    toolbarIconColor: "#000",
    toolbarTextColor: "#000",
    //TabBar
    navTabBarHeight: 60,
    navTabBarBgColor: '#30173E',
    navTabBarTextColor: '#fff',
    navTabBarActiveTextColor: '#9FCC2D',

    // 主题字体颜色
    fontSizeBase: 15,
    DefaultFontSize: 15,
})