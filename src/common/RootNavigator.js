import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Welcome from '../pages/Welcome';
import HomePage from '../pages/HomePage';
import Live from '../pages/Live';
import Info from '../pages/HotBreed';
import InfoDetail from '../pages/info/InfoDetail';
import Uc from '../pages/Uc';
import Login from '../pages/Login';
import BHStart from '../pages/bohai/BHStart';
import Didi from '../pages/didi/DidiMap';
import VetInfo from '../pages/didi/VetInfo';
import Web from '../pages/Web';
import Sty from '../pages/sty';

// see here for options: https://reactnavigation.org/docs/navigators/tab
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
            title: '直播间',
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

// add your router below
const RootNavigator = StackNavigator({
    Welcome:{ screen: Welcome },
    Main:{ screen: TabNavigation },
    InfoDetail:{ screen: InfoDetail },
    Login:{ screen: Login },
    Sty:{screen:Sty},
    BHStart:{ screen: BHStart },
    Web:{ screen: Web },
    Didi:{ screen: Didi },
    VetInfo:{ screen: VetInfo },
}, {
    initialRouteName: 'Welcome', // 默认显示界面!global.user.loginState?'Login':'Main'
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerStyle:{elevation: 0,shadowOpacity: 0,height:48,backgroundColor:"#009688"},
        headerTitleStyle:{color:'#fff',fontSize:18,alignSelf:'center'}, //alignSelf:'center'  文字居中
        headerBackTitleStyle:{color:'#fff',fontSize:12},
        // headerTintColor:{},
        gesturesEnabled:true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: (Start)=>{console.log('导航栏切换开始');},  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
});
export default RootNavigator