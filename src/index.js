import React, { Component } from "react";
import {
    View,
    StatusBar,
    BackHandler
} from 'react-native'
//import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
//import { addNavigationHelpers } from 'react-navigation';
import RootNavigator from './pages/RootNavigator';

let routes = [];
let lastBackPressed = null;

@observer class YzbApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        lastBackPressed = null;
    }

    onBackAndroid() {
        if (routes.length === 1) { // 根界面
            if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            lastBackPressed = Date.now();
            tools.showToast('再按击一次退出养殖宝');
            return true;
        }
    }
    render() {
        return (
            /*<RootNavigator
                navigation={addNavigationHelpers({
                    dispatch: navigationStore.dispatch,
                    state: navigationStore.navigationState
                })}
            />*/
            <View style={{flex:1}}>
                <StatusBar backgroundColor={'rgba(0,156,136,1)'}/>
                {
                    <RootNavigator onNavigationStateChange={(prevNav, nav, action) => {
                        console.log('prevNav=',prevNav);
                        console.log('nav=',nav);
                        console.log('action=',action);
                        routes = nav.routes;
                    }} />
                }
            </View>
        );
    }
}


export default YzbApp;