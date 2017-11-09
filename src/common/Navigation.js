import { TabNavigator, StackNavigator } from 'react-navigation'

import Welcome from '../pages/Welcome'
import HomePage from '../pages/HomePage'
import Live from '../pages/Live'
//import CheckinScreen from '../pages/checkin_screen'
//import ThirdScreen from '../pages/third_screen'

// see here for options: https://reactnavigation.org/docs/navigators/tab
const TabNavigation = TabNavigator({
    HomeTab: { screen: Welcome },
    LiveTab: { screen: Live },
}, {
    animationEnabled: false,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    backBehavior: 'none',
});

// add your router below
const Navigation = StackNavigator({
    Main: { screen: TabNavigation },
    HomePageScreen: { screen: HomePage },
    LiveScreen: { screen: Live },
    //ThirdScreen: { screen: ThirdScreen },
});

export default Navigation