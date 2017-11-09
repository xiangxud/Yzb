/**
 * Created by TomChow on 2017/11/2.
 */
import {StackNavigator} from "react-navigation";
import Splash from '../pages/HomePage';
import TabBarView from '../pages/Live';

const routers = {
    'HomePage': require('../pages/HomePage'),
    //'Login': require('../pages/Login'),
    'Live': require('../pages/Live'),
    //'Scanner': require('../components/Scanner'),

    // home
    //'Foods': require('../pages/home/Foods'),

    // feed
    //'FeedDetail': require('../pages/feed/FeedDetail'),

    // profile
}

export default router