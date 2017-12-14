import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Welcome from '../pages/Welcome';
import HomePage from '../pages/HomePage';
import Live from '../pages/Live';
import Info from '../pages/Info';
import InfoDetail from '../pages/info/InfoDetail';
import Uc from '../pages/Uc';
import Login from '../pages/Login';
import BHStart from '../pages/bohai/BHStart';
import BHList from '../pages/bohai/BHList';
import BHApply from '../pages/bohai/BHApply';
import BHDetail from '../pages/bohai/BHDetail';
import ChooseFarm from '../pages/bohai/modal/ChooseFarm';

import Didi from '../pages/didi/DidiMap';
import MarkerExample from '../pages/didi/MarkerExample';
import VetInfo from '../pages/didi/VetInfo';

import Web from '../pages/Web';
import About from '../pages/uc/About';
import MyInfo from '../pages/uc/MyInfo';
import Sty from '../pages/sty';
import imm from '../pages/sty/imm';
import Monitor from '../pages/sty/Monitor';
import MonitorPlay from '../pages/sty/MonitorPlay';
//import environmental from '../pages/sty/environmental';
//import report from '../pages/sty/report';
import Quotes from '../pages/Quotes';

import addSty from '../pages/sty/add';
import editSty from '../pages/sty/edit';
import outPet from '../pages/sty/outPet'
import inPet from '../pages/sty/inPet'
import stySetting from '../pages/sty/setting';
import cameraAdd from '../pages/sty/camera/add'
import cameraEdit from '../pages/sty/camera/edit'

//主菜单
const TabNavigation = TabNavigator({
    HomeTab: {
        screen: HomePage,
        navigationOptions:{
            headerTitle: '智能养殖',
            tabBarLabel:'智能养殖',
            tabBarIcon: ({tintColor}) => (<Icon name='home' color={tintColor} size={24}/>)
        }
    },
    LiveTab: {
        screen: Live,
        navigationOptions:{
            title: '直播',
            tabBarIcon: ({tintColor}) => (<Icon name='video-camera' color={tintColor} size={24}/>)
        }
    },
    InfoTab: {
        screen: Info,
        navigationOptions:{
            headerTitle: '养殖头条',
            tabBarLabel:'头条',
            tabBarIcon: ({tintColor}) => (<Icon name='fire' color={tintColor} size={24}/>)
        }
    },
    UCTab: {
        screen: Uc,
        navigationOptions:{
            headerTitle: '个人中心',
            tabBarLabel:'我的',
            tabBarIcon: ({tintColor}) => (<Icon name='user' color={tintColor} size={24}/>)
        }
    },
}, {
    animationEnabled: false,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    backBehavior: 'none',
    lazy: true,
    tabBarOptions: {
        style: {
            height:49,
            paddingTop:0,
            backgroundColor:'#f1f9f7'
        },
        labelStyle:{
            marginTop:0,
            paddingTop:0
        },
        iconStyle:{
            marginTop:0,
            paddingTop:0,
        },
        activeBackgroundColor:'white',
        activeTintColor:'#009688',
        inactiveBackgroundColor:'white',
        inactiveTintColor:'#aaa',
        showLabel:true,
        showIcon:true,
        indicatorStyle:{height:0}
    }
});
//栋舍菜单
const StyTabNavigation = TabNavigator({
    StyTab:{
        screen:Sty,
        navigationOptions:{
            headerTitle: '概况',
            tabBarLabel:'概况',
            tabBarIcon: ({tintColor}) => (<Icon name='building' color={tintColor} size={24}/>)
        }
    },
    ImmTab:{
        screen:imm,
        navigationOptions:{
            headerTitle: '免疫',
            tabBarLabel:'免疫',
            tabBarIcon: ({tintColor}) => (<Icon name='calendar-check-o' color={tintColor} size={24}/>)
        }
    },
    MonitorTab:{
        screen:Monitor,
        navigationOptions:{
            headerTitle: '监控',
            tabBarLabel:'监控',
            tabBarIcon: ({tintColor}) => (<Icon name='video-camera' color={tintColor} size={24}/>)
        }
    },
    /*EnvironmentalTab:{
        screen:environmental,
        navigationOptions:{
            headerTitle: '环控',
            tabBarLabel:'环控',
            tabBarIcon: ({tintColor}) => (<Icon name='dashboard' color={tintColor} size={24}/>)
        }
    },
    ReportTab:{
        screen:report,
        navigationOptions:{
            headerTitle: '报表',
            tabBarLabel:'报表',
            tabBarIcon: ({tintColor}) => (<Icon name='bar-chart' color={tintColor} size={24}/>)
        }
    }*/
},{
    initialRouteName:'StyTab',
    animationEnabled: false,// 切换页面时不显示动画
    tabBarPosition: 'bottom',// 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false,// 禁止左右滑动
    backBehavior: 'none',// 按 back 键是否跳转到第一个 Tab， none 为不跳转
    lazy: true,
    tabBarOptions: {
        style: {
            height:49,
            paddingTop:0,
            backgroundColor:'#e0e0e0'// TabBar 背景色
        },
        labelStyle:{
            marginTop:0,
            paddingTop:0,
            fontSize:12,// 文字大小
        },
        iconStyle:{
            marginTop:0,
            paddingTop:0,
        },
        activeBackgroundColor:'white',
        activeTintColor:'#009688',// 文字和图片选中颜色
        inactiveBackgroundColor:'white',
        inactiveTintColor:'#bababa',// 文字和图片默认颜色
        showLabel:true,
        showIcon:true,// android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle:{height:0}// android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    }
});
// add your router below
const RootNavigator = StackNavigator({
    Welcome:{ screen: Welcome },
    Main:{ screen: TabNavigation },
    InfoDetail:{ screen: InfoDetail },
    Login:{ screen: Login },
    Sty:{screen:StyTabNavigation},
    AddSty:{screen:addSty},
    EditSty:{screen:editSty},
    StySetting:{screen:stySetting},
    OutPet:{screen:outPet},
    InPet:{screen:inPet},
    BHStart:{ screen: BHStart },
    BHApply:{ screen: BHApply },
    BHList:{ screen: BHList },
    MonitorPlay:{ screen: MonitorPlay },
    Web:{ screen: Web },
    CameraAdd:{screen:cameraAdd},
    CameraEdit:{screen:cameraEdit},
    Didi:{ screen: MarkerExample },
    VetInfo:{ screen: VetInfo },
    About:{ screen: About },
    MyInfo:{ screen: MyInfo },
    Quotes:{ screen: Quotes },
    ChooseFarm:{ screen: ChooseFarm },
    BHDetail:{ screen: BHDetail },
}, {
    initialRouteName: 'Welcome', // 默认显示界面!global.user.loginState?'Login':'Main'
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerStyle:{elevation: 0,shadowOpacity: 0,height:48,backgroundColor:"#009688"},
        headerTitleStyle:{color:'#fff',fontSize:18,alignSelf:'center'}, //alignSelf:'center'  文字居中
        headerBackTitleStyle:{color:'#fff',fontSize:12},
        headerTintColor:'#fff',
        gesturesEnabled:true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: (Start)=>{console.log('导航栏切换开始');},  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
});


export default RootNavigator