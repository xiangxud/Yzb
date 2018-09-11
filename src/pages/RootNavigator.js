import React, {Component} from 'react'

import {TabNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

import Welcome from './Welcome';
import HomePage from './HomePage';
import Live from './Live';
import LiveSearch from './live/LiveSearch';
import Headlines from './Headlines';
import Quotes from './Quotes';
import InfoDetail from './info/InfoDetail';

import Login from './uc/Login';
import Register from './uc/Register';
import FindPassword from './uc/FindPassword';
import Uc from './Uc';
import MyCollection from './uc/MyCollection'

import BHStart from './bohai/BHStart';
import BHList from './bohai/BHList';
import BHApply from './bohai/BHApply';
import BHDetail from './bohai/BHDetail';
import ChooseFarm from './bohai/modal/ChooseFarm';
import AddFarm from './bohai/modal/AddFarm';

import Didi from './didi/Didi';
import VetInfo from './didi/VetInfo';
import ConnectCamera from './didi/ConnectCamera';

import Web from './Web';
import About from './uc/About';
import MyInfo from './uc/MyInfo';
import ScoreRecord from './uc/ScoreRecord';
import ChangePhone from './uc/ChangePhone';
import Sty from './sty/index';
import Imm from './sty/Imm';

import MonitorPlay from './sty/MonitorPlay';
import Environmental from './sty/Environmental';
import EnvironmentalSetting from './sty/EnvironmentalSetting';
import StyReport from './sty/StyReport';


import StyAdd from './sty/StyAdd';
import StyEdit from './sty/StyEdit';
import PetOut from './sty/PetOut'
import PetIn from './sty/PetIn'
import StySetting from './sty/StySetting';
import CameraAdd from './sty/CameraAdd';
import CameraEdit from './sty/CameraEdit';
import CustomTab from './info/CustomTab';
import SettingColumn from './info/SettingColumn';
import WelcomeRegister from './uc/Welcome';
import Join from './uc/Join';

import Play from './live/Play';
import VodPlay from "./live/VodPlay";

const TabNavigation = TabNavigator({
    HomeTab: {
        screen: HomePage,
        navigationOptions: {
            headerTitle: '智能养殖',
            tabBarLabel: '智能养殖',
            tabBarIcon: ({tintColor}) => (<Icon name='home' color={tintColor} size={24}/>)
        }
    },
    LiveTab: {
        screen: Live,
        navigationOptions: {
            title: '直播',
            tabBarIcon: ({tintColor}) => (<Icon name='video-camera' color={tintColor} size={24}/>)
        }
    },
    InfoTab: {
        screen: Headlines,
        navigationOptions: {
            headerTitle: '养殖头条',
            tabBarLabel: '头条',
            tabBarIcon: ({tintColor}) => (<Icon name='fire' color={tintColor} size={24}/>)
        }
    },
    UCTab: {
        screen: Uc,
        navigationOptions: {
            headerTitle: '个人中心',
            tabBarLabel: '我的',
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
            height: 49,
            paddingTop: 0,
            backgroundColor: '#f1f9f7'
        },
        labelStyle: {
            marginTop: 0,
            paddingTop: 0
        },
        iconStyle: {
            marginTop: 0,
            paddingTop: 0,
        },
        activeBackgroundColor: 'white',
        activeTintColor: '#009688',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: '#6f6f6f',
        showLabel: true,
        showIcon: true,
        indicatorStyle: {height: 0}
    }
});
//栋舍菜单
const StyTabNavigation = TabNavigator({
    StyTab: {
        screen: Sty,
        navigationOptions: {
            headerTitle: '概况',
            tabBarLabel: '概况',
            tabBarIcon: ({tintColor}) => (<Icon name='building' color={tintColor} size={24}/>)
        }
    },
    ImmTab: {
        screen: Imm,
        navigationOptions: {
            headerTitle: '免疫',
            tabBarLabel: '免疫',
            tabBarIcon: ({tintColor}) => (<Icon name='calendar-check-o' color={tintColor} size={24}/>)
        }
    },
    EnvironmentalTab: {
        screen: Environmental,
        navigationOptions: {
            headerTitle: '环控',
            tabBarLabel: '环控',
            tabBarIcon: ({tintColor}) => (<Icon name='dashboard' color={tintColor} size={24}/>)
        }
    },
    ReportTab: {
        screen: StyReport,
        navigationOptions: {
            headerTitle: '报表',
            tabBarLabel: '报表',
            tabBarIcon: ({tintColor}) => (<Icon name='bar-chart' color={tintColor} size={24}/>)
        }
    }
}, {
    initialRouteName: 'StyTab',
    animationEnabled: false,// 切换页面时不显示动画
    tabBarPosition: 'bottom',// 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false,// 禁止左右滑动
    backBehavior: 'none',// 按 back 键是否跳转到第一个 Tab， none 为不跳转
    lazy: true,
    tabBarOptions: {
        style: {
            height: 49,
            paddingTop: 0,
            backgroundColor: '#e0e0e0'// TabBar 背景色
        },
        labelStyle: {
            marginTop: 0,
            paddingTop: 0,
            fontSize: 12,// 文字大小
        },
        iconStyle: {
            marginTop: 0,
            paddingTop: 0,
        },
        activeBackgroundColor: 'white',
        activeTintColor: '#009688',// 文字和图片选中颜色
        inactiveBackgroundColor: 'white',
        inactiveTintColor: '#bababa',// 文字和图片默认颜色
        showLabel: true,
        showIcon: true,// android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}// android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    }
});
// add your router below
const RootNavigator = StackNavigator({
    Welcome: {screen: Welcome},
    Main: {screen: TabNavigation},
    InfoDetail: {screen: InfoDetail},
    CustomTab: {screen: CustomTab},
    SettingColumn: {screen: SettingColumn},
    Login: {screen: Login},
    Register: {screen: Register},
    FindPassword: {screen: FindPassword},
    Sty: {screen: StyTabNavigation},
    AddSty: {screen: StyAdd},
    EditSty: {screen: StyEdit},
    StySetting: {screen: StySetting},
    OutPet: {screen: PetOut},
    InPet: {screen: PetIn},
    BHStart: {screen: BHStart},
    BHApply: {screen: BHApply},
    BHList: {screen: BHList},
    AddFarm: {screen: AddFarm},
    ChooseFarm: {screen: ChooseFarm},
    BHDetail: {screen: BHDetail},
    MonitorPlay: {screen: MonitorPlay},
    Web: {screen: Web},
    CameraAdd: {screen: CameraAdd},
    CameraEdit: {screen: CameraEdit},
    Didi: {screen: Didi},
    VetInfo: {screen: VetInfo},
    ConnectCamera: {screen: ConnectCamera},
    LiveSearch: {screen: LiveSearch},
    About: {screen: About},
    ChangePhone: {screen: ChangePhone},
    ScoreRecord: {screen: ScoreRecord},
    MyCollection: {screen: MyCollection},
    MyInfo: {screen: MyInfo},
    Quotes: {screen: Quotes},
    WelcomeRegister: {screen: WelcomeRegister},
    Join: {screen: Join},
    EnvironmentalSetting: {screen: EnvironmentalSetting},

    Play: {screen: Play},
    VodPlay: {screen: VodPlay},
}, {
    initialRouteName: 'Welcome', // 默认显示界面!global.user.loginState?'Login':'Main'
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerStyle: {elevation: 0, shadowOpacity: 0, height: 48, backgroundColor: "#009688"},
        headerTitleStyle: {color: '#fff', fontSize: 18, alignSelf: 'center', flex: 1, textAlign: 'center'}, //alignSelf:'center'  文字居中
        headerBackTitleStyle: {color: '#fff', fontSize: 12},
        headerTintColor: '#fff',
        gesturesEnabled: true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: (Start) => {
        console.log('导航栏切换开始');
    },  // 回调
    onTransitionEnd: () => {
        console.log('导航栏切换结束');
    }  // 回调
});


export default RootNavigator